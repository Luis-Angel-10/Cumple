document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los items del collage
    const collageItems = document.querySelectorAll('.collage-item');
    
    // Añadir evento click a cada item
    collageItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obtener el enlace del atributo data-link
            const link = this.getAttribute('data-link');
            
            // Verificar si hay un enlace válido
            if (link && link !== '#') {
                // Efecto visual antes de redirigir
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
                
                // Redirigir después de un pequeño retraso para el efecto
                setTimeout(() => {
                    window.location.href = link;
                }, 200);
            } else {
                console.warn('No se ha definido un enlace para este elemento');
            }
        });
        
        // Efecto hover con teclado (para accesibilidad)
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
        
        // Hacer los items enfocables para accesibilidad
        item.setAttribute('tabindex', '0');
    });
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Opcional: Carga diferida de imágenes para mejor rendimiento
if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                if (lazyImage.dataset.src) {
                    lazyImage.src = lazyImage.dataset.src;
                }
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('.collage-item img[data-src]');
    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
}