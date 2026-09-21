// ===== 1. MOSTRAR/OCULTAR CONTRASEÑA =====
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = passwordInput.parentElement.querySelector('i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('bi-eye');
    toggleIcon.classList.add('bi-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('bi-eye-slash');
    toggleIcon.classList.add('bi-eye');
  }
}

// ===== 2. VALIDACIÓN DEL FORMULARIO =====
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (this.checkValidity()) {
        const datos = {
          rol:              document.getElementById('rol').value,
          nombres:          document.getElementById('nombres').value,
          apellidos:        document.getElementById('apellidos').value,
          tipoDoc:          document.getElementById('tipoDoc').value,
          documento:        document.getElementById('documento').value,
          correo:           document.getElementById('correo').value,
          telefono:         document.getElementById('telefono').value,
          nombreEstudiante: document.getElementById('nombreEstudiante').value,
          parentesco:       document.getElementById('parentesco').value,
          password:         document.getElementById('password').value
        };

        console.log('✅ Datos a guardar:', datos);
        alert('✅ Registro guardado correctamente');
        this.reset();
        this.classList.remove('was-validated');
      } else {
        this.classList.add('was-validated');
      }
    });
  }
});