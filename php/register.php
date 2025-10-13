<?php 
init_set("display_errors", "1");
error_reporting(E_ALL);

require __DIR__ . '/connection.php';

$username = $_POST["username"] ?? "";
$pass1 = $_POST["password"] ?? "";
$pass2 = $_POST["password2"] ?? "";


?>