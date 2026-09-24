
        const miEstudianteId = "est101"; // Estudiante en sesión
        let anotacionActual = null;

        document.addEventListener("DOMContentLoaded", () => {
            const baseEst = JSON.parse(localStorage.getItem("db_estudiantes")) || [];
            const est = baseEst.find(e => e.id === miEstudianteId);
            if (est) {
                document.getElementById("estNombre").value = est.nombre;
                document.getElementById("estGrado").value = `${est.grado} - ${est.grupo}`;
            }
            poblarFechas();
        });

        function poblarFechas() {
            const baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            const misAnotaciones = baseAnn.filter(a => a.estudianteId === miEstudianteId);
            const select = document.getElementById("selectFechaEstudiante");
            select.innerHTML = `<option value="">-- Seleccione una fecha --</option>`;

            misAnotaciones.forEach(ann => {
                const opt = document.createElement("option");
                opt.value = ann.id;
                opt.textContent = `${ann.fecha} - ${ann.motivo} (${ann.tipo})`;
                select.appendChild(opt);
            });
        }

        function cargarDetalleAnotacionEstudiante() {
            const idAnn = document.getElementById("selectFechaEstudiante").value;
            const contenedor = document.getElementById("contenedorDetalleAnotacion");

            if (!idAnn) {
                contenedor.classList.add("hidden");
                return;
            }

            const baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            anotacionActual = baseAnn.find(a => a.id === idAnn);

            if (anotacionActual) {
                contenedor.classList.remove("hidden");
                document.getElementById("viewMotivo").innerText = anotacionActual.motivo;
                document.getElementById("viewFecha").value = anotacionActual.fecha;
                document.getElementById("viewHora").value = anotacionActual.hora || "08:00 AM";
                document.getElementById("viewTipo").value = anotacionActual.tipo;
                document.getElementById("viewSituacion").value = anotacionActual.situacionTipo;
                document.getElementById("viewAutor").value = anotacionActual.autor;
                document.getElementById("viewDescripcion").value = anotacionActual.descripcion;

                document.getElementById("inputDescargoEstudiante").value = anotacionActual.descargo || "";
                document.getElementById("inputFirmaEstudiante").value = anotacionActual.firmaEstudiante || "";
            }
        }

        function guardarDescargoEstudiante() {
            if (!anotacionActual) return;
            const desc = document.getElementById("inputDescargoEstudiante").value.trim();
            if (!desc) { alert("Escriba un texto para sus descargos."); return; }

            let baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            let ann = baseAnn.find(a => a.id === anotacionActual.id);
            if (ann) {
                ann.descargo = desc;
                localStorage.setItem("db_anotaciones", JSON.stringify(baseAnn));
                alert("✅ Descargos registrados correctamente.");
            }
        }

        function confirmarFirmaEstudiante() {
            if (!anotacionActual) return;
            const firma = document.getElementById("inputFirmaEstudiante").value.trim();
            if (!firma) { alert("Escriba su nombre para firmar."); return; }

            let baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            let ann = baseAnn.find(a => a.id === anotacionActual.id);
            if (ann) {
                ann.firmaEstudiante = firma;
                localStorage.setItem("db_anotaciones", JSON.stringify(baseAnn));
                alert("✅ Firma registrada correctamente.");
            }
        }