<?php
header("Content-Type: application/json");
session_start();

require __DIR__ . "/connection.php";
require __DIR__ . "/helpers.php";

require_login();

// Letzten Spielstand laden
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
} else {
    $default = require __DIR__ . "/default_state.php";
    echo json_encode($default);
}