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

});