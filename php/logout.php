<?php
session_start();
session_unset();
session_destroy();

setcookie("flash_text", "Abgemeldet.", time() + 30, "/");
setcookie("flash_ok", "1", time() + 30, "/");
setcookie("flash_tab", "login", time() + 30, "/");
header("Location: ../login.html");
exit;
