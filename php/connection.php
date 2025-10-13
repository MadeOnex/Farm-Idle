<?php
$host = "mysql";
$user = "root";
$password = "1234";
$dbname = "2351_Farmidle";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // echo "Verbindung erfolgreich!";

} catch (PDOException $e) {
    // echo "Verbindung fehlgeschlagen: " . $e->getMessage();
}

