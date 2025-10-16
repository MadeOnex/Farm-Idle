<?php
session_start();
session_destroy();

require __DIR__ . "/helpers.php";
flash_redirect("../login.html", "Erfolgreich abgemeldet", true, "login");
