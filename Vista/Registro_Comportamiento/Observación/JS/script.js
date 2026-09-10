    // ---------- ALTERNADOR DE VISTAS ----------
    let vistaActual = 'seguimiento';

    function alternarVista() {
        const btn = document.getElementById('btnToggle');
        if (vistaActual === 'seguimiento') {
            document.getElementById('vistaSeguimiento').classList.remove('activa');
            document.getElementById('vistaObservacion').classList.add('activa');
            vistaActual = 'observacion';
            btn.title = 'Cambiar a Seguimiento';
            btn.classList.add('rotar');
            cargarListaObservaciones();
        } else {
            document.getElementById('vistaObservacion').classList.remove('activa');
            document.getElementById('vistaSeguimiento').classList.add('activa');
            vistaActual = 'seguimiento';
            btn.title = 'Cambiar a Observación';
            btn.classList.remove('rotar');
            cargarDatosSeguimiento();
        }
    }

    // ---------- FUNCIONES GENERALES DE EDICIÓN ----------
    function editarTodo() {
        document.querySelectorAll('input, textarea, select').forEach(c => c.disabled = false);
        document.body.classList.add('editando');
        document.getElementById('avisoEdicion').style.display = 'inline';
    }

    function guardarTodo() {
        if (vistaActual === 'seguimiento') {
            const grado = document.getElementById('grado');
            const grupo = document.getElementById('grupo');
            if (grado.value.trim() !== '' && (parseInt(grado.value) < 1 || parseInt(grado.value) > 11)) {
                alert('El grado debe estar entre 1 y 11'); return;
            }
            if (grupo.value.trim() !== '' && (parseInt(grupo.value) < 1 || parseInt(grupo.value) > 5)) {
                alert('El grupo debe estar entre 1 y 5'); return;
            }
        }

        document.querySelectorAll('input, textarea, select').forEach(c => c.disabled = true);
        document.body.classList.remove('editando');
        document.getElementById('avisoEdicion').style.display = 'none';

        guardarDatosSeguimiento();
        guardarObservacionActual();
        alert('✅ Información guardada correctamente');
    }

    // ---------- PERSISTENCIA SEGUIMIENTO ----------
    function guardarDatosSeguimiento() {
        const datos = {
            nombre: document.getElementById('nombre').value,
            grado: document.getElementById('grado').value,
            grupo: document.getElementById('grupo').value,
            nacimiento: document.getElementById('nacimiento').value,
            documento: document.getElementById('documento').value,
            padre: document.getElementById('padre').value,
            telpadre: document.getElementById('telpadre').value,
            madre: document.getElementById('madre').value,
            telmadre: document.getElementById('telmadre').value,
            obs1: document.getElementById('obs1').value,
            firma1p: document.getElementById('firma1p').value,
            firma1e: document.getElementById('firma1e').value,
            obs2: document.getElementById('obs2').value,
            firma2p: document.getElementById('firma2p').value,
            firma2e: document.getElementById('firma2e').value,
            obs3: document.getElementById('obs3').value,
            firma3p: document.getElementById('firma3p').value,
            firma3e: document.getElementById('firma3e').value
        };
        localStorage.setItem('seguimientoEstudiante', JSON.stringify(datos));
    }

    function cargarDatosSeguimiento() {
        const guardado = localStorage.getItem('seguimientoEstudiante');
        if (!guardado) return;
        const d = JSON.parse(guardado);
        document.getElementById('nombre').value = d.nombre || '';
        document.getElementById('grado').value = d.grado || '';
        document.getElementById('grupo').value = d.grupo || '';
        document.getElementById('nacimiento').value = d.nacimiento || '';
        document.getElementById('documento').value = d.documento || '';
        document.getElementById('padre').value = d.padre || '';
        document.getElementById('telpadre').value = d.telpadre || '';
        document.getElementById('madre').value = d.madre || '';
        document.getElementById('telmadre').value = d.telmadre || '';
        document.getElementById('obs1').value = d.obs1 || '';
        document.getElementById('firma1p').value = d.firma1p || '';
        document.getElementById('firma1e').value = d.firma1e || '';
        document.getElementById('obs2').value = d.obs2 || '';
        document.getElementById('firma2p').value = d.firma2p || '';
        document.getElementById('firma2e').value = d.firma2e || '';
        document.getElementById('obs3').value = d.obs3 || '';
        document.getElementById('firma3p').value = d.firma3p || '';
        document.getElementById('firma3e').value = d.firma3e || '';
    }

    // ---------- PERSISTENCIA OBSERVACIONES (MÚLTIPLES SESIONES) ----------
    function obtenerListaObservaciones() {
        const guardado = localStorage.getItem('listaObservaciones');
        return guardado ? JSON.parse(guardado) : [];
    }

    function guardarListaObservaciones(lista) {
        localStorage.setItem('listaObservaciones', JSON.stringify(lista));
    }

    function cargarListaObservaciones() {
        const lista = obtenerListaObservaciones();
        const select = document.getElementById('selectorObservaciones');
        select.innerHTML = '<option value="">-- Sin observaciones --</option>';
        lista.forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = `Observación ${id}`;
            select.appendChild(option);
        });
        if (lista.length > 0) {
            select.value = lista[lista.length - 1];
            cambiarObservacion();
        } else {
            limpiarFormularioObservacion();
        }
    }

    function nuevaObservacion() {
        const lista = obtenerListaObservaciones();
        const nuevoId = lista.length > 0 ? Math.max(...lista) + 1 : 1;
        lista.push(nuevoId);
        guardarListaObservaciones(lista);
        cargarListaObservaciones();
        document.getElementById('selectorObservaciones').value = nuevoId;
        limpiarFormularioObservacion();
    }

    function cambiarObservacion() {
        const id = document.getElementById('selectorObservaciones').value;
        if (!id) {
            limpiarFormularioObservacion();
            return;
        }
        const guardado = localStorage.getItem(`observacion_${id}`);
        if (guardado) {
            const d = JSON.parse(guardado);
            document.getElementById('fechaObs').value = d.fecha || '';
            document.getElementById('tipoSeleccionado').value = d.tipo || 'reconocimiento';
            document.getElementById('situacionTipo').value = d.situacion || '';
            document.getElementById('descHecho').value = d.descHecho || '';
            document.getElementById('descargos').value = d.descargos || '';
            document.getElementById('acciones').value = d.acciones || '';
            document.getElementById('firmaEstudianteObs').value = d.firmaEstudiante || '';
            document.getElementById('firmaDocenteObs').value = d.firmaDocente || '';
            document.getElementById('firmaAcudienteObs').value = d.firmaAcudiente || '';
            if (d.tipo === 'observacion') {
                document.getElementById('btnReconocimiento').classList.remove('activo');
                document.getElementById('btnObservacion').classList.add('activo');
            } else {
                document.getElementById('btnReconocimiento').classList.add('activo');
                document.getElementById('btnObservacion').classList.remove('activo');
            }
        } else {
            limpiarFormularioObservacion();
        }
    }

    function guardarObservacionActual() {
        const id = document.getElementById('selectorObservaciones').value;
        if (!id) return;
        const datos = {
            fecha: document.getElementById('fechaObs').value,
            tipo: document.getElementById('tipoSeleccionado').value,
            situacion: document.getElementById('situacionTipo').value,
            descHecho: document.getElementById('descHecho').value,
            descargos: document.getElementById('descargos').value,
            acciones: document.getElementById('acciones').value,
            firmaEstudiante: document.getElementById('firmaEstudianteObs').value,
            firmaDocente: document.getElementById('firmaDocenteObs').value,
            firmaAcudiente: document.getElementById('firmaAcudienteObs').value
        };
        localStorage.setItem(`observacion_${id}`, JSON.stringify(datos));
    }

    function limpiarFormularioObservacion() {
        document.getElementById('fechaObs').value = '';
        document.getElementById('tipoSeleccionado').value = 'reconocimiento';
        document.getElementById('situacionTipo').value = '';
        document.getElementById('descHecho').value = '';
        document.getElementById('descargos').value = '';
        document.getElementById('acciones').value = '';
        document.getElementById('firmaEstudianteObs').value = '';
        document.getElementById('firmaDocenteObs').value = '';
        document.getElementById('firmaAcudienteObs').value = '';
        document.getElementById('btnReconocimiento').classList.add('activo');
        document.getElementById('btnObservacion').classList.remove('activo');
    }

    function seleccionarTipo(tipo) {
        document.getElementById('btnReconocimiento').classList.remove('activo');
        document.getElementById('btnObservacion').classList.remove('activo');
        if (tipo === 'reconocimiento') {
            document.getElementById('btnReconocimiento').classList.add('activo');
        } else {
            document.getElementById('btnObservacion').classList.add('activo');
        }
        document.getElementById('tipoSeleccionado').value = tipo;
    }

    // ---------- CARGA INICIAL ----------
    window.addEventListener('DOMContentLoaded', () => {
        cargarDatosSeguimiento();
        cargarListaObservaciones();
    });