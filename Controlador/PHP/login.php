<?php
session_start();

$conexion = new mysqli("localhost", "root", "", "base_usuarios");

if ($conexion->connect_error) {
    die("❌ Error de conexión: " . $conexion->connect_error);
}

// Verificamos que los campos requeridos estén presentes
if (isset($_POST['documento']) && isset($_POST['contrasena']) && isset($_POST['tipo_usuario'])) {
    $documento = $_POST['documento'];
    $contrasena = $_POST['contrasena'];
    $rolFormulario = strtolower($_POST['tipo_usuario']); // Rol desde el formulario

    // CONSULTA PREPARADA
    $stmt = $conexion->prepare("SELECT * FROM registro_usuarios WHERE documento = ?");
    $stmt->bind_param("s", $documento);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        // DEBUG opcional (activa para ver qué trae):
        /*
        echo "<pre>";
        print_r($usuario);
        echo "</pre>";
        exit;
        */

        // ⚠️ Asegúrate que tu base de datos tenga una columna llamada exactamente 'contrasena' (sin ñ)
        if (isset($usuario['contrasena'])) {
            if (password_verify($contrasena, $usuario['contrasena'])) {
                if (strtolower($usuario['rol']) === $rolFormulario) {
                    $_SESSION['documento'] = $usuario['documento'];
                    $_SESSION['nombre'] = $usuario['nombre'];
                    $_SESSION['rol'] = $usuario['rol'];

                    // Redirige según el rol
    if ($rolFormulario === "docente") {
    header("Location: ../../Vista/Docente/Index.html");
    }   elseif ($rolFormulario === "estudiante") {
    header("Location: ../../Vista/Estudiantes/index.html");
    }            elseif ($rolFormulario === "admin") {
    header("Location:../../Vista/Admin/Index.html"); // ✅ ajusta si ese archivo tiene otro nombre
    }   else {
    header("Location: perfil.php"); // Por si acaso
    }
                    exit;
                } else {
                    echo "❌ El rol no coincide con el usuario.";
                }
            } else {
                echo "❌ Contraseña incorrecta.";
            }
        } else {
            echo "⚠️ La columna 'contrasena' no existe en la base de datos. ¿Tal vez la escribiste como 'contraseña' o 'password'?";
        }
    } else {
        echo "❌ Usuario no encontrado.";
    }

    $stmt->close();
} else {
    echo "❌ Por favor completa todos los campos.";
}

$conexion->close();
?>