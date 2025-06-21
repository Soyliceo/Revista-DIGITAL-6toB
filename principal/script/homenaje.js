document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las imágenes que tienen la clase 'slide-in-image'
    const slideInImages = document.querySelectorAll('.slide-in-image');

    // Función que se ejecuta cuando un elemento cruza el umbral de visibilidad
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'visible'
                entry.target.classList.add('visible');
                // Deja de observar una vez que la animación se ha disparado
                // Si quieres que la animación se repita cada vez que entre/salga, elimina la siguiente línea.
                observer.unobserve(entry.target);
            }
        });
    };

    // Opciones para el Intersection Observer
    const options = {
        root: null, // Observa con respecto al viewport del documento
        rootMargin: '0px', // Sin margen extra
        threshold: 0.1 // Activa cuando el 10% del elemento es visible
    };

    // Crea una nueva instancia del Intersection Observer
    const observer = new IntersectionObserver(callback, options);

    // Empieza a observar cada imagen encontrada
    slideInImages.forEach(image => {
        observer.observe(image);
    });
});