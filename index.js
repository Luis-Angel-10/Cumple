document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const menuNav = document.getElementById('menuNav');
    const menuItems = document.querySelectorAll('.menu-item');
    const toggleSwitch = document.querySelector('.toggle-switch');
    const toggleCircle = document.querySelector('.toggle-circle');
    const body = document.body;
    
    // Redirecciones para cada item del menú
    const menuLinks = {
        'pastel': 'cumple.html',
        'musica': 'musica.html',
        'poemas': 'poemas.html',
        'juego': 'juego.html'
    };
    
    // Alternar menú móvil
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menuNav.classList.toggle('active');
    });
    
    // Efecto y redirección para los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase active de todos los items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Obtener la sección del atributo data-section
            const section = this.getAttribute('data-section');
            
            // Redirigir a la página correspondiente
            if (menuLinks[section]) {
                setTimeout(() => {
                    window.location.href = menuLinks[section];
                }, 300); // Pequeño retraso para el efecto visual
            }
        });
    });
    
    // Alternar modo oscuro/claro
    toggleSwitch.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        toggleCircle.style.transform = 'translateX(25px)';
    }
    
    // Efecto de partículas dinámicas
    const menuBackground = document.querySelector('.menu-background');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio entre 2px y 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        menuBackground.appendChild(particle);
        
        // Eliminar partícula después de que termine la animación
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Crear partículas periódicamente
    setInterval(createParticle, 1000);
    
    // Crear algunas partículas iniciales
    for (let i = 0; i < 5; i++) {
        createParticle();
    }
});