// ============================================================
//  SISTEMA DE LOGIN - USUARIOS PREDEFINIDOS
// ============================================================

// ===== 1. BASE DE DATOS DE USUARIOS (solo ejemplo) =====
const usuarios = [
    // Administradores
    {
        documento: "1001",
        contraseña: "admin123",
        rol: "administrador",
        nombre: "Administrador General",
        redirigir: "../Admin/Index.html"
    },
    // Docentes
    {
        documento: "2001",
        contraseña: "docente123",
        rol: "docente",
        nombre: "Profesor Principal",
        redirigir: "../Docente/Index.html"
    },
    {
        documento: "2002",
        contraseña: "docente456",
        rol: "docente",
        nombre: "Profesor de Matemáticas",
        redirigir: "../../Docente/Index.html"
    },
    // Padres de familia
    {
        documento: "3001",
        contraseña: "padre123",
        rol: "padre_familia",
        nombre: "Padre de Familia",
        redirigir: "../Padres/Index.html"
    },
    {
        documento: "3002",
        contraseña: "padre456",
        rol: "padre_familia",
        nombre: "Madre de Familia",
        redirigir: "../Padres/Index.html"
    },
    // Estudiantes
    {
        documento: "4001",
        contraseña: "estudiante123",
        rol: "estudiante",
        nombre: "Estudiante Ejemplo",
        redirigir: "../Estudiantes/Index.html"
    },
    {
        documento: "4002",
        contraseña: "estudiante456",
        rol: "estudiante",
        nombre: "Estudiante Secundaria",
        redirigir: "../Estudiantes/Index.html"
    }
];

// ============================================================
//  ESPERAR A QUE EL DOM ESTÉ CARGADO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggle();
    initCustomSelect();
    initFormValidation();
});

// ============================================================
//  1. Toggle de contraseña (mostrar/ocultar)
// ============================================================
function initPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (!toggleBtn || !passwordInput) return;
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const isPassword = passwordInput.type === 'password';
        
        // Cambiar tipo de input
        passwordInput.type = isPassword ? 'text' : 'password';
        
        // Cambiar icono
        this.classList.toggle('fa-eye', !isPassword);
        this.classList.toggle('fa-eye-slash', isPassword);
    });
}

