document.addEventListener('DOMContentLoaded', () => {
    // Configurar alturas para las animaciones del pastel
    const layerBottom = document.querySelector('.layer-bottom');
    const layerMiddle = document.querySelector('.layer-middle');
    const layerTop = document.querySelector('.layer-top');

    layerBottom.style.setProperty('--final-height', '80px');
    layerMiddle.style.setProperty('--final-height', '60px');
    layerTop.style.setProperty('--final-height', '40px');
    
    // Elementos de audio y botones
    const backgroundMusic = document.getElementById('background-music');
    
    // Crear botón de música
    const musicButton = document.createElement('button');
    musicButton.id = 'musicButton';
    musicButton.innerHTML = '<i class="fas fa-music"></i> Música';
    musicButton.classList.add('music-btn');
    document.body.appendChild(musicButton);
    
    // Controlar la música con el botón
    musicButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicButton.innerHTML = '<i class="fas fa-pause"></i> Pausar';
                })
                .catch(error => {
                    console.log('Error al reproducir:', error);
                });
        } else {
            backgroundMusic.pause();
            musicButton.innerHTML = '<i class="fas fa-music"></i> Música';
        }
    });
    
    // Intentar reproducir automáticamente al cargar la página
    const tryAutoPlay = () => {
        backgroundMusic.play()
            .then(() => {
                musicButton.innerHTML = '<i class="fas fa-pause"></i> Pausar';
                // Eliminar los event listeners si se reprodujo correctamente
                document.removeEventListener('click', tryAutoPlay);
                document.removeEventListener('touchstart', tryAutoPlay);
            })
            .catch(error => {
                console.log('La reproducción automática fue prevenida. El usuario debe interactuar primero.');
                // Si falla, esperar interacción del usuario
                document.addEventListener('click', tryAutoPlay);
                document.addEventListener('touchstart', tryAutoPlay);
            });
    };
    
    // Esperar a que el audio esté listo
    backgroundMusic.addEventListener('canplay', () => {
        // Esperar un poco antes de intentar reproducir
        setTimeout(tryAutoPlay, 500);
    });
    
    // Funcionalidad del botón regresar
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Efecto de confeti al finalizar las animaciones
    setTimeout(createConfetti, 4000);
});

// Función para crear efecto de confeti
function createConfetti() {
    const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '0';
        container.appendChild(confetti);

        // Animación de caída del confeti
        const animation = confetti.animate(
            [
                { transform: `translateY(0) rotate(0deg)`, opacity: 0.8 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, opacity: 0 }
            ],
            {
                duration: 3000 + Math.random() * 3000,
                delay: Math.random() * 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
            }
        );

        // Eliminar el confeti después de la animación
        animation.onfinish = () => confetti.remove();
    }
}