<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    json_response(['error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);

if (!is_array($payload)) {
    http_response_code(400);
    json_response(['error' => 'Invalid JSON payload']);
    exit;
}

$required = ['firstName', 'lastName', 'email', 'phone', 'inquiryType', 'message'];
foreach ($required as $field) {
    if (empty(trim((string)($payload[$field] ?? '')))) {
        http_response_code(422);
        json_response(['error' => "Missing required field: {$field}"]);
        exit;
    }
}

$db = db();
$db->begin_transaction();

try {
    $leadNumber = 'L-' . date('Y') . '-' . str_pad((string)random_int(1, 99999), 5, '0', STR_PAD_LEFT);
    $sourceId = (int)$db->query("SELECT id FROM lead_sources WHERE name = 'Website Form' LIMIT 1")->fetch_assoc()['id'];
    $packageId = null;

    $firstName = trim((string)$payload['firstName']);
    $lastName = trim((string)$payload['lastName']);
    $email = trim((string)$payload['email']);
    $phone = trim((string)$payload['phone']);
    $inquiryType = trim((string)$payload['inquiryType']);
    $message = trim((string)$payload['message']);
    $budget = trim((string)($payload['investmentBudget'] ?? ''));
    $location = trim((string)($payload['preferredLocation'] ?? ''));

    $lead = $db->prepare("
        INSERT INTO franchise_leads
          (lead_number, first_name, last_name, email, phone, inquiry_type, package_id, source_id, preferred_location, message, status, priority)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', 'normal')
    ");
    $lead->bind_param(
        'ssssssiiss',
        $leadNumber,
        $firstName,
        $lastName,
        $email,
        $phone,
        $inquiryType,
        $packageId,
        $sourceId,
        $location,
        $message
    );
    $lead->execute();
    $leadId = $db->insert_id;

    $contact = $db->prepare("
        INSERT INTO contact_messages
          (first_name, last_name, email, phone, inquiry_type, investment_budget, preferred_location, message, lead_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'unread')
    ");
    $contact->bind_param(
        'ssssssssi',
        $firstName,
        $lastName,
        $email,
        $phone,
        $inquiryType,
        $budget,
        $location,
        $message,
        $leadId
    );
    $contact->execute();

    $db->commit();
    json_response(['ok' => true, 'leadNumber' => $leadNumber]);
} catch (Throwable $error) {
    $db->rollback();
    http_response_code(500);
    json_response(['error' => 'Unable to save inquiry']);
}
