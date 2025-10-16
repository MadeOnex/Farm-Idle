<?php
require __DIR__ . '/connection.php';
require __DIR__ . '/helpers.php';

$username = trim($_POST["username"] ?? "");
$pass1 = $_POST["password"] ?? "";
$pass2 = $_POST["password2"] ?? "";

// Validierung
if ($pass1 !== $pass2) {
    flash_redirect("../login.html", "Passwörter stimmen nicht überein", false, "register");
}
if (strlen($pass1) < 4) {
    flash_redirect("../login.html", "Passwort mind. 4 Zeichen", false, "register");
}
if (strlen($username) < 3) {
    flash_redirect("../login.html", "Username mind. 3 Zeichen", false, "register");
}

// Username prüfen
$stmt = $pdo->prepare("SELECT userId FROM users WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    flash_redirect("../login.html", "Username vergeben", false, "register");
}

// User anlegen
$hash = password_hash($pass1, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->execute([$username, $hash]);

// Default-Spielstand anlegen
$userId = (int)$pdo->lastInsertId();
$default = require __DIR__ . "/default_state.php";
$json = json_encode($default);

$stmt = $pdo->prepare("INSERT INTO saves (userId, gameStateJson, timestamp) VALUES (?, ?, NOW())");
$stmt->execute([$userId, $json]);

flash_redirect("../login.html", "Registrierung erfolgreich", true, "login");
