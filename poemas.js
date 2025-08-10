document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de poemas
    const poemas = [
        {
            versos: [
                "El viento susurra secretos",
                "a las hojas que bailan en el atardecer,",
                "mientras el río lleva consigo",
                "los sueños que no pudimos ver."
            ],
            autor: "- Clara Luz"
        },
        {
            versos: [
                "Entre las sombras de la noche,",
                "brilla una luz fugaz,",
                "como un recuerdo que persiste",
                "y nunca se va."
            ],
            autor: "- Samuel Ríos"
        },
        {
            versos: [
                "Las olas besan la arena",
                "con ritmo eterno y pasional,",
                "como el amor que se desvanece",
                "y vuelve a ser celestial."
            ],
            autor: "- Marina Costa"
        },
        {
            versos: [
                "En el jardín del tiempo,",
                "las flores de ayer se marchitan,",
                "pero las semillas del mañana",
                "aún están por germinar."
            ],
            autor: "- Jorge Temporal"
        },
        {
            versos: [
                "La luna es un espejo",
                "que refleja nuestros silencios,",
                "y las estrellas son palabras",
                "que nunca dijimos."
            ],
            autor: "- Estrella Nocturna"
        },
        {
            versos: [
                "Caminante, no hay camino,",
                "se hace camino al andar.",
                "Al andar se hace el camino,",
                "y al volver la vista atrás,",
                "se ve la senda que nunca",
                "se ha de volver a pisar."
            ],
            autor: "- Antonio Machado"
        },
        {
            versos: [
                "Todo pasa y todo queda,",
                "pero lo nuestro es pasar,",
                "pasar haciendo caminos,",
                "caminos sobre la mar."
            ],
            autor: "- Antonio Machado"
        }
    ];

    // Elementos del DOM
    const poemDisplay = document.getElementById('poemDisplay');
    const generateBtn = document.getElementById('generateBtn');
    const poemAuthor = document.getElementById('poemAuthor');
    const poetryCard = document.querySelector('.poetry-card');

    // Generar un poema aleatorio
    function generarPoema() {
        // Animación de salida
        const lines = poemDisplay.querySelectorAll('.poem-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.remove('fade-in');
                line.style.opacity = '0';
                line.style.transform = 'translateY(-20px)';
            }, index * 100);
        });

        // Limpiar autor
        poemAuthor.classList.remove('show');

        // Seleccionar un poema aleatorio
        setTimeout(() => {
            const poemaAleatorio = poemas[Math.floor(Math.random() * poemas.length)];
            
            // Limpiar el contenedor
            poemDisplay.innerHTML = '';
            
            // Agregar nuevos versos con animación
            poemaAleatorio.versos.forEach((verso, index) => {
                setTimeout(() => {
                    const lineElement = document.createElement('p');
                    lineElement.className = 'poem-line';
                    lineElement.textContent = verso;
                    poemDisplay.appendChild(lineElement);
                    
                    // Forzar reflow para activar la animación
                    void lineElement.offsetWidth;
                    
                    lineElement.classList.add('fade-in');
                }, index * 200);
            });

            // Mostrar autor
            setTimeout(() => {
                poemAuthor.textContent = poemaAleatorio.autor;
                poemAuthor.classList.add('show');
            }, poemaAleatorio.versos.length * 200 + 200);

            // Animación de la tarjeta
            poetryCard.style.transform = 'rotateX(5deg) rotateY(5deg)';
            setTimeout(() => {
                poetryCard.style.transform = 'rotateX(0) rotateY(0)';
            }, 500);
        }, lines.length * 100 + 200);
    }

    // Evento del botón
    generateBtn.addEventListener('click', generarPoema);

    // Efecto de tilt con el mouse
    poetryCard.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        poetryCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Resetear la posición cuando el mouse sale
    poetryCard.addEventListener('mouseleave', () => {
        poetryCard.style.transform = 'rotateX(0) rotateY(0)';
    });

    // Generar un poema al cargar la página (después de un breve retraso)
    setTimeout(generarPoema, 1000);
});