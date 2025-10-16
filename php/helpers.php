<?php
// Hilfsfunktionen

// Flash-Message setzen und weiterleiten
function flash_redirect($path, $text, $ok, $tab = "login") {
    setcookie("flash_text", $text, time() + 30, "/");
    setcookie("flash_ok", $ok ? "1" : "0", time() + 30, "/");
    setcookie("flash_tab", $tab, time() + 30, "/");
    header("Location: $path");
    exit;
}

// Session prüfen (für API)
function require_login() {
    if (empty($_SESSION["user_id"])) {
        http_response_code(401);
        echo json_encode(["error" => "Nicht eingeloggt"]);
        exit;
    }
}

// JSON aus Request holen
function get_json_input() {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(["error" => "Ungültiges JSON"]);
        exit;
    }
    return $data;
}