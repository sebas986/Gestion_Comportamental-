      // ============================================================
        //  BASE DE DATOS DE EJEMPLO: ESTUDIANTES POR GRADO Y GRUPO
        //  Grados: 1° a 11°  |  Grupos: 1 a 5
        //  Clave interna: "grado-grupo" (ej: "1-1", "1-2", ..., "11-5")
        // ============================================================
        const estudiantesPorGrupo = {
            // Grado 1°
            "1-1": ["Ana Gómez", "Carlos Ruiz", "Luisa Fernández"],
            "1-2": ["Jorge Pérez", "María Castro", "Luis Sánchez"],
            "1-3": ["Pedro Martínez", "Sofía López", "Diego Ramírez"],
            "1-4": ["Carmen Jiménez", "Antonio Romero", "Laura Torres"],
            "1-5": ["Javier Navarro", "Natalia Cordero", "Daniel Peña"],
            // Grado 2°
            "2-1": ["Diego Morales", "Paula Castillo", "Andrés Vega"],
            "2-2": ["Javier Navarro", "Natalia Cordero", "Daniel Peña"],
            "2-3": ["Adriana Montes", "Cristian Moya", "Gabriela Pinto"],
            "2-4": ["Hugo Estrada", "Clara Beltrán", "Iván Salazar"],
            "2-5": ["Mónica Carvajal", "Óscar Parra", "Camila Zuleta"],
            // Grado 3°
            "3-1": ["Luis Ortega", "Marisol Franco", "Fabián Quintero"],
            "3-2": ["Paola Arango", "Esteban Cuellar", "Daniela Uribe"],
            "3-3": ["Manuel Rincón", "Tatiana Herrera", "Sebastián Bernal"],
            "3-4": ["Verónica Álvarez", "Rafael Jaramillo", "Carolina León"],
            "3-5": ["Andrés Villa", "Angélica Muñoz", "Jorge Mejía"],
            // Grado 4°
            "4-1": ["Martha Rubio", "Diana Rueda", "Camilo Saldarriaga"],
            "4-2": ["Carlos Montoya", "Lina Uribe", "Mauricio Castro"],
            "4-3": ["Paula Duque", "Alejandro Lopera", "Juliana Rojas"],
            "4-4": ["Daniel Serna", "Sandra Marín", "David Velásquez"],
            "4-5": ["Laura Flórez", "Fernando Londoño", "Katherine Vélez"],
            // Grado 5°
            "5-1": ["Julián Lozano", "Daniela Osorio", "Mateo Correa"],
            "5-2": ["Valentina Caro", "Santiago Echeverri", "María Fernanda Orozco"],
            "5-3": ["Juan José Bedoya", "Isabel Cárdenas", "Andrés Felipe Arbeláez"],
            "5-4": ["Natalia Giraldo", "Tomás Restrepo", "Carolina Suárez"],
            "5-5": ["Sebastián Henao", "Manuela Montoya", "Cristian Duarte"],
            // Grado 6°
            "6-1": ["Laura Pineda", "David Arredondo", "Valeria Marín"],
            "6-2": ["Jhon Jairo Ramírez", "Diana Marcela López", "Juan Manuel Gallego"],
            "6-3": ["Ana Sofía Jaramillo", "Luis Fernando Quintero", "María Paz Martínez"],
            "6-4": ["Andrés Elías Naranjo", "Camila Andrea Ortiz", "Felipe José Rendón"],
            "6-5": ["Sofía Alejandra Castro", "Nicolás Valencia", "Gabriela Suárez"],
            // Grado 7°
            "7-1": ["Mateo Jaramillo", "María Paula Ríos", "Juan Pablo Lopera"],
            "7-2": ["Sergio López", "Andrea García", "Jonathan Piedrahita"],
            "7-3": ["Laura Cristina Serna", "Ana María Ospina", "Eliana Pérez"],
            "7-4": ["Javier Cuellar", "Sara Zuluaga", "Kevin Arango"],
            "7-5": ["Daniela Echavarría", "Mauricio Botero", "Luisa Fernanda Ríos"],
            // Grado 8°
            "8-1": ["Alejandro Correa", "Sofía Restrepo", "Mateo Giraldo"],
            "8-2": ["Andrés Gutiérrez", "Laura Sáenz", "Carlos Andrés Vargas"],
            "8-3": ["Valentina Zapata", "Esteban Londoño", "María José Arango"],
            "8-4": ["Juan Felipe Rojas", "Natalia Monsalve", "Santiago Osorio"],
            "8-5": ["Camila Lopera", "Andrés Felipe Vargas", "Luisa María Pérez"],
            // Grado 9°
            "9-1": ["Juan David Torres", "María Camila Ríos", "Daniel Alejandro Jiménez"],
            "9-2": ["Laura Valentina Sánchez", "Carlos Eduardo López", "Ana Sofía Martínez"],
            "9-3": ["Jorge Enrique Pérez", "Luisa Fernanda Gómez", "Cristian David García"],
            "9-4": ["Sofía Alejandra Rojas", "Mateo Antonio Ramírez", "Valentina Estefanía Castro"],
            "9-5": ["Nicolás Felipe Ospina", "Gabriela Andrea Suárez", "Juan Pablo Lopera"],
            // Grado 10°
            "10-1": ["Eliana Marcela Pérez", "Javier Eduardo Cuellar", "Sara Lucía Zuluaga"],
            "10-2": ["Kevin Andrés Arango", "Daniela Alejandra Echavarría", "Mauricio Alberto Botero"],
            "10-3": ["Luisa Fernanda Ríos", "Alejandro José Correa", "Sofía María Restrepo"],
            "10-4": ["Mateo Alberto Giraldo", "Andrés Felipe Gutiérrez", "Laura Marcela Sáenz"],
            "10-5": ["Carlos Andrés Vargas", "Valentina María Zapata", "Esteban José Londoño"],
            // Grado 11°
            "11-1": ["María José Arango", "Juan Felipe Rojas", "Natalia Carolina Monsalve"],
            "11-2": ["Santiago Osorio", "Camila Andrea Lopera", "Andrés Elías Naranjo"],
            "11-3": ["Laura Cristina Serna", "Ana María Ospina", "Julián David Lozano"],
            "11-4": ["Daniela Osorio", "Mateo Correa", "Valentina Caro"],
            "11-5": ["Santiago Echeverri", "María Fernanda Orozco", "Juan José Bedoya"]
        };

        // ============================================================
        //  FUNCIONES
        // ============================================================

        function cargarSelectGrado() {
            const select = document.getElementById('selectGrado');
            select.innerHTML = '<option value="">Seleccione un grado</option>';
            for (let i = 1; i <= 11; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i}°`;
                select.appendChild(option);
            }
        }

        function cargarSelectGrupo(grado) {
            const select = document.getElementById('selectGrupo');
            select.innerHTML = '';
            select.disabled = true;

            if (!grado) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Primero seleccione un grado';
                select.appendChild(option);
                return;
            }

            // Verificar qué grupos tienen datos para este grado
            let gruposDisponibles = [];
            for (let g = 1; g <= 5; g++) {
                const key = `${grado}-${g}`;
                if (estudiantesPorGrupo[key] && estudiantesPorGrupo[key].length > 0) {
                    gruposDisponibles.push(g);
                }
            }

            if (gruposDisponibles.length === 0) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay grupos disponibles';
                select.appendChild(option);
                return;
            }

            select.disabled = false;
            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un grupo';
            select.appendChild(defaultOption);

            gruposDisponibles.forEach(g => {
                const option = document.createElement('option');
                option.value = g;
                option.textContent = `Grupo ${g}`;
                select.appendChild(option);
            });
        }

        function mostrarEstudiantes(grado, grupo) {
            const tbody = document.getElementById('tablaEstudiantes');
            const contador = document.getElementById('contadorEstudiantes');

            if (!grado || !grupo) {
                tbody.innerHTML = `<tr><td colspan="3" class="empty-row">Seleccione un grado y grupo para ver los estudiantes</td></tr>`;
                contador.innerHTML = `<i class="bi bi-info-circle"></i> Mostrando 0 estudiantes`;
                return;
            }

            const key = `${grado}-${grupo}`;
            const estudiantes = estudiantesPorGrupo[key] || [];

            if (estudiantes.length === 0) {
                tbody.innerHTML = `<tr><td colspan="3" class="empty-row">No hay estudiantes en este grupo</td></tr>`;
                contador.innerHTML = `<i class="bi bi-info-circle"></i> Mostrando 0 estudiantes`;
                return;
            }

            let html = '';
            estudiantes.forEach((nombre, index) => {
                const nombreEncoded = encodeURIComponent(nombre);
                html += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${nombre}</td>
                        <td class="text-center">
                            <div class="accion-links">
                                <a href="observacion.html?estudiante=${nombreEncoded}&grado=${grado}&grupo=${grupo}" class="link-observacion">
                                    <i class="bi bi-pencil-square"></i> Observación
                                </a>
                                <a href="anotaciones.html?estudiante=${nombreEncoded}" class="link-anotaciones">
                                    <i class="bi bi-journal-text"></i> Ver anotaciones
                                </a>
                            </div>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
            contador.innerHTML = `<i class="bi bi-people"></i> Mostrando ${estudiantes.length} estudiantes del grado ${grado}° - Grupo ${grupo}`;
        }

        // ============================================================
        //  EVENTOS
        // ============================================================
        document.addEventListener('DOMContentLoaded', function() {
            cargarSelectGrado();

            const selectGrado = document.getElementById('selectGrado');
            const selectGrupo = document.getElementById('selectGrupo');

            selectGrado.addEventListener('change', function() {
                const grado = this.value;
                cargarSelectGrupo(grado);
                // Limpiar tabla y contador
                document.getElementById('tablaEstudiantes').innerHTML =
                    `<tr><td colspan="3" class="empty-row">Seleccione un grupo para ver los estudiantes</td></tr>`;
                document.getElementById('contadorEstudiantes').innerHTML =
                    `<i class="bi bi-info-circle"></i> Mostrando 0 estudiantes`;
                // Resetear selección de grupo
                if (grado) {
                    // Si hay grupos, se carga el primero automáticamente para mejor UX
                    const grupos = [];
                    for (let g = 1; g <= 5; g++) {
                        const key = `${grado}-${g}`;
                        if (estudiantesPorGrupo[key] && estudiantesPorGrupo[key].length > 0) {
                            grupos.push(g);
                        }
                    }
                    if (grupos.length > 0) {
                        // Seleccionar el primer grupo automáticamente
                        selectGrupo.value = grupos[0];
                        // Disparar evento change para mostrar estudiantes
                        const event = new Event('change');
                        selectGrupo.dispatchEvent(event);
                    }
                }
            });

            selectGrupo.addEventListener('change', function() {
                const grado = selectGrado.value;
                const grupo = this.value;
                if (grado && grupo) {
                    mostrarEstudiantes(grado, grupo);
                } else {
                    document.getElementById('tablaEstudiantes').innerHTML =
                        `<tr><td colspan="3" class="empty-row">Seleccione un grupo para ver los estudiantes</td></tr>`;
                    document.getElementById('contadorEstudiantes').innerHTML =
                        `<i class="bi bi-info-circle"></i> Mostrando 0 estudiantes`;
                }
            });

            // Seleccionar primer grado por defecto (1°) para mejor UX
            selectGrado.value = "1";
            // Forzar cambio para cargar grupos del grado 1
            const event = new Event('change');
            selectGrado.dispatchEvent(event);
        });