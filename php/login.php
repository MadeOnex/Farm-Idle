<?php
ini_set('display_errors', '1'); error_reporting(E_ALL);
session_start();
require __DIR__ . '/connection.php';

$login = trim($_POST['login'] ?? '');   // Feldname aus deinem Login-Form
$pass  = $_POST['password'] ?? '';

if ($login === '' || $pass === '') {
  header('Location: /login.html?tab=login&m=err&text=' . urlencode('Bitte alles ausfüllen.'));
  exit;
}

$stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($pass, $user['password_hash'])) {
  header('Location: /login.html?tab=login&m=err&text=' . urlencode('Username oder Passwort falsch.'));
  exit;
}

// Session füllen (eingeloggt bleiben über weitere Seiten)
session_regenerate_id(true);
$_SESSION['uid']      = $user['id'];
$_SESSION['username'] = $user['username'];

// Weiter zur App – Pfad anpassen, wenn dein index woanders liegt
header('Location: /index.php');
exit;
