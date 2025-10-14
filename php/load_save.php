<?php
header("Content-Type: application/json; charset=utf-8");

session_start();
if (empty($_SESSION["userId"])) {
    http_response_code(401);
    echo json_encode(["error" => "unauthorized"]);
    exit;
}

require __DIR__ . "/connection.php";

$stmt = $pdo->prepare("SELECT gameStateJson FROM saves WHERE userId = ? ORDER BY saveId DESC LIMIT 1");
$row = $stmt->fetch();

// Gespeicherten JSON Text zurückgeben 
if ($row && !empty($row["gameStateJson"])) {
    echo $row["gameStateJson"];
    exit;
}

//Fallback
$default = require __DIR__ . "/default_state.php";
echo json_encode($default, JSON_UNESCAPED_UNICODE);

// Lädt den jüngsten Spielstand des Users oder Default wenn keiner da