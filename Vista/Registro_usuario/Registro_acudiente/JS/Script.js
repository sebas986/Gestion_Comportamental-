// ===== 1. MOSTRAR/OCULTAR PROFESIÓN SEGÚN ROL =====
document.addEventListener('DOMContentLoaded', function() {
  const rolSelect = document.getElementById('rol');
  const profesionDiv = document.getElementById('profesionDiv');
  
  if (rolSelect && profesionDiv) {
    rolSelect.addEventListener('change', function() {
      if (this.value === 'padre') {
        profesionDiv.classList.remove('d-none');
        document.getElementById('profesion').required = true;
      } else {
        profesionDiv.classList.add('d-none');
        document.getElementById('profesion').required = false;
        document.getElementById('profesion').value = '';
      }
    });
  }
});

// ===== 2. MOSTRAR/OCULTAR CONTRASEÑA =====
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = passwordInput.nextElementSibling.querySelector('i');
  
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

// ===== 3. VALIDACIÓN DEL FORMULARIO =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formulario');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (this.checkValidity()) {
        // Datos a enviar
        const datos = {
          rol: document.getElementById('rol').value,
          nombres: document.getElementById('nombres').value,
          apellidos: document.getElementById('apellidos').value,
          tipoDoc: document.getElementById('tipoDoc').value,
          documento: document.getElementById('documento').value,
          correo: document.getElementById('correo').value,
          telefono: document.getElementById('telefono').value,
          direccion: document.getElementById('direccion').value,
          nombreEstudiante: document.getElementById('nombreEstudiante').value,
          parentesco: document.getElementById('parentesco').value,
          profesion: document.getElementById('profesion').value || null,
          password: document.getElementById('password').value
        };
        
        console.log('✅ Datos a guardar:', datos);
        alert('✅ Registro guardado correctamente');
        this.reset();
        this.classList.remove('was-validated');
        // Ocultar profesión si estaba visible
        document.getElementById('profesionDiv').classList.add('d-none');
      } else {
        this.classList.add('was-validated');
      }
    });
  }
});