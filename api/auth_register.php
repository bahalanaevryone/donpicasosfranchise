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

$payload = json_decode(file_get_contents('php://input'), true);

if (!is_array($payload)) {
    http_response_code(400);
    json_response(['error' => 'Invalid JSON payload']);
    exit;
}

$required = ['fullName', 'email', 'phone', 'password'];
foreach ($required as $field) {
    if (empty(trim((string)($payload[$field] ?? '')))) {
        http_response_code(422);
        json_response(['error' => "Missing required field: {$field}"]);
        exit;
    }
}

$fullName = trim((string)$payload['fullName']);
$email = strtolower(trim((string)$payload['email']));
$phone = trim((string)$payload['phone']);
$password = (string)$payload['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    json_response(['error' => 'Invalid email']);
    exit;
}

if (strlen($password) < 8) {
    http_response_code(422);
    json_response(['error' => 'Password must be at least 8 characters']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$db = db();
$db->begin_transaction();

try {
    $stmt = $db->prepare("
        INSERT INTO applicant_users (full_name, email, phone, password_hash, status)
        VALUES (?, ?, ?, ?, 'active')
    ");
    $stmt->bind_param('ssss', $fullName, $email, $phone, $passwordHash);
    $stmt->execute();

    $applicantId = $db->insert_id;

    $db->commit();
    json_response([
        'ok' => true,
        'applicant' => [
            'id' => (int)$applicantId,
            'fullName' => $fullName,
            'email' => $email,
        ],
    ]);
} catch (Throwable $error) {
    $db->rollback();
    http_response_code(500);

    // Handle duplicate email more gracefully (best-effort)
    if (str_contains(strtolower($error->getMessage()), 'duplicate')) {
        json_response(['error' => 'Email already registered']);
        exit;
    }

    json_response(['error' => 'Unable to register']);
    exit;
}
