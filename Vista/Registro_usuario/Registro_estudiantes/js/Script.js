    // ===== 1. MOSTRAR/OCULTAR CONTRASEÑA CON ICONO =====
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

    // ===== 2. VALIDACIÓN DEL FORMULARIO =====
    document.getElementById('formEstudiante').addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (this.checkValidity()) {
        // Aquí se enviarían los datos
        const datos = {
          estudiante: {
            nombres: document.getElementById('nombres').value,
            tipoDoc: document.getElementById('tipoDoc').value,
            documento: document.getElementById('documento').value,
            grado: document.getElementById('grado').value,
            grupo: document.getElementById('grupo').value,
            fechaNac: document.getElementById('fechaNac').value
          },
          acudiente: {
            documento: document.getElementById('docAcudiente').value,
            parentesco: document.getElementById('parentesco').value
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