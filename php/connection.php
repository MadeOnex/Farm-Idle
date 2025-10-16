<?php
// Datenbank-Verbindung
$host = "mysql";
$user =  "root";
$password = "1234";
$dbname = "2351_Farmidle";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("DB-Fehler: " . $e->getMessage());
}
