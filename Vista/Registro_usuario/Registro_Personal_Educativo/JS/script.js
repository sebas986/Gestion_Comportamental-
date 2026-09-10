// ===== 1. MOSTRAR/OCULTAR CONTRASEÑA =====
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

// ===== 2. VALIDACIÓN DE CONTRASEÑAS COINCIDENTES =====
document.addEventListener('DOMContentLoaded', function() {
  const confirmPassword = document.getElementById('confirmPassword');
  const password = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  
  if (confirmPassword && password) {
    confirmPassword.addEventListener('input', function() {
      if (password.value !== this.value) {
        this.setCustomValidity('Las contraseñas no coinciden');
        passwordError.style.display = 'block';
      } else {
        this.setCustomValidity('');
        passwordError.style.display = 'none';
      }
    });
  }
});

// ===== 3. VALIDACIÓN DEL FORMULARIO =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formPersonal');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Verificar si las contraseñas coinciden
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity('Las contraseñas no coinciden');
        document.getElementById('passwordError').style.display = 'block';
        this.classList.add('was-validated');
        return;
      }
      
      // Si todo es válido
      if (this.checkValidity()) {
        const datos = {
          nombres: document.getElementById('nombres').value,
          apellidos: document.getElementById('apellidos').value,
          tipoDoc: document.getElementById('tipoDoc').value,
          documento: document.getElementById('documento').value,
          correo: document.getElementById('correo').value,
          telefono: document.getElementById('telefono').value,
          rol: document.getElementById('rol').value,
          password: document.getElementById('password').value
        };
        
        console.log('✅ Datos a guardar:', datos);
        alert('✅ Personal registrado correctamente');
        this.reset();
        this.classList.remove('was-validated');
        passwordError.style.display = 'none';
      } else {
        this.classList.add('was-validated');
      }
    });
  }
});