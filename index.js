document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const menuNav = document.getElementById('menuNav');
    const menuItems = document.querySelectorAll('.menu-item');
    const toggleSwitch = document.getElementById('toggleSwitch');
    
    // Redirecciones para cada item del menú
    const menuLinks = {
        'pastel': 'cumple.html',
        'musica': 'musica.html',
        'poemas': 'poemas.html',
        'juego': 'juego.html',
        'mensaje': 'mensaje.html'
    };
    
    // Alternar menú móvil
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menuNav.classList.toggle('active');
    });
    
    // Efecto y redirección para los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.getAttribute('data-section');
            if (menuLinks[section]) {
                setTimeout(() => {
                    window.location.href = menuLinks[section];
                }, 300);
            }
        });
    });
    
    // Alternar modo oscuro/claro
    toggleSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Cargar preferencia de modo oscuro
    function loadTheme() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
    }
    
    loadTheme();
    
    // Efecto de partículas dinámicas
    const menuBackground = document.querySelector('.menu-background');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        menuBackground.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    setInterval(createParticle, 1000);
    
    for (let i = 0; i < 5; i++) {
        createParticle();
    }
});