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

$required = ['email', 'password'];
foreach ($required as $field) {
    if (empty(trim((string)($payload[$field] ?? '')))) {
        http_response_code(422);
        json_response(['error' => "Missing required field: {$field}"]);
        exit;
    }
}

$email = strtolower(trim((string)$payload['email']));
$password = (string)$payload['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    json_response(['error' => 'Invalid email']);
    exit;
}

$db = db();

try {
    $stmt = $db->prepare("
        SELECT id, full_name, email, password_hash, status
        FROM applicant_users
        WHERE email = ?
        LIMIT 1
    ");
    $stmt->bind_param('s', $email);
    $stmt->execute();

    $user = $stmt->get_result()->fetch_assoc();

    if (!$user) {
        http_response_code(401);
        json_response(['error' => 'Invalid credentials']);
        exit;
    }

    if (($user['status'] ?? '') !== 'active') {
        http_response_code(403);
        json_response(['error' => 'Account is not active']);
        exit;
    }

    if (!password_verify($password, (string)$user['password_hash'])) {
        http_response_code(401);
        json_response(['error' => 'Invalid credentials']);
        exit;
    }

    $applicantId = (int)$user['id'];
    $fullName = (string)$user['full_name'];

    // Simple token: base64(payload).'.'.base64(signature)
    // NOTE: Replace SECRET_KEY with a strong secret in production.
    $secretKey = 'DON_PICASOS_DEMO_SECRET_KEY_CHANGE_ME';

    $issuedAt = time();
    $expiresAt = $issuedAt + (60 * 60 * 6); // 6 hours

    $tokenPayload = [
        'sub' => $applicantId,
        'email' => $email,
        'iat' => $issuedAt,
        'exp' => $expiresAt,
    ];

    $payloadJson = json_encode($tokenPayload, JSON_UNESCAPED_SLASHES);

    $payloadB64 = rtrim(strtr(base64_encode($payloadJson), '+/', '-_'), '=');
    $signatureRaw = hash_hmac('sha256', $payloadB64, $secretKey, true);
    $signatureB64 = rtrim(strtr(base64_encode($signatureRaw), '+/', '-_'), '=');

    $token = $payloadB64 . '.' . $signatureB64;

    // Update last_login_at
    $upd = $db->prepare("UPDATE applicant_users SET last_login_at = NOW() WHERE id = ?");
    $upd->bind_param('i', $applicantId);
    $upd->execute();

    json_response([
        'ok' => true,
        'token' => $token,
        'applicant' => [
            'id' => $applicantId,
            'fullName' => $fullName,
            'email' => $email,
        ],
        'expiresAt' => date('c', $expiresAt),
    ]);
} catch (Throwable $error) {
    http_response_code(500);
    json_response(['error' => 'Unable to login']);
    exit;
}
