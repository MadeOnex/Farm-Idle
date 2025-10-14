<?php
require __DIR__ . '/connection.php';

function flash_redirect(string $path, string $text, bool $ok, string $tab)
{
    setcookie("flash_text", $text, time() + 30, "/");
    setcookie("flash_ok", $ok ? "1" : "0", time() + 30, "/");
    setcookie("flash_tab", $tab, time() + 30, "/");
    header("Location: $path");
    exit;
}

$username = $_POST["username"] ?? "";
$pass1 = $_POST["password"] ?? "";
$pass2 = $_POST["password2"] ?? "";

// IF Abfragen
if ($username === "" || $pass1 === "" || $pass2 === "") {
    flash_redirect("../login.php", "Bitte alles ausfüllen.", false, "register");
}
if ($pass1 !== $pass2) {
    flash_redirect("../login.html", "Passwörter stimmen nicht überein.", false, "register");
}
if (strlen($pass1) < 4) {
    flash_redirect("../login.html", "Passwort mind. 4 Zeichen", false, "register");
}

// Username Unique
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    flash_redirect("../login.html", "Username ist bereits vergeben", false, "register");
}

// DB Speichern
$hash = password_hash($pass1, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->execute([$username, $pass1]);

flash_redirect("../login.html", "Registrierung erfolgreich. Bitte einlogen", true, "login");
