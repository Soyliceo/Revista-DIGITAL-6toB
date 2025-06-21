  document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoYumka'); // Asegúrate de que tu video tiene este ID

    if (video) { // Esto verifica que el elemento de video exista en la página
      const options = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px',
        threshold: 0.5 // El video se considera visible cuando al menos el 50% de él está en el viewport
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // El video ha entrado en el viewport
            video.play();
          } else {
            // El video ha salido del viewport
            video.pause();
            // Opcional: Si quieres que el video se reinicie cada vez que entra, descomenta la siguiente línea:
            // video.currentTime = 0;
          }
        });
      }, options);

      observer.observe(video); // Empieza a observar el elemento de video
    }
  });

