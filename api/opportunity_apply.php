<?php

declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    json_response(['error' => 'Method not allowed']);
    exit;
}

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (!preg_match('/Bearer\s+(.+)$/i', $authHeader, $m)) {
    http_response_code(401);
    json_response(['error' => 'Missing or invalid Authorization header']);
    exit;
}
$token = trim($m[1]);

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload)) {
    http_response_code(400);
    json_response(['error' => 'Invalid JSON payload']);
    exit;
}

$required = ['investmentBudget', 'preferredLocation', 'message'];
foreach ($required as $field) {
    if (!array_key_exists($field, $payload) || empty(trim((string)($payload[$field] ?? '')))) {
        http_response_code(422);
        json_response(['error' => "Missing required field: {$field}"]);
        exit;
    }
}

$inquiryType = trim((string)($payload['inquiryType'] ?? 'franchise'));

$packageCode = trim((string)($payload['packageCode'] ?? ''));
$packageId = $payload['packageId'] ?? null;

if ($packageCode === '' && empty($packageId)) {
    http_response_code(422);
    json_response(['error' => 'Missing package selection (packageCode or packageId)']);
    exit;
}

$secretKey = 'DON_PICASOS_DEMO_SECRET_KEY_CHANGE_ME';

// ---- Validate token (same scheme as auth_login.php) ----
$parts = explode('.', $token);
if (count($parts) !== 2) {
    http_response_code(401);
    json_response(['error' => 'Invalid token']);
    exit;
}
[$payloadB64, $signatureB64] = $parts;

$payloadJson = base64_decode(strtr($payloadB64, '-_', '+/'));
if (!$payloadJson) {
    http_response_code(401);
    json_response(['error' => 'Invalid token payload']);
    exit;
}

$decoded = json_decode($payloadJson, true);
if (!is_array($decoded) || !isset($decoded['sub'], $decoded['exp'])) {
    http_response_code(401);
    json_response(['error' => 'Invalid token claims']);
    exit;
}

if ((int)$decoded['exp'] < time()) {
    http_response_code(401);
    json_response(['error' => 'Token expired']);
    exit;
}

$expectedSigRaw = hash_hmac('sha256', $payloadB64, $secretKey, true);
$expectedSigB64 = rtrim(strtr(base64_encode($expectedSigRaw), '+/', '-_'), '=');

if (!hash_equals($expectedSigB64, $signatureB64)) {
    http_response_code(401);
    json_response(['error' => 'Invalid token signature']);
    exit;
}

$applicantId = (int)$decoded['sub'];

$db = db();
$db->begin_transaction();

