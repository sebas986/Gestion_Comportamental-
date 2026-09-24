        // BASE DE DATOS Y CONEXIÓN DE DATOS EN MEMORIA / LOCALSTORAGE
        let baseEstudiantes = JSON.parse(localStorage.getItem("db_estudiantes")) || [
            { id: "est101", nombre: "Juan Esteban Pérez Gómez", grado: "9°", grupo: "2", documento: "1035987412", acudiente: "Carlos Pérez (Padre)" },
            { id: "est102", nombre: "María Fernanda Pérez Gómez", grado: "7°", grupo: "1", documento: "1036445899", acudiente: "Carlos Pérez (Padre)" }
        ];

        let baseAnotaciones = JSON.parse(localStorage.getItem("db_anotaciones")) || [
            {
                id: "ann_01",
                estudianteId: "est101",
                fecha: "2026-03-05",
                hora: "09:30 AM",
                tipo: "Observación",
                situacionTipo: "Tipo I",
                motivo: "Uso no autorizado de celular en clase",
                descripcion: "El estudiante hace uso reiterado del dispositivo móvil en la clase de Matemáticas.",
                autor: "Docente Ana Ramírez",
                descargo: "Estaba mirando la hora para tomar un medicamento.",
                accionesPedagogicas: "Citación a orientación escolar y compromiso verbal.",
                firmaEstudiante: "Juan Esteban Pérez",
                firmaDocente: "Ana Ramírez",
                firmaAcudiente: "Carlos Pérez"
            },
            {
                id: "ann_02",
                estudianteId: "est101",
                fecha: "2026-02-18",
                hora: "11:15 AM",
                tipo: "Reconocimiento",
                situacionTipo: "N/A",
                motivo: "Liderazgo en jornada cultural",
                descripcion: "Destacada participación durante la feria científica institucional.",
                autor: "Coordinador Luis Gómez",
                descargo: "",
                accionesPedagogicas: "Felicidades del consejo directivo.",
                firmaEstudiante: "Juan Esteban Pérez",
                firmaDocente: "Luis Gómez",
                firmaAcudiente: "Carlos Pérez"
            }
        ];

        let baseSeguimientos = JSON.parse(localStorage.getItem("db_seguimientos")) || {
            "est101": "2026-02-20: Se realiza atención con acudiente por rendimiento general.\n2026-03-06: Estudiante muestra mejoría en actitud de clase.",
            "est102": "Sin novedades de seguimiento al momento."
        };

        let estudianteActualId = "est101";

        document.addEventListener("DOMContentLoaded", () => {
            sincronizarStorage();
            poblarSelectEstudiantes();
            cargarEstudianteAdmin();
        });

        function sincronizarStorage() {
            localStorage.setItem("db_estudiantes", JSON.stringify(baseEstudiantes));
            localStorage.setItem("db_anotaciones", JSON.stringify(baseAnotaciones));
            localStorage.setItem("db_seguimientos", JSON.stringify(baseSeguimientos));
        }

        function poblarSelectEstudiantes() {
            const select = document.getElementById("selectEstudianteAdmin");
            select.innerHTML = "";
            baseEstudiantes.forEach(est => {
                const opt = document.createElement("option");
                opt.value = est.id;
                opt.textContent = `${est.nombre} (${est.grado} - ${est.grupo})`;
                select.appendChild(opt);
            });
        }

        function cargarEstudianteAdmin() {
            estudianteActualId = document.getElementById("selectEstudianteAdmin").value;
            const est = baseEstudiantes.find(e => e.id === estudianteActualId);
            if (!est) return;

            document.getElementById("adminNombreEst").value = est.nombre;
            document.getElementById("adminGradoEst").value = `${est.grado} - Grupo ${est.grupo}`;
            document.getElementById("adminDocEst").value = est.documento;
            document.getElementById("adminAcudienteEst").value = est.acudiente;

            renderizarHistorialResumen();
            cargarSeguimiento();
            cerrarFormularioEdicion();
        }

        function renderizarHistorialResumen() {
            const tbody = document.getElementById("tbodyHistorial");
            const mensajeSinHistorial = document.getElementById("mensajeSinHistorial");
            tbody.innerHTML = "";

            const anotacionesEst = baseAnotaciones.filter(a => a.estudianteId === estudianteActualId);

            if (anotacionesEst.length === 0) {
                mensajeSinHistorial.classList.remove("hidden");
                return;
            }

            mensajeSinHistorial.classList.add("hidden");

            anotacionesEst.forEach(ann => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${ann.motivo}</strong></td>
                    <td>${ann.fecha}</td>
                    <td>${ann.hora || '08:00 AM'}</td>
                    <td>${ann.tipo}</td>
                    <td>${ann.situacionTipo}</td>
                    <td>${ann.autor}</td>
                    <td>
                        <button type="button" class="btn btn-editar" onclick="abrirFormularioEdicion('${ann.id}')">
                            <i class="bi bi-pencil-square"></i> Editar observación
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function abrirFormularioEdicion(idAnotacion) {
            const ann = baseAnotaciones.find(a => a.id === idAnotacion);
            if (!ann) return;

            document.getElementById("editAnotacionId").value = ann.id;
            document.getElementById("editFecha").value = ann.fecha;
            document.getElementById("editTipo").value = ann.tipo;
            document.getElementById("editSituacionTipo").value = ann.situacionTipo;
            document.getElementById("editAutor").value = ann.autor;
            document.getElementById("editMotivo").value = ann.motivo;
            document.getElementById("editDescripcion").value = ann.descripcion;
            document.getElementById("editDescargo").value = ann.descargo || "";
            document.getElementById("editAccionesPedagogicas").value = ann.accionesPedagogicas || "";
            document.getElementById("editFirmaEstudiante").value = ann.firmaEstudiante || "";
            document.getElementById("editFirmaDocente").value = ann.firmaDocente || ann.autor || "";
            document.getElementById("editFirmaAcudiente").value = ann.firmaAcudiente || "";

            const caja = document.getElementById("seccionEdicionObservacion");
            caja.classList.remove("hidden");
            caja.scrollIntoView({ behavior: 'smooth' });
        }

        function cerrarFormularioEdicion() {
            document.getElementById("seccionEdicionObservacion").classList.add("hidden");
        }

        function guardarCambiosObservacion() {
            const id = document.getElementById("editAnotacionId").value;
            const ann = baseAnotaciones.find(a => a.id === id);

            if (ann) {
                ann.fecha = document.getElementById("editFecha").value;
                ann.tipo = document.getElementById("editTipo").value;
                ann.situacionTipo = document.getElementById("editSituacionTipo").value;
                ann.autor = document.getElementById("editAutor").value;
                ann.motivo = document.getElementById("editMotivo").value;
                ann.descripcion = document.getElementById("editDescripcion").value;
                ann.descargo = document.getElementById("editDescargo").value;
                ann.accionesPedagogicas = document.getElementById("editAccionesPedagogicas").value;
                ann.firmaEstudiante = document.getElementById("editFirmaEstudiante").value;
                ann.firmaDocente = document.getElementById("editFirmaDocente").value;
                ann.firmaAcudiente = document.getElementById("editFirmaAcudiente").value;

                sincronizarStorage();
                alert("✅ Observación actualizada correctamente.");
                cerrarFormularioEdicion();
                renderizarHistorialResumen();
            }
        }

        function cargarSeguimiento() {
            const textSeg = document.getElementById("textSeguimientoEstudiante");
            textSeg.value = baseSeguimientos[estudianteActualId] || "Sin observaciones de seguimiento.";
            textSeg.disabled = true;
            document.getElementById("btnEditarSeguimiento").disabled = false;
            document.getElementById("btnGuardarSeguimiento").disabled = true;
        }

        function habilitarEdicionSeguimiento() {
            document.getElementById("textSeguimientoEstudiante").disabled = false;
            document.getElementById("btnEditarSeguimiento").disabled = true;
            document.getElementById("btnGuardarSeguimiento").disabled = false;
        }

        function guardarSeguimiento() {
            baseSeguimientos[estudianteActualId] = document.getElementById("textSeguimientoEstudiante").value;
            sincronizarStorage();
            alert("✅ Registro de seguimiento guardado.");
            cargarSeguimiento();
        }

        function volverAlInicioSeguimiento() {
            cargarSeguimiento();
            alert("Navegación al inicio del seguimiento finalizada.");
        }