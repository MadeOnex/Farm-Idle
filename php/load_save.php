<?php
header("Content-Type: application/json; charset=utf-8");
session_start();

if (empty($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["error" => "unauthorized"]);
    exit;
}

require __DIR__ . "/connection.php";

// Lade letzten Spielstand
$stmt = $pdo->prepare("
    SELECT gameStateJson 
    FROM saves 
    WHERE userId = ? 
    ORDER BY saveId DESC 
    LIMIT 1
");
$stmt->execute([$_SESSION["user_id"]]);
$row = $stmt->fetch();

if ($row && !empty($row["gameStateJson"])) {
    echo $row["gameStateJson"];
    exit;
}

// Falls kein Spielstand existiert, gib Default zurück
$default = require __DIR__ . "/default_state.php";
echo json_encode($default, JSON_UNESCAPED_UNICODE);

// Lädt den jüngsten Spielstand des Users oder Default wenn keiner da