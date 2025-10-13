<?php
session_start();
require __DIR__ . "/connection.php";

if (isset($_GET["login"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $statement = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $result = $statement->execute([$username]);
    $user = $statement->fetch();

    // Passwort Überprüfen
    if ($user !== false && password_verify($password, $user["password"])) {
        session_regenerate_id(true);
        header("Location: ../index.html");
        exit;
    } else {
        $errorMessage = "Username oder Passwort war ungültig.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farm-Idle</title>


</head>

<body>

    <?php
    if (isset($errorMessage)) {
        echo $errorMessage;
    }
    ?>

    <form action="?login=1" method="post">
        <h2>Login</h2>

        <label for="username">Username</label>
        <input type="text" name="username" placeholder="Username" required>

        <label for="password">Passwort</label>
        <input type="password" name="password" placeholder="Passwort" required>

        <button type="submit">Login</button>
    </form>

</body>

</html>