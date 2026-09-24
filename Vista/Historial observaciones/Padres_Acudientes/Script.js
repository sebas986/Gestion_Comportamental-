        /* ----------------------------------------
           ESTADO GLOBAL
           ---------------------------------------- */
        let hijoSeleccionadoId = null;
        let anotacionActualPadre = null;

        /* ----------------------------------------
           INICIALIZACIÓN
           ---------------------------------------- */
        document.addEventListener("DOMContentLoaded", () => {
            poblarHijos();
        });

        /* ----------------------------------------
           POBLADO DE HIJOS (SELECTOR)
           ---------------------------------------- */
        function poblarHijos() {
            const baseEst = JSON.parse(localStorage.getItem("db_estudiantes")) || [];
            const select = document.getElementById("selectHijoPadre");

            select.innerHTML = `<option value="">-- Seleccione un hijo --</option>`;

            baseEst.forEach(hijo => {
                const opt = document.createElement("option");
                opt.value = hijo.id;
                opt.textContent = `${hijo.nombre} (${hijo.grado} - ${hijo.grupo})`;
                select.appendChild(opt);
            });
        }

        /* ----------------------------------------
           CAMBIO DE HIJO → CARGAR SUS FECHAS
           ---------------------------------------- */
        function cambiarHijoPadre() {
            hijoSeleccionadoId = document.getElementById("selectHijoPadre").value;

            const selectFecha = document.getElementById("selectFechaPadre");
            const contenedor = document.getElementById("contenedorPadreAnotacion");

            contenedor.classList.add("hidden");
            selectFecha.innerHTML = `<option value="">-- Seleccione una fecha --</option>`;

            if (!hijoSeleccionadoId) return;

            const baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            const anotacionesHijo = baseAnn.filter(a => a.estudianteId === hijoSeleccionadoId);

            anotacionesHijo.forEach(ann => {
                const opt = document.createElement("option");
                opt.value = ann.id;
                opt.textContent = `${ann.fecha} - ${ann.motivo} (${ann.tipo})`;
                selectFecha.appendChild(opt);
            });
        }

        /* ----------------------------------------
           CARGA DE UNA ANOTACIÓN SELECCIONADA
           ---------------------------------------- */
        function cargarAnotacionPadre() {
            const annId = document.getElementById("selectFechaPadre").value;
            const contenedor = document.getElementById("contenedorPadreAnotacion");

            if (!annId) {
                contenedor.classList.add("hidden");
                return;
            }

            const baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            anotacionActualPadre = baseAnn.find(a => a.id === annId);

            if (!anotacionActualPadre) return;

            contenedor.classList.remove("hidden");

            document.getElementById("padreMotivo").innerText = anotacionActualPadre.motivo;
            document.getElementById("padreFecha").value = anotacionActualPadre.fecha;
            document.getElementById("padreHora").value = anotacionActualPadre.hora || "08:00 AM";
            document.getElementById("padreTipo").value = anotacionActualPadre.tipo;
            document.getElementById("padreSituacion").value = anotacionActualPadre.situacionTipo;
            document.getElementById("padreAutor").value = anotacionActualPadre.autor;
            document.getElementById("padreDescripcion").value = anotacionActualPadre.descripcion;
            document.getElementById("padreDescargoEstudiante").value =
                anotacionActualPadre.descargo || "Sin descargos registrados.";
            document.getElementById("padreAcciones").value =
                anotacionActualPadre.accionesPedagogicas || "Sin observaciones adicionales.";
            document.getElementById("inputFirmaAcudiente").value =
                anotacionActualPadre.firmaAcudiente || "";
        }

        /* ----------------------------------------
           CONFIRMACIÓN DE FIRMA DEL ACUDIENTE
           ---------------------------------------- */
        function confirmarFirmaAcudiente() {
            if (!anotacionActualPadre) return;

            const firma = document.getElementById("inputFirmaAcudiente").value.trim();
            if (!firma) {
                alert("Ingrese su nombre para confirmar.");
                return;
            }

            let baseAnn = JSON.parse(localStorage.getItem("db_anotaciones")) || [];
            let ann = baseAnn.find(a => a.id === anotacionActualPadre.id);

            if (ann) {
                ann.firmaAcudiente = firma;
                localStorage.setItem("db_anotaciones", JSON.stringify(baseAnn));
                alert("✅ Confirmación de lectura guardada con éxito.");
            }
        }