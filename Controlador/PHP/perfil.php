<?php
session_start();

if (!isset($_SESSION['documento'])) {
    header("Location: login.html");
    exit();
}

echo "¡Bienvenido! Tu documento es: " . $_SESSION['documento'];
?>
