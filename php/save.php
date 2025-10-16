<?php
header("Content-Type: application/json");

session_start();

require __DIR__ . "/connection.php";
require __DIR__ . "/helpers.php";

require_login();

$data = get_json_input();

// Validierung
$data['schemaVersion'] = (int)($data['schemaVersion'] ?? 1);
$data['gold'] = (int)($data['gold'] ?? 0);
$data['inventory'] = $data['inventory'] ?? [];
$data['fields'] = $data['fields'] ?? [null];
$data['jobs'] = $data['jobs'] ?? [];

$json = json_encode($data);

// Speichern
$stmt = $pdo->prepare("INSERT INTO saves (userId, gameStateJson, timestamp) VALUES (?, ?, NOW())");
$stmt->execute([$_SESSION["user_id"], $json]);

echo json_encode(["ok" => true]);