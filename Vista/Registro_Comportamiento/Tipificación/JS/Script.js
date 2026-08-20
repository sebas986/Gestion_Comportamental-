    // ===== BASE DE DATOS DE TIPIFICACIONES COMPLETA =====
    let tipificaciones = {
      1: [
        "Ingresar al baño del género opuesto sin autorización",
        "Usar expresiones vulgares o apodos que incomoden",
        "Interrumpir clases con gritos o desorden",
        "Manifestaciones de afecto inadecuadas para el contexto escolar",
        "Tomar materiales de compañeros sin permiso",
        "Incumplir responsabilidades de aseo",
        "Salir de la institución sin autorización",
        "Permanecer en horarios no autorizados",
        "Tirar basura en espacios institucionales",
        "Escupir en espacios físicos o hacia personas",
        "Burlarse o mostrar irrespeto ante llamados de atención",
        "Permitir ingreso de personas externas sin autorización",
        "Permanecer en el aula durante descansos sin permiso",
        "Bloquear zonas de circulación o no respetar turnos",
        "Usar elementos distractores como celulares o audífonos",
        "Llegar tarde sin justificación",
        "Consumir alimentos en lugares no permitidos",
        "Realizar actividades distintas a las indicadas por el docente",
        "Participar en juegos de contacto físico con riesgo leve",
        "Divulgar información falsa que altere el ambiente escolar",
        "Participar en chismes o rumores",
        "Promover acciones que afecten la convivencia",
        "No respetar reglas de juego limpio en actividades",
        "Desperdiciar alimentos del programa escolar",
        "Retirarse de actividades sin autorización",
        "Apropiarse de objetos de bajo valor sin ánimo de lucro",
        "Rayar muebles o paredes de la institución"
      ],
      2: [
        "Interrumpir reiteradamente las clases pese a llamados de atención",
        "Compartir contenido pornográfico que vulnere la dignidad de la comunidad",
        "Ocultar identidad o dar información falsa para engañar o perjudicar",
        "Alterar evaluaciones, registros o certificados escolares",
        "Falsificar firmas o suplantar identidad",
        "Manipular procesos disciplinarios u ocultar evidencias",
        "Divulgar datos personales sin consentimiento",
        "Usar objetos peligrosos o que los simulen",
        "Vandalizar instalaciones o recursos de la institución",
        "Facilitar ingreso de personas no autorizadas generando desorden",
        "Enviar mensajes o llamadas anónimas amenazantes",
        "Exponer el cuerpo de compañeros de forma ofensiva",
        "Discriminar o burlarse por género, cultura, apariencia, etc.",
        "Atentar contra la salud o integridad sin causar incapacidad",
        "Amenazar o intimidar verbal o psicológicamente",
        "Realizar ciberacoso en redes sociales",
        "Usar agresión física o verbal para resolver conflictos",
        "Realizar prácticas sexuales dentro de la institución",
        "Hacer tatuajes, perforaciones o cortes a otro estudiante"
      ],
      3: [
        "Agresión física que cause incapacidad o daño severo",
        "Portar o usar armas u objetos cortopunzantes",
        "Provocar incendios o vandalismo grave",
        "Inducir a autolesiones o suicidio",
        "Amenazar de muerte a miembros de la comunidad educativa",
        "Participar en disturbios que pongan en riesgo vidas",
        "Retener ilegalmente a una persona dentro de la institución",
        "Atentar contra la vida o dignidad de alguien",
        "Abuso o acoso sexual",
        "Grabar con cámaras en baños u otros lugares privados",
        "Publicar o distribuir imágenes íntimas sin autorización",
        "Consumir o distribuir drogas en el contexto escolar",
        "Presentarse a la institución bajo efectos de drogas",
        "Facilitar ingreso de personas externas para tráfico de drogas",
        "Participar en chantaje, extorsión o trata de personas",
        "Cualquier conducta considerada delito por la ley colombiana"
      ]
    };

    let tipoActual = 1;

    // ===== MOSTRAR TABLA POR TIPO =====
    function mostrarTablaPorTipo(tipo) {
      const tbody = document.getElementById(`tablaTipo${tipo}`);
      if (!tbody) return;
      const faltas = tipificaciones[tipo];
      let html = '';
      if (faltas.length === 0) {
        html = '<tr><td colspan="4" class="empty-row">No hay faltas registradas en este tipo</td></tr>';
      } else {
        faltas.forEach((descripcion, idx) => {
          const num = idx + 1;
          const codigo = `T${tipo}-${num.toString().padStart(2, '0')}`;
          html += `
            <tr>
              <td>${num}</td>
              <td><strong>${codigo}</strong></td>
              <td>${descripcion}</td>
              <td class="text-center">
                <button class="btn btn-danger-sm" onclick="eliminarFalta(${tipo}, ${idx})">
                  <i class="bi bi-trash3"></i> Eliminar
                </button>
              </td>
            </tr>
          `;
        });
      }
      tbody.innerHTML = html;
      
      // Actualizar contador en la pestaña
      const countSpan = document.getElementById(`countTipo${tipo}`);
      if (countSpan) countSpan.textContent = faltas.length;
    }

    function actualizarTodasLasTablas() {
      mostrarTablaPorTipo(1);
      mostrarTablaPorTipo(2);
      mostrarTablaPorTipo(3);
    }

    // ===== ELIMINAR FALTA =====
    window.eliminarFalta = function(tipo, indice) {
      if (confirm('¿Está seguro de eliminar esta falta del manual de convivencia?')) {
        tipificaciones[tipo].splice(indice, 1);
        actualizarTodasLasTablas();
      }
    };

    // ===== MODAL =====
    function abrirModalNuevaTipificacion(tipo) {
      tipoActual = tipo;
      const titulo = document.getElementById('modalTitulo');
      if (tipo === 1) titulo.innerHTML = '<i class="bi bi-1-circle-fill me-2"></i> Agregar nueva falta - Tipo 1 (Leves)';
      else if (tipo === 2) titulo.innerHTML = '<i class="bi bi-2-circle-fill me-2"></i> Agregar nueva falta - Tipo 2 (Graves)';
      else titulo.innerHTML = '<i class="bi bi-3-circle-fill me-2"></i> Agregar nueva falta - Tipo 3 (Gravísimas)';
      document.getElementById('nuevaDescripcion').value = '';
      document.getElementById('modalNuevaTipificacion').classList.add('show');
    }

    function cerrarModalNuevaTipificacion() {
      document.getElementById('modalNuevaTipificacion').classList.remove('show');
    }

    function guardarNuevaTipificacion() {
      const descripcion = document.getElementById('nuevaDescripcion').value.trim();
      if (!descripcion) {
        alert('Por favor escriba la descripción de la falta');
        return;
      }
      tipificaciones[tipoActual].push(descripcion);
      cerrarModalNuevaTipificacion();
      actualizarTodasLasTablas();
      alert(`✓ Nueva falta agregada exitosamente al Tipo ${tipoActual}`);
    }

    // ===== INICIALIZAR =====
    actualizarTodasLasTablas();