// ============================================================
//  2. Custom dropdown de roles (manteniendo el selector visual)
// ============================================================
function initCustomSelect() {
    const wrapper = document.getElementById('roleSelectWrapper');
    const trigger = document.getElementById('roleSelectTrigger');
    const optionsContainer = document.getElementById('roleOptions');
    const hiddenSelect = document.getElementById('rolHidden');
    
    if (!wrapper || !trigger || !optionsContainer) return;
    
    const selectedValueDiv = trigger.querySelector('.selected-value');
    const allOptions = document.querySelectorAll('.option-item');
    
    // Abrir/cerrar dropdown
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllDropdowns();
        
        const isOpen = optionsContainer.classList.contains('open');
        if (!isOpen) {
            openDropdown();
        }
    });
    
    // Seleccionar opción
    allOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            selectOption(this);
        });
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Funciones auxiliares
    function openDropdown() {
        optionsContainer.classList.add('open');
        trigger.classList.add('open');
    }
    
    function closeDropdown() {
        optionsContainer.classList.remove('open');
        trigger.classList.remove('open');
    }
    
    function closeAllDropdowns() {
        document.querySelectorAll('.custom-options.open').forEach(opt => {
            if (opt !== optionsContainer) opt.classList.remove('open');
        });
        document.querySelectorAll('.custom-select-trigger.open').forEach(trig => {
            if (trig !== trigger) trig.classList.remove('open');
        });
    }
    
    function selectOption(option) {
        const value = option.dataset.value;
        const iconClass = option.dataset.icon;
        const label = option.querySelector('span').textContent;
        
        // Actualizar visualización
        selectedValueDiv.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${label}</span>
        `;
        
        // Actualizar select oculto
        if (hiddenSelect) {
            hiddenSelect.value = value;
        }
        
        // Actualizar estado visual
        allOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Cerrar dropdown
        closeDropdown();
    }
}

// ============================================================
//  3. VALIDACIÓN DEL FORMULARIO Y LOGIN
// ============================================================
function initFormValidation() {
    const form = document.getElementById('loginForm');
    const hiddenSelect = document.getElementById('rolHidden');
    const documentoInput = document.querySelector('input[name="documento"]');
    const passwordInput = document.getElementById('password');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitar que recargue la página
        
        // Verificar que se haya seleccionado un rol
        if (!hiddenSelect || !hiddenSelect.value) {
            showAlert('⚠️ Por favor, selecciona tu rol antes de iniciar sesión.', 'warning');
            
            // Abrir el dropdown automáticamente
            const trigger = document.getElementById('roleSelectTrigger');
            const optionsContainer = document.getElementById('roleOptions');
            
            if (trigger && optionsContainer) {
                optionsContainer.classList.add('open');
                trigger.classList.add('open');
                trigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Obtener credenciales
        const documento = documentoInput ? documentoInput.value.trim() : '';
        const contraseña = passwordInput ? passwordInput.value.trim() : '';
        
        // Validar que los campos no estén vacíos
        if (!documento || !contraseña) {
            showAlert('⚠️ Por favor, completa todos los campos.', 'warning');
            return;
        }
        
        // Buscar usuario en la base de datos
        const usuario = usuarios.find(u => 
            u.documento === documento && 
            u.contraseña === contraseña &&
            u.rol === hiddenSelect.value
        );
        
        if (usuario) {
            // ✅ LOGIN EXITOSO
            console.log(`✅ Bienvenido, ${usuario.nombre} (${usuario.rol})`);
            
            // Guardar sesión en localStorage (opcional, para mantener sesión)
            localStorage.setItem('usuario_actual', JSON.stringify({
                documento: usuario.documento,
                nombre: usuario.nombre,
                rol: usuario.rol
            }));
            
            // Mostrar mensaje de éxito
            showAlert(`✅ ¡Bienvenido, ${usuario.nombre}! Redirigiendo...`, 'success');
            
            // Redirigir después de 1.5 segundos
            setTimeout(() => {
                window.location.href = usuario.redirigir;
            }, 1500);
            
        } else {
            // ❌ LOGIN FALLIDO
            let mensajeError = '❌ Credenciales incorrectas. ';
            
            // Mensaje más específico según el caso
            const existeUsuario = usuarios.find(u => u.documento === documento);
            if (!existeUsuario) {
                mensajeError += 'El documento no está registrado.';
            } else if (existeUsuario && existeUsuario.rol !== hiddenSelect.value) {
                mensajeError += `Este usuario no tiene el rol "${hiddenSelect.value}".`;
            } else {
                mensajeError += 'Verifica tu documento y contraseña.';
            }
            
            showAlert(mensajeError, 'danger');
            
            // Limpiar campos para reintentar
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
}

// ============================================================
//  4. FUNCIÓN PARA MOSTRAR ALERTAS (alternativa a SweetAlert2)
// ============================================================
function showAlert(mensaje, tipo = 'info') {
    // Eliminar alertas anteriores
    const alertasAnteriores = document.querySelectorAll('.alert-flotante');
    alertasAnteriores.forEach(al => al.remove());
    
    // Crear contenedor de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-flotante alert alert-${tipo} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        min-width: 300px;
        max-width: 90%;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
        animation: slideDown 0.5s ease-out;
        font-weight: 500;
        text-align: center;
    `;
    
    // Agregar estilos de animación
    if (!document.getElementById('alertStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'alertStyles';
        styleSheet.textContent = `
            @keyframes slideDown {
                from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            .alert-flotante .btn-close-custom {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: 15px;
                color: inherit;
                opacity: 0.7;
            }
            .alert-flotante .btn-close-custom:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Configurar colores según tipo
    const colores = {
        success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724' },
        danger: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24' },
        warning: { bg: '#fff3cd', border: '#ffeeba', color: '#856404' },
        info: { bg: '#d1ecf1', border: '#bee5eb', color: '#0c5460' }
    };
    
    const estilo = colores[tipo] || colores.info;
    alertDiv.style.backgroundColor = estilo.bg;
    alertDiv.style.borderColor = estilo.border;
    alertDiv.style.color = estilo.color;
    
    // Contenido
    alertDiv.innerHTML = `
        <span>${mensaje}</span>
        <button type="button" class="btn-close-custom" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => alertDiv.remove(), 500);
        }
    }, 5000);
}

// ============================================================
//  5. FUNCIÓN TOGGLE PARA EL SELECTOR DE ROL (por compatibilidad)
// ============================================================
// Si el HTML usa onclick="togglePassword()", lo mantenemos como función global
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (!passwordInput || !toggleBtn) return;
    
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.classList.toggle('fa-eye', !isPassword);
    toggleBtn.classList.toggle('fa-eye-slash', isPassword);
}

// ============================================================
//  6. INICIALIZAR LOGIN CON TECLA ENTER (opcional)
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const form = document.getElementById('loginForm');
        if (form && document.activeElement && form.contains(document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});