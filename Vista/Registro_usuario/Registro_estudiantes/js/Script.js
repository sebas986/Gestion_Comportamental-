    // =====================================================
    // 1. MOSTRAR / OCULTAR CONTRASEÑA
    // =====================================================
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

    // =====================================================
    // 2. VALIDACIÓN Y ENVÍO DEL FORMULARIO
    // =====================================================
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('formEstudiante');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (this.checkValidity()) {
          const datos = {
            estudiante: {
              nombres:   document.getElementById('nombres').value,
              apellidos: document.getElementById('apellidos').value,
              tipoDoc:   document.getElementById('tipoDoc').value,
              documento: document.getElementById('documento').value,
              grado:     document.getElementById('grado').value,
              grupo:     document.getElementById('grupo').value
            },
            password: document.getElementById('password').value || null
          };

          console.log('✅ Datos a guardar:', datos);
          alert('✅ Estudiante registrado correctamente');
          this.reset();
          this.classList.remove('was-validated');
        } else {
          this.classList.add('was-validated');
        }
      });

      // =====================================================
      // 3. ACCESIBILIDAD: Enter / Espacio sobre el ojo de contraseña
      // =====================================================
      const toggle = document.querySelector('.password-toggle');
      if (toggle) {
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePassword('password');
          }
        });
      }
    });