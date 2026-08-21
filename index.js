document.addEventListener("DOMContentLoaded", () => {
    const preguntas = document.querySelectorAll(".bloque6Item__pregunta");

    // Novedad: Inicializar la pregunta que ya viene con la clase "open" en tu HTML
    const abiertaPorDefecto = document.querySelector(".bloque6Item__respuesta.open");
    if(abiertaPorDefecto) {
        abiertaPorDefecto.style.maxHeight = abiertaPorDefecto.scrollHeight + "px";
        abiertaPorDefecto.style.opacity = 1;
    }

    preguntas.forEach((pregunta) => {
        pregunta.addEventListener("click", () => {
            const itemActual = pregunta.closest(".bloque6__item");
            const respuestaActual = itemActual.querySelector(".bloque6Item__respuesta");
            const spanActual = pregunta.querySelector("span");

            const estaAbierto = respuestaActual.classList.contains("open");

            // 1. Cerramos TODAS las respuestas con animación
            document.querySelectorAll(".bloque6Item__respuesta").forEach((respuesta) => {
                respuesta.classList.remove("open");
                respuesta.classList.add("close");
                
                // Quitamos el max-height para que regrese a 0 (por el CSS)
                respuesta.style.maxHeight = null; 
                respuesta.style.opacity = 0;
            });
            
            document.querySelectorAll(".bloque6Item__pregunta span").forEach((span) => {
                span.textContent = "+";
                span.style.transform = "rotate(0deg)"; // Reinicia el giro
            });

            // 2. Si la que clickeamos estaba cerrada, la abrimos con animación
            if (!estaAbierto) {
                respuestaActual.classList.remove("close");
                respuestaActual.classList.add("open");
                
                // scrollHeight calcula la altura exacta necesaria según el texto que contenga
                respuestaActual.style.maxHeight = respuestaActual.scrollHeight + "px"; 
                respuestaActual.style.opacity = 1;
                
                spanActual.textContent = "-";
                spanActual.style.transform = "rotate(180deg)"; // Efecto visual de voltereta
            }
        });
    });


    const track = document.querySelector('.carousel__track');
    const slides = document.querySelectorAll('.bloque5__item');
    const dots = document.querySelectorAll('.pagination .dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentIndex = 0;

    const updateCarousel = (index) => {
        // Desplazamos el riel. Cada item representa un 100% de la vista actual
        track.style.transform = `translateX(-${index * 100}%)`;

        // Actualizamos visualmente los puntitos de paginación
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    });

    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    const cards = document.querySelectorAll('.bloque8Item');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Alterna la clase de giro en la tarjeta clicada
            card.classList.toggle('is-flipped');
            
            // Opcional: Si quieres que al girar una, las demás se cierren automáticamente
            cards.forEach(otherCard => {
                if(otherCard !== card) {
                    otherCard.classList.remove('is-flipped');
                }
            });
        });
    });

    const cards2 = document.querySelectorAll('.bloque9Item');
    
    cards2.forEach(card => {
        card.addEventListener('click', () => {
            // Alterna la clase de giro en la tarjeta clicada
            card.classList.toggle('is-flipped');
            
            // Opcional: Si quieres que al girar una, las demás se cierren automáticamente
            cards2.forEach(otherCard => {
                if(otherCard !== card) {
                    otherCard.classList.remove('is-flipped');
                }
            });
        });
    });

    const selectTipo = document.getElementById("soy");
    const contenedorDinamico = document.getElementById("contenedor-dinamico");
    
    // Contenedores principales
    const seccionEstudiante = document.getElementById("seccion-estudiante");
    const seccionTutor = document.getElementById("seccion-tutor");
    
    // Contenedores de los inputs (los que se ocultan/muestran)
    const camposEstudiante = document.getElementById("campos-estudiante");
    const camposTutor = document.getElementById("campos-tutor");
    
    // Títulos e Iconos
    const headerEstudiante = document.getElementById("header-estudiante");
    const headerTutor = document.getElementById("header-tutor");
    const tituloTutor = document.getElementById("titulo-tutor");
    const toggleEstudiante = document.getElementById("toggle-estudiante");
    const toggleTutor = document.getElementById("toggle-tutor");

    // Inputs a validar
    const inputsEstudiante = camposEstudiante.querySelectorAll('input:not([type="hidden"]), select');
    const inputsTutor = camposTutor.querySelectorAll('input:not([type="hidden"]), select');

    // Función auxiliar para agregar/quitar 'required'
    function setRequired(inputs, isRequired) {
        inputs.forEach(campo => {
            if (isRequired) campo.setAttribute("required", "true");
            else campo.removeAttribute("required");
        });
    }

    // 1. Lógica principal al seleccionar el tipo de usuario
    selectTipo.addEventListener("change", function() {
        contenedorDinamico.style.display = "flex";
        const tipo = this.value;

        if (tipo === "Postulante") {
            // Estudiante: Arriba, Desplegado, Requerido, Sin Icono "+"
            seccionEstudiante.style.order = "1";
            camposEstudiante.style.display = "block";
            toggleEstudiante.style.display = "none";
            setRequired(inputsEstudiante, true);
            
            // Tutor: Abajo, Colapsado, NO Requerido, Con Icono "+", Cambio de Título
            seccionTutor.style.order = "2";
            camposTutor.style.display = "none";
            toggleTutor.style.display = "block";
            toggleTutor.textContent = "+";
            tituloTutor.textContent = "¿Desea agregar acompañante?";
            setRequired(inputsTutor, false);

        } else if (tipo === "Tutor, padre o madre de familia") {
            // Tutor: Arriba, Desplegado, Requerido, Sin Icono "+", Título Original
            seccionTutor.style.order = "1";
            camposTutor.style.display = "block";
            toggleTutor.style.display = "none";
            tituloTutor.textContent = "Datos del Padre o Apoderado";
            setRequired(inputsTutor, true);
            
            // Estudiante: Abajo, DESPLEGADO, REQUERIDO, SIN Icono "+"
            seccionEstudiante.style.order = "2";
            camposEstudiante.style.display = "block"; // <-- Ahora está visible por defecto
            toggleEstudiante.style.display = "none";  // <-- Ocultamos el "+"
            setRequired(inputsEstudiante, true);      // <-- Datos del alumno son obligatorios
        }
    });

    // 2. Lógica del Acordeón (Click en el título)
    function toggleSection(camposDiv, toggleIcon) {
        // Solo permitir expandir/colapsar si la sección es opcional (el icono "+" o "-" es visible)
        if (toggleIcon.style.display !== "none") {
            if (camposDiv.style.display === "none") {
                camposDiv.style.display = "block";
                toggleIcon.textContent = "-";
            } else {
                camposDiv.style.display = "none";
                toggleIcon.textContent = "+";
            }
        }
    }

    headerEstudiante.addEventListener("click", () => toggleSection(camposEstudiante, toggleEstudiante));
    headerTutor.addEventListener("click", () => toggleSection(camposTutor, toggleTutor));

});