<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function db(): mysqli
{
    $connection = new mysqli('127.0.0.1', 'root', '', 'don_picasos_franchise');

    if ($connection->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }

    $connection->set_charset('utf8mb4');
    return $connection;
}

function rows(mysqli_result $result): array
{
    $items = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    return $items;
}

function json_response(array $payload): void
{
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
}
