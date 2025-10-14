<?php
session_start();
require __DIR__ . "/connection.php";

function flash_redirect(string $path, string $text, bool $ok, string $tab)
{
  setcookie("flash_text", $text, time() + 30, "/");
  setcookie("flash_ok", $ok ? "1" : "0", time() + 30, "/");
  setcookie("flash_tab", $tab, time() + 30, "/");
  header("Location: $path");
  exit;
}

$login = trim($_POST["login-username"] ?? "");
$pass = $_post["password"] ?? "";

if ($login === "" || $pass === "") {
  flash_redirect("../login.html", "Bitte alles ausfüllen", false, "login");
}

$stmt = $pdo->prepare("SELECT username, password FROM users WHERE username = ? LIMIT 1");
$stmt->execute([$login]);
$user = $stmt->fetch();

if (!$user || !password_verify($pass, $user["password"])) {
  flash_redirect("../login.html", "Username oder Password falsch", false, "login");
}

session_regenerate_id(true);
$_SESSION["username"] = $user["username"];

header("Location: ../index.php");
exit;
