document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const elements = {
        startScreen: document.getElementById('startScreen'),
        questionScreen: document.getElementById('questionScreen'),
        feedbackScreen: document.getElementById('feedbackScreen'),
        endScreen: document.getElementById('endScreen'),
        startBtn: document.getElementById('startBtn'),
        continueBtn: document.getElementById('continueBtn'),
        restartBtn: document.getElementById('restartBtn'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        feedbackIcon: document.getElementById('feedbackIcon'),
        feedbackTitle: document.getElementById('feedbackTitle'),
        feedbackText: document.getElementById('feedbackText'),
        levelDisplay: document.getElementById('levelDisplay'),
        scoreDisplay: document.getElementById('scoreDisplay'),
        questionCount: document.getElementById('questionCount'),
        progressBar: document.getElementById('progressBar'),
        finalScore: document.getElementById('finalScore')
    };

    // Variables del juego
    const gameState = {
        currentLevel: 1,
        score: 0,
        currentQuestionIndex: 0,
        totalQuestions: 0,
        questions: [],
        usedQuestionIds: new Set(),
        totalQuestionsPerLevel: 10,
        totalLevels: 5
    };

    // Preguntas organizadas por nivel de dificultad (10 por nivel)
    const questionsByLevel = {
        1: generateQuestions(1, 10),
        2: generateQuestions(2, 10),
        3: generateQuestions(3, 10),
        4: generateQuestions(4, 10),
        5: generateQuestions(5, 10)
    };

    // Generar preguntas para cada nivel
    function generateQuestions(level, count) {
        const allQuestions = [
            // ========== NIVEL 1 (BÁSICO) ==========
            {
                question: "¿Cuál es el objetivo principal de la fisioterapia?",
                options: ["Prevenir lesiones", "Recuperar la movilidad", "Ambas son correctas", "Ninguna de las anteriores"],
                answer: 2,
                explanation: "La fisioterapia previene lesiones y recupera la movilidad."
            },
            {
                question: "¿Qué significa 'ROM' en fisioterapia?",
                options: ["Rango Original de Movimiento", "Rango de Oposición Muscular", "Rango de Movimiento", "Rotación Óptima Muscular"],
                answer: 2,
                explanation: "ROM = Rango de Movimiento (Range of Motion)."
            },
            {
                question: "¿Qué terapia utiliza el agua como medio?",
                options: ["Electroterapia", "Hidroterapia", "Termoterapia", "Crioterapia"],
                answer: 1,
                explanation: "La hidroterapia usa propiedades físicas del agua."
            },
            {
                question: "¿Qué músculo flexiona el codo?",
                options: ["Tríceps", "Bíceps braquial", "Deltoides", "Supinador"],
                answer: 1,
                explanation: "El bíceps braquial es el principal flexor del codo."
            },
            {
                question: "¿Qué articulación conecta fémur y pelvis?",
                options: ["Sacroilíaca", "Coxofemoral", "Tibiofemoral", "Esternoclavicular"],
                answer: 1,
                explanation: "La articulación coxofemoral es la cadera."
            },
            {
                question: "¿Qué prueba evalúa la cadena posterior?",
                options: ["Test de Thomas", "Test de Lasegue", "Test de Trendelenburg", "Test de Tinetti"],
                answer: 1,
                explanation: "Test de Lasegue evalúa isquiotibiales y nervio ciático."
            },
            {
                question: "¿Qué contracción genera fuerza sin movimiento?",
                options: ["Concéntrica", "Excéntrica", "Isométrica", "Isocinética"],
                answer: 2,
                explanation: "Isométrica: tensión muscular sin movimiento."
            },
            {
                question: "¿Qué estructura amortigua impactos en la rodilla?",
                options: ["Ligamento cruzado", "Meniscos", "Tendón rotuliano", "Bursa infrapatelar"],
                answer: 1,
                explanation: "Los meniscos amortiguan y distribuyen cargas."
            },
            {
                question: "¿Qué técnica usa frío terapéutico?",
                options: ["Termoterapia", "Crioterapia", "Hidroterapia", "Electroterapia"],
                answer: 1,
                explanation: "Crioterapia reduce inflamación, dolor y espasmo."
            },
            {
                question: "¿Qué músculos forman el manguito rotador?",
                options: [
                    "Supraespinoso, infraespinoso, redondo menor, subescapular",
                    "Deltoides, pectoral, redondo mayor, subescapular",
                    "Bíceps, tríceps, coracobraquial, dorsal",
                    "Trapecio, romboides, serrato, pectoral menor"
                ],
                answer: 0,
                explanation: "Manguito rotador: 4 músculos que estabilizan el hombro."
            },

            // ========== NIVEL 2 (INTERMEDIO) ==========
            {
                question: "¿Qué signo indica fractura de cadera?",
                options: ["Pie equino", "Pie en gota", "Pie corto en rotación externa", "Pie en garra"],
                answer: 2,
                explanation: "Fractura de cadera: acortamiento + rotación externa."
            },
            {
                question: "¿Qué nervio se afecta en el túnel carpiano?",
                options: ["Radial", "Mediano", "Cubital", "Musculocutáneo"],
                answer: 1,
                explanation: "Síndrome del túnel carpiano comprime el nervio mediano."
            },
            {
                question: "¿Qué músculo es el principal extensor de rodilla?",
                options: ["Bíceps femoral", "Cuádriceps", "Sartorio", "Poplíteo"],
                answer: 1,
                explanation: "El cuádriceps (especialmente el vasto intermedio)."
            },
            {
                question: "¿Qué prueba evalúa el ligamento cruzado anterior?",
                options: ["Test de Lachman", "Test de Phalen", "Test de Tinel", "Test de Finkelstein"],
                answer: 0,
                explanation: "Test de Lachman evalúa LCA en posición neutra."
            },
            {
                question: "¿Qué tipo de marcha indica parálisis del ciático?",
                options: ["Marcha en estepaje", "Marcha en Trendelenburg", "Marcha en flexión", "Marcha en tijeras"],
                answer: 0,
                explanation: "Marcha en estepaje: elevación excesiva de la pierna."
            },
            {
                question: "¿Qué músculo es el principal rotador externo de cadera?",
                options: ["Glúteo medio", "Glúteo mayor", "Piriforme", "Tensor de la fascia lata"],
                answer: 2,
                explanation: "El piriforme (también ayuda el obturador interno)."
            },
            {
                question: "¿Qué forma el techo del túnel carpiano?",
                options: ["Hueso pisiforme", "Ligamento transverso", "Retináculo flexor", "Tendón palmar largo"],
                answer: 2,
                explanation: "El retináculo flexor (ligamento anular anterior del carpo)."
            },
            {
                question: "¿Qué vendaje inmoviliza el hombro?",
                options: ["Vendaje en espiga", "Vendaje en ocho", "Vendaje Velpeau", "Vendaje en capelina"],
                answer: 2,
                explanation: "Vendaje Velpeau: brazo pegado al tórax."
            },
            {
                question: "¿Qué nervio inerva el diafragma?",
                options: ["Frénico", "Vago", "Intercostal", "Torácico largo"],
                answer: 0,
                explanation: "Nervio frénico (raíces C3-C5)."
            },
            {
                question: "¿Qué articulación permite pronosupinación?",
                options: ["Radiocubital proximal", "Codo", "Radiocarpiana", "Metacarpofalángica"],
                answer: 0,
                explanation: "Articulación radiocubital proximal + distal."
            },

            // ========== NIVEL 3 (AVANZADO) ==========
            {
                question: "¿Qué prueba evalúa el síndrome subacromial?",
                options: ["Test de Neer", "Test de Hawkins-Kennedy", "Test de Jobe", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas evalúan impacto subacromial."
            },
            {
                question: "¿Qué músculo realiza la inclinación contralateral de cabeza?",
                options: ["Esternocleidomastoideo", "Trapecio", "Escaleno anterior", "Esplenio"],
                answer: 0,
                explanation: "ECM inclina la cabeza al lado contrario."
            },
            {
                question: "¿Qué prueba detecta tendinopatía del supraespinoso?",
                options: ["Test de Empty Can", "Test de Speed", "Test de Yergason", "Test de Adson"],
                answer: 0,
                explanation: "Test de Empty Can (Jobe) evalúa supraespinoso."
            },
            {
                question: "¿Qué nervio se lesiona en la fractura de húmero distal?",
                options: ["Radial", "Mediano", "Cubital", "Axilar"],
                answer: 0,
                explanation: "Fractura supracondílea puede dañar nervio radial."
            },
            {
                question: "¿Qué músculo es agonista en la flexión de cadera?",
                options: ["Recto femoral", "Psoas ilíaco", "Sartorio", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos son flexores de cadera."
            },
            {
                question: "¿Qué test evalúa la inestabilidad de hombro?",
                options: ["Test de Apprehension", "Test de Sulcus", "Test de Load and Shift", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos evalúan diferentes tipos de inestabilidad."
            },
            {
                question: "¿Qué músculo es clave en la deambulación con muletas?",
                options: ["Tríceps braquial", "Pectoral mayor", "Dorsal ancho", "Serratos anteriores"],
                answer: 0,
                explanation: "Tríceps estabiliza el codo en descarga de peso."
            },
            {
                question: "¿Qué escala evalúa el equilibrio en ancianos?",
                options: ["Escala de Berg", "Escala de Tinetti", "Escala de Fugl-Meyer", "Escala de Ashworth"],
                answer: 1,
                explanation: "Escala de Tinetti evalúa equilibrio y marcha."
            },
            {
                question: "¿Qué técnica trata puntos gatillo?",
                options: ["Cyriax", "Maitland", "Jones", "McKenzie"],
                answer: 2,
                explanation: "Técnica de Jones (contracción-isquemia)."
            },
            {
                question: "¿Qué prueba detecta síndrome del túnel cubital?",
                options: ["Test de Tinel", "Test de Froment", "Test de Phalen inverso", "Test de Allen"],
                answer: 0,
                explanation: "Test de Tinel en canal epitrocleo-olecraniano."
            },

            // ========== NIVEL 4 (EXPERTO) ==========
            {
                question: "¿Qué escala evalúa riesgo de úlceras por presión?",
                options: ["Escala de Norton", "Escala de Braden", "Escala de Waterlow", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas son escalas válidas."
            },
            {
                question: "¿Qué nervio se lesiona en la marcha en estepaje?",
                options: ["Ciático", "Femoral", "Peroneo común", "Tibial"],
                answer: 2,
                explanation: "Parálisis del peroneo común (L4-L5-S1)."
            },
            {
                question: "¿Qué músculo está implicado en el síndrome del piramidal?",
                options: ["Piriforme", "Glúteo mayor", "Obturador interno", "Cuadrado femoral"],
                answer: 0,
                explanation: "Piriforme puede comprimir el nervio ciático."
            },
            {
                question: "¿Qué test diferencia dolor lumbar radicular?",
                options: ["Test de Slump", "Test de Straight Leg Raise", "Test de Bragard", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos evalúan compromiso radicular."
            },
            {
                question: "¿Qué técnica moviliza el sistema nervioso?",
                options: ["Mulligan", "Kaltenborn", "Butler", "McKenzie"],
                answer: 2,
                explanation: "Butler desarrolló la neurodinamia."
            },
            {
                question: "¿Qué prueba detecta inestabilidad crónica de tobillo?",
                options: ["Test del cajón anterior", "Test de inversión forzada", "Test de compresión lateral", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos evalúan ligamentos laterales."
            },
            {
                question: "¿Qué músculo es clave en el síndrome cruzado superior?",
                options: ["Pectoral mayor", "Trapecio superior", "Elevador de la escápula", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos están acortados en este síndrome."
            },
            {
                question: "¿Qué técnica trata disfunciones sacroilíacas?",
                options: ["Técnica de Mitchell", "Técnica de energía muscular", "Técnica de thrust", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas son útiles para articulación sacroilíaca."
            },
            {
                question: "¿Qué prueba evalúa la arteria vertebral?",
                options: ["Test de DeKleyn", "Test de Hautant", "Test de Unterberger", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos evalúan insuficiencia vertebrobasilar."
            },
            {
                question: "¿Qué escala mide independencia en AVD?",
                options: ["Escala de Barthel", "Escala de Lawton", "Escala de Katz", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas miden actividades de la vida diaria."
            },

            // ========== NIVEL 5 (MASTER) ==========
            {
                question: "¿Qué técnica trata la neuralgia del trigémino?",
                options: ["Terapia craneosacral", "Liberación miofascial", "Movilización del ganglio esfenopalatino", "Técnica de Jones"],
                answer: 2,
                explanation: "Movilización del ganglio esfenopalatino."
            },
            {
                question: "¿Qué prueba detecta el síndrome del desfiladero torácico?",
                options: ["Test de Adson", "Test de Wright", "Test de Roos", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos evalúan compresión neurovascular."
            },
            {
                question: "¿Qué músculo es clave en la disfunción ATM?",
                options: ["Masetero", "Pterigoideo lateral", "Temporal", "Todos los anteriores"],
                answer: 3,
                explanation: "Todos son músculos masticatorios."
            },
            {
                question: "¿Qué técnica trata cicatrices postquirúrgicas?",
                options: ["Cyriax", "Liberación fascial", "Inducción miofascial", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas mejoran movilidad de tejidos."
            },
            {
                question: "¿Qué test evalúa la arteria subclavia?",
                options: ["Test de Allen", "Test de Adson", "Test de Roos", "Test de Tinel"],
                answer: 1,
                explanation: "Test de Adson evalúa compresión subclavia."
            },
            {
                question: "¿Qué técnica trata el linfedema?",
                options: ["Drenaje linfático manual", "Presoterapia", "Vendaje multicapa", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas son parte del tratamiento."
            },
            {
                question: "¿Qué prueba detecta esguince de ligamento deltoideo?",
                options: ["Test de compresión lateral", "Test de estrés en eversión", "Test del cajón anterior", "Test de Thompson"],
                answer: 1,
                explanation: "Estrés en eversión evalúa ligamento deltoideo."
            },
            {
                question: "¿Qué técnica trata la fascitis plantar?",
                options: ["Liberación de la fascia", "Técnica de Graston", "Ondas de choque", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas son opciones terapéuticas."
            },
            {
                question: "¿Qué escala evalúa el dolor neuropático?",
                options: ["Escala DN4", "Escala de LANSS", "Escala de McGill", "Todas las anteriores"],
                answer: 3,
                explanation: "Todas evalúan características neuropáticas."
            },
            {
                question: "¿Qué técnica trata la fibromialgia?",
                options: ["Terapia cognitivo-conductual", "Ejercicio aeróbico", "Técnicas de relajación", "Todas las anteriores"],
                answer: 3,
                explanation: "Enfoque multidisciplinar es lo más efectivo."
            }
        ];
        // Seleccionar preguntas para el nivel actual
        const startIdx = (level - 1) * 10;
        const endIdx = startIdx + count;
        return allQuestions.slice(startIdx, endIdx);
    }

    // Inicializar el juego
    function initGame() {
        gameState.currentLevel = 1;
        gameState.score = 0;
        gameState.currentQuestionIndex = 0;
        gameState.usedQuestionIds = new Set();
        gameState.questions = [...questionsByLevel[gameState.currentLevel]];
        shuffleArray(gameState.questions);

        updateDisplays();
    }

    // Mostrar pregunta actual
    function showQuestion() {
        // Verificar si hemos completado todas las preguntas del nivel
        if (gameState.currentQuestionIndex >= gameState.totalQuestionsPerLevel) {
            gameState.currentLevel++;

            // Verificar si hemos completado todos los niveles
            if (gameState.currentLevel > gameState.totalLevels) {
                endGame();
                return;
            }

            // Preparar el siguiente nivel
            gameState.currentQuestionIndex = 0;
            gameState.questions = [...questionsByLevel[gameState.currentLevel]];
            shuffleArray(gameState.questions);
            gameState.usedQuestionIds = new Set();
        }

        // Obtener la pregunta actual
        const question = gameState.questions[gameState.currentQuestionIndex];
        gameState.currentQuestionIndex++;

        // Mostrar la pregunta
        elements.questionText.textContent = question.question;
        elements.optionsContainer.innerHTML = '';

        // Mostrar opciones
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index, question.answer));
            elements.optionsContainer.appendChild(button);
        });

        // Actualizar displays
        updateDisplays();

        // Actualizar barra de progreso
        const totalQuestions = gameState.totalLevels * gameState.totalQuestionsPerLevel;
        const answeredQuestions = (gameState.currentLevel - 1) * gameState.totalQuestionsPerLevel + gameState.currentQuestionIndex - 1;
        const progress = (answeredQuestions / totalQuestions) * 100;
        elements.progressBar.style.width = `${progress}%`;

        // Mostrar pantalla de pregunta
        changeScreen('questionScreen');
    }

    // Verificar respuesta
    function checkAnswer(selectedIndex, correctIndex) {
        const isCorrect = selectedIndex === correctIndex;
        const currentQuestion = gameState.questions[gameState.currentQuestionIndex - 1];

        if (isCorrect) {
            gameState.score++;
            elements.feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            elements.feedbackIcon.className = 'correct-feedback';
            elements.feedbackTitle.textContent = '¡Correcto!';
        } else {
            elements.feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            elements.feedbackIcon.className = 'wrong-feedback';
            elements.feedbackTitle.textContent = 'Incorrecto';
        }

        elements.feedbackText.textContent = currentQuestion.explanation;
        updateDisplays();
        changeScreen('feedbackScreen');
    }

    // Actualizar displays
    function updateDisplays() {
        elements.levelDisplay.textContent = `Nivel: ${gameState.currentLevel}`;
        elements.scoreDisplay.textContent = `Puntos: ${gameState.score}`;
        elements.questionCount.textContent = `Pregunta: ${gameState.currentQuestionIndex}/${gameState.totalQuestionsPerLevel}`;
    }

    // Finalizar juego
    function endGame() {
        elements.finalScore.textContent = gameState.score;
        changeScreen('endScreen');
    }

    // Cambiar pantalla visible
    function changeScreen(screenToShow) {
        // Ocultar todas las pantallas
        elements.startScreen.classList.remove('active');
        elements.questionScreen.classList.remove('active');
        elements.feedbackScreen.classList.remove('active');
        elements.endScreen.classList.remove('active');

        // Mostrar la pantalla solicitada
        elements[screenToShow].classList.add('active');
    }

    // Mezclar array (algoritmo Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Event listeners
    elements.startBtn.addEventListener('click', function () {
        initGame();
        showQuestion();
    });

    elements.continueBtn.addEventListener('click', showQuestion);

    elements.restartBtn.addEventListener('click', function () {
        initGame();
        showQuestion();
    });
});