// Asegurar que las capas del pastel tengan su altura final después de la animación
document.addEventListener('DOMContentLoaded', () => {
    const layerBottom = document.querySelector('.layer-bottom');
    const layerMiddle = document.querySelector('.layer-middle');
    const layerTop = document.querySelector('.layer-top');

    // Establecer las alturas finales para la animación
    layerBottom.style.setProperty('--final-height', '80px');
    layerMiddle.style.setProperty('--final-height', '60px');
    layerTop.style.setProperty('--final-height', '40px');
});

// Efecto de confeti al finalizar las animaciones
setTimeout(() => {
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
}, 4000); // Inicia después de que todas las animaciones del pastel terminen