<?php
$conexion = new mysqli("localhost", "root", "", "base_usuarios");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$tipoDocumento = $_POST['tipoDocumento'];
$documento = $_POST['documento'];
$rol = $_POST['rol'];
$correo = $_POST['email']; // Cambiado de 'correo' a 'email'
$telefono = $_POST['telefono'];
$contrasena = $_POST['password']; // Cambiado de 'contrasena' a 'password'

$hash = password_hash($contrasena, PASSWORD_DEFAULT);

$sql = "INSERT INTO registro_usuarios (nombre, apellido, tipo_documento, documento, rol, correo, telefono, contrasena)
        VALUES ('$nombre', '$apellido', '$tipoDocumento', '$documento', '$rol', '$correo', '$telefono', '$hash')";

if ($conexion->query($sql) === TRUE) {
    echo "✅ Usuario registrado correctamente. <a href='../../Index.html'>Iniciar sesión</a>";
} else {
    echo "❌ Error al registrar: " . $conexion->error;
}
$conexion->close();
?>