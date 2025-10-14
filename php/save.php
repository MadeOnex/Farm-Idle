<?php
header("Content-Type: application/json; charset=utf-8");

session_start();
if (empty($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["ok" => false, "error" => "unauthorized"]);
    exit;
}

require __DIR__ . "/connection.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "invalid_json"]);
    exit;
}

// Absicherung
$data['schemaVersion'] = (int)($data['schemaVersion'] ?? 1);
$data['gold'] = (int)($data['gold'] ?? 0);
if (!isset($data['inventory']) || !is_array($data['inventory'])) {
    $data['inventory'] = ['wheat' => 0, 'corn' => 0, 'soy' => 0];
}

$json = json_encode($data, JSON_UNESCAPED_UNICODE);

$stmt = $pdo->prepare("INSERT INTO saves (userId, gameStateJson, timestamp) VALUES (?, ?, CURTIME())");
$stmt->execute([(int)$_SESSION["user_id"], $json]);

echo json_encode(["ok" => true]);


// Speichert JSON von User durch Speicher btn