<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://capelamed.online');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$destination = trim($input['destination'] ?? '');

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$phone || !$destination) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

try {
    $db = new PDO('sqlite:/var/www/capelamed.online/data/referrals.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->prepare('INSERT INTO referrals (name, email, phone, destination) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, $phone, $destination]);
    echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