try {
    // ---- Resolve package_id ----
    if ($packageCode !== '') {
        $pkgStmt = $db->prepare("SELECT id FROM franchise_packages WHERE package_code = ? LIMIT 1");
        $pkgStmt->bind_param('s', $packageCode);
        $pkgStmt->execute();
        $pkgRow = $pkgStmt->get_result()->fetch_assoc();
        if (!$pkgRow) {
            http_response_code(422);
            json_response(['error' => 'Invalid packageCode']);
            exit;
        }
        $resolvedPackageId = (int)$pkgRow['id'];
    } else {
        $resolvedPackageId = (int)$packageId;
        $pkgCheck = $db->prepare("SELECT id FROM franchise_packages WHERE id = ? LIMIT 1");
        $pkgCheck->bind_param('i', $resolvedPackageId);
        $pkgCheck->execute();
        $pkgRes = $pkgCheck->get_result()->fetch_assoc();
        if (!$pkgRes) {
            http_response_code(422);
            json_response(['error' => 'Invalid packageId']);
            exit;
        }
    }

    $investmentBudget = trim((string)($payload['investmentBudget'] ?? ''));
    $preferredLocation = trim((string)($payload['preferredLocation'] ?? ''));
    $message = trim((string)($payload['message'] ?? ''));

    // Best-effort parse budget_min/budget_max from investmentBudget
    $budgetMin = null;
    $budgetMax = null;
    $digits = preg_replace('/[^0-9.]/', '', $investmentBudget);
    if ($digits !== '' && is_numeric($digits)) {
        $budgetMin = (float)$digits;
        $budgetMax = null;
    }

    // ---- Applicant details ----
    $uStmt = $db->prepare("SELECT full_name, email, phone FROM applicant_users WHERE id = ? LIMIT 1");
    $uStmt->bind_param('i', $applicantId);
    $uStmt->execute();
    $u = $uStmt->get_result()->fetch_assoc();

    $fullName = (string)($u['full_name'] ?? '');
    $email = (string)($u['email'] ?? '');
    $phone = (string)($u['phone'] ?? '');

    $nameParts = preg_split('/\s+/', trim($fullName), 2);
    $firstName = $nameParts[0] ?? $fullName;
    $lastName = $nameParts[1] ?? '';

    // ---- 1) opportunity_applications ----
    $appStmt = $db->prepare("
        INSERT INTO opportunity_applications
          (applicant_id, package_id, inquiry_type, investment_budget, preferred_location, message, status)
        VALUES (?, ?, ?, ?, ?, ?, 'submitted')
    ");
    $appStmt->bind_param(
        'iissss',
        $applicantId,
        $resolvedPackageId,
        $inquiryType,
        $investmentBudget,
        $preferredLocation,
        $message
    );
    $appStmt->execute();
    $applicationId = (int)$db->insert_id;

    // ---- 2) franchise_leads (+ contact_messages) for admin reporting ----
    $leadNumber = 'L-' . date('Y') . '-' . str_pad((string)random_int(1, 99999), 5, '0', STR_PAD_LEFT);

    $sourceRow = $db->query("SELECT id FROM lead_sources WHERE name = 'Website Form' LIMIT 1")->fetch_assoc();
    $sourceId = $sourceRow ? (int)$sourceRow['id'] : null;

    $budgetMinBind = $budgetMin === null ? 0.0 : (float)$budgetMin;
    $budgetMaxBind = $budgetMax === null ? 0.0 : (float)$budgetMax;

    $sourceBind = $sourceId === null ? 0 : (int)$sourceId;

    $leadInsert = $db->prepare("
        INSERT INTO franchise_leads
          (lead_number, first_name, last_name, email, phone, inquiry_type, package_id, source_id,
           budget_min, budget_max, preferred_location, message, status, priority, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', 'normal', NOW())
    ");
    $leadInsert->bind_param(
        'sssssisiddss',
        $leadNumber,
        $firstName,
        $lastName,
        $email,
        $phone,
        $inquiryType,
        $resolvedPackageId,
        $sourceBind,
        $budgetMinBind,
        $budgetMaxBind,
        $preferredLocation,
        $message
    );
    $leadInsert->execute();
    $leadId = (int)$db->insert_id;

    if ($sourceId === null) {
        $db->query("UPDATE franchise_leads SET source_id = NULL WHERE id = " . (int)$leadId);
    }
    if ($budgetMin === null) {
        $db->query("UPDATE franchise_leads SET budget_min = NULL WHERE id = " . (int)$leadId);
    }
    if ($budgetMax === null) {
        $db->query("UPDATE franchise_leads SET budget_max = NULL WHERE id = " . (int)$leadId);
    }

    $contactInsert = $db->prepare("
        INSERT INTO contact_messages
          (first_name, last_name, email, phone, inquiry_type, investment_budget, preferred_location, message, lead_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'unread')
    ");
    $contactInsert->bind_param(
        'ssssssssi',
        $firstName,
        $lastName,
        $email,
        $phone,
        $inquiryType,
        $investmentBudget,
        $preferredLocation,
        $message,
        $leadId
    );
    $contactInsert->execute();

    $db->commit();

    // Return package name and submission time so the frontend can store/display them
    $pkgNameRow = $db->query("SELECT name FROM franchise_packages WHERE id = " . (int)$resolvedPackageId)->fetch_assoc();
    $submittedAt = date('Y-m-d H:i:s');

    json_response([
        'ok' => true,
        'applicationId' => $applicationId,
        'leadId' => $leadId,
        'packageCode' => $packageCode,
        'packageName' => $pkgNameRow['name'] ?? '',
        'submittedAt' => $submittedAt,
    ]);
} catch (Throwable $e) {
    $db->rollback();
    http_response_code(500);
    json_response(['error' => 'Unable to save opportunity application']);
    exit;
}
