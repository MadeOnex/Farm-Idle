<?php
session_start();
require __DIR__ . "/connection.php";
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

    $showFormular = true;

    if (isset($_GET["register"])) {
        $error = false;
        $username = $_POST["username"];
        $password = $_POST["password"];
        $password2 = $_POST["password2"];

        if (!($username)) {
            echo "Bitte Username Eingeben";
            $error = true;
        }
        if (strlen($password) == 0) {
            echo "Bitte ein Passwort angeben";
            $error = true;
        }
        if ($password != $password2) {
            echo "Passwörter stimmen nicht überein.";
            $error = true;
        }

        if (!$error) {
            $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
            $result = $statement->execute(array("username" => $username));
            $user = $statement->fetch();

            if ($user !== false) {
                echo "Dieser Username ist bereits vergeben!";
                $error = true;
            }
        }

        if (!$error) {
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            $statement = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $result = $statement->execute([$username, $password_hash]);

            if ($result) {
                echo "Du wurdest Erfolreich Registriert.";
            } else {
                echo "Beim Abspeichern ist leider ein Fehler aufgetreten.";
            }
        }
    }
    if ($showFormular) {

    ?>
        <form action="?register=1" method="post">
            <h2>Registrierung</h2>
            <label for="username">Username</label>
            <input type="text" name="username" placeholder="Username" required>

            <label for="password">Passwort</label>
            <input type="password" name="password" placeholder="Passwort" required>

            <label for="password2">Passwort wiederholen</label>
            <input type="password" name="password2" placeholder="Passwort" required>

            <button type="submit">Register</button>
        </form>

    <?php
    }
    ?>

</body>

</html>