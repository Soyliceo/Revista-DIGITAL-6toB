
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del DOM que vamos a manipular
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    // Variables de estado del carrusel
    let currentIndex = 0; // Índice de la imagen que se muestra actualmente
    let autoSlideInterval; // Variable para guardar el ID del temporizador de cambio automático
    const slideDuration = 5000; // Duración en milisegundos (5000ms = 5 segundos)

    // Calcular el ancho de una diapositiva (incluyendo sus márgenes)
    // Esto es crucial para calcular el desplazamiento necesario
    // getComputedStyle().marginRight obtiene el margen derecho CSS aplicado
    const slideWidth = slides[0].offsetWidth + (parseFloat(getComputedStyle(slides[0]).marginRight) * 2);

    // Obtener el ancho del contenedor visible del carrusel
    const carouselContainerWidth = document.querySelector('.carousel-container').offsetWidth;

    // Calcular el desplazamiento necesario para centrar la imagen activa
    // (Ancho del contenedor / 2) - (Ancho de la diapositiva principal / 2)
    const centerOffset = (carouselContainerWidth / 2) - (slides[0].offsetWidth / 2);

    // Función principal para actualizar la visualización del carrusel
    function updateCarousel() {
        // Primero, removemos la clase 'active' de todas las diapositivas
        slides.forEach(slide => slide.classList.remove('active'));

        // Luego, añadimos la clase 'active' solo a la diapositiva actual
        slides[currentIndex].classList.add('active');

        // Calcular la cantidad de píxeles que debemos desplazar el 'carousel-track'
        // Esto centrará la 'currentIndex' diapositiva en el contenedor visible
        const offset = (currentIndex * slideWidth) - centerOffset;

        // Aplicar el desplazamiento utilizando CSS transform (translateX)
        carouselTrack.style.transform = `translateX(${-offset}px)`;

        // Asegurarse de que el 'carousel-track' tenga un ancho total
        // que contenga todas las diapositivas para que el desplazamiento funcione correctamente
        carouselTrack.style.width = `${slides.length * slideWidth}px`;
    }

    // Función para avanzar a la siguiente diapositiva
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Avanza el índice, y si llega al final, vuelve al principio
        updateCarousel(); // Actualiza la visualización
    }

    // Función para ir a la diapositiva anterior
    function goToPrevSlide() {
        // Retrocede el índice, y si llega al principio, va al final
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(); // Actualiza la visualización
    }

    // Manejar los clics en los botones de navegación
    nextButton.addEventListener('click', () => {
        goToNextSlide(); // Mueve a la siguiente imagen
        resetAutoSlide(); // Reinicia el temporizador de cambio automático
    });

    prevButton.addEventListener('click', () => {
        goToPrevSlide(); // Mueve a la imagen anterior
        resetAutoSlide(); // Reinicia el temporizador de cambio automático
    });

    // Función para iniciar el cambio automático de diapositivas
    function startAutoSlide() {
        // Establece un intervalo que llamará a goToNextSlide cada 'slideDuration' milisegundos
        autoSlideInterval = setInterval(goToNextSlide, slideDuration);
    }

    // Función para reiniciar el temporizador de cambio automático
    // Útil cuando el usuario navega manualmente, para que el temporizador no cambie la imagen inmediatamente después
    function resetAutoSlide() {
        clearInterval(autoSlideInterval); // Limpia cualquier temporizador existente
        startAutoSlide(); // Inicia un nuevo temporizador
    }

    // Inicializar el carrusel cuando el DOM esté completamente cargado
    // Esto asegura que todos los elementos HTML estén disponibles antes de que el script intente acceder a ellos
    updateCarousel(); // Posiciona el carrusel en la primera imagen al cargar
    startAutoSlide(); // Inicia el cambio automático de imágenes
});