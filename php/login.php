<?php
session_start();
require __DIR__ . "/connection.php";
require __DIR__ . "/helpers.php";

$username = trim($_POST["login"] ?? "");
$password = $_POST["password"] ?? "";

// User suchen
$stmt = $pdo->prepare("SELECT userId, username, password FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

// Prüfen
if (!$user || !password_verify($password, $user["password"])) {
    flash_redirect("../login.html", "Falscher Username/Passwort", false, "login");
}

// Session setzen
session_regenerate_id(true);
$_SESSION["user_id"] = (int)$user["userId"];
$_SESSION["username"] = $user["username"];

header("Location: ../index.php");
exit;
