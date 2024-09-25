// Array de cartas con sus nombres y descripciones
const cardsArray = [
    { name: 'Teclado', description: 'Es una unidad de entrada que permite ingresar texto' },
    { name: 'Es una unidad de entrada que permite ingresar texto', description: 'Teclado' },
    { name: 'Mouse', description: 'Es una unidad de entrada que permite interactuar con el puntero' },
    { name: 'Es una unidad de entrada que permite interactuar con el puntero', description: 'Mouse' },
    { name: 'Monitor', description: 'Es una unidad de salida que muestra información visual' },
    { name: 'Es una unidad de salida que muestra información visual', description: 'Monitor' },
    { name: 'CPU', description: 'Es la unidad de procesamiento central que ejecuta instrucciones' },
    { name: 'Es la unidad de procesamiento central que ejecuta instrucciones', description: 'CPU' },
    { name: 'Memoria RAM', description: 'Es una memoria de acceso rápido utilizada por el procesador' },
    { name: 'Es una memoria de acceso rápido utilizada por el procesador', description: 'Memoria RAM' },
    { name: 'Disco Duro', description: 'Es una unidad de almacenamiento de datos a largo plazo' },
    { name: 'Es una unidad de almacenamiento de datos a largo plazo', description: 'Disco Duro' },
];

let flippedCards = [];
let matchedCards = [];
let attemptCounter = 0; // Contador de intentos

// Barajar cartas
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializar el juego
function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Reiniciar el tablero para nuevos juegos
    const shuffledCards = shuffleCards([...cardsArray]);
    matchedCards = [];
    flippedCards = [];
    attemptCounter = 0;
    document.getElementById('intentoContador').textContent = attemptCounter;

    shuffledCards.forEach((cardData) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-name', cardData.name);
        card.setAttribute('data-description', cardData.description);
        card.addEventListener('click', flipCard);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = '❓'; 

        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    });
}

// Manejar el giro de la carta al hacer clic
function flipCard(event) {
    const clickedCard = event.currentTarget;
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

    const cardContent = clickedCard.querySelector('.card-content');
    cardContent.textContent = clickedCard.getAttribute('data-name');
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        updateAttempts();
        checkForMatch();
    }
}

// Actualizar y mostrar el contador de intentos
function updateAttempts() {
    attemptCounter++;
    document.getElementById('intentoContador').textContent = attemptCounter;
}

// Comprobar si las dos cartas volteadas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const name1 = card1.getAttribute('data-name');
    const desc2 = card2.getAttribute('data-description');
    const name2 = card2.getAttribute('data-name');
    const desc1 = card1.getAttribute('data-description');

    if ((name1 === desc2 && name2 === desc1) || (name2 === desc1 && name1 === desc2)) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedCards.push(card1, card2);
            if (matchedCards.length === cardsArray.length) {
                showWinMessage();
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.querySelector('.card-content').textContent = '❓';
            card2.querySelector('.card-content').textContent = '❓';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Mostrar mensaje de victoria
function showWinMessage() {
    const winMessage = document.getElementById('winMessage');
    winMessage.classList.add('show');
}

// Reiniciar el juego
function restartGame() {
    const winMessage = document.getElementById('winMessage');
    winMessage.classList.remove('show'); // Ocultar mensaje de victoria
    initGame(); // Reiniciar el juego
}

window.onload = initGame;
