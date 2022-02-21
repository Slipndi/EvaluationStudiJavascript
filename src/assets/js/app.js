
const ScoreInitial = 0;

// Création des variables

//On récupère les différents éléments du DOM important
const dice = document.querySelector('.dice');
const rollDiceButton = document.querySelector('#RollDice');
const startNewGameButton = document.querySelector('#StartNewGame');
const holdButton = document.querySelector('#holdScore');
const closeModalButton = document.querySelector("#closeModal");
const startGameButton = document.querySelector("#startGame");

// Position des scores
const Player1GlobalScorePlaceHolder = document.querySelector('#Player1Global');
const Player2GlobalScorePlaceHolder = document.querySelector('#Player2Global');
const Player1RoundScorePlaceHolder = document.querySelector('#Player1Round');
const Player2RoundScorePlaceHolder = document.querySelector('#Player2Round');
const ModalInformation = document.querySelector("#informations");

// Position des pseudos
const Player1NamePlaceHolder = document.querySelector('#player1Name');
const Player2NamePlaceHolder = document.querySelector("#player2Name");

// indicateur de tour
const player1Turn = document.querySelector('#player1Turn');
const player2Turn = document.querySelector('#player2Turn');

const modal = document.querySelector('#popup-modal');

// On défini le tour du joueur 1 à false avant le début de la partie.
let playerOnePlay = false;

//Initialisation des Scores
let currentClass = '';

//Valeur par défaut des noms
let namePlayer1 = document.getElementById('playerOneName').value;
let namePlayer2 = document.getElementById('playerTwoName').value;

// On initie tous les scores à 0
let player1RoundScore = ScoreInitial;
let player2RoundScore = ScoreInitial;
let player1GlobalScore = ScoreInitial;
let player2GlobalScore = ScoreInitial;

const initGame = () => {
    // on ferme la fenêtre modal pour lancer la partie
    closeModal();
    //on active les boutons 
    activationOfButtons();
    // Récupération des pseudos en éliminant les espaces blancs avant et après la chaîne de texte
    namePlayer1 = document.getElementById('playerOneName').value.trim();
    namePlayer2 = document.getElementById('playerTwoName').value.trim();
    // Si la chaîne reçue est vide ou null, on met un nom par défaut, sinon nous nettoyons les potentielles attaques de script
    Player1NamePlaceHolder.innerHTML = namePlayer1 == null || namePlayer1 == '' ? "Player 1" : protectAboutScript(namePlayer1);
    Player2NamePlaceHolder.innerHTML = namePlayer2 == null || namePlayer2 == '' ? "Player 2" : protectAboutScript(namePlayer2);
    // Mise à 0 des scores 
    Player1GlobalScorePlaceHolder.innerHTML = ScoreInitial;
    Player2GlobalScorePlaceHolder.innerHTML = ScoreInitial;
    Player1RoundScorePlaceHolder.innerHTML = ScoreInitial;
    Player2RoundScorePlaceHolder.innerHTML = ScoreInitial;
    player1RoundScore = ScoreInitial;
    player2RoundScore = ScoreInitial;
    player1GlobalScore = ScoreInitial;
    player2GlobalScore = ScoreInitial;
    // on lance le tour au joueur1
    changeTurn();
}

// Fonction permettant de gérer la logique du bouton HOLD
const holdPoint = () => {
    if (playerOnePlay) {
        player1GlobalScore += player1RoundScore;
        Player1GlobalScorePlaceHolder.innerHTML = player1GlobalScore;

    } else {
        player2GlobalScore += player2RoundScore;
        Player2GlobalScorePlaceHolder.innerHTML = player2GlobalScore;

    }
    isGameWin();
    changeTurn();
}


//Je protège mon input contre l'insertion de code
const protectAboutScript = (value) => value.replace(/[<>]/gm, '');

// Fonction qui contrôle la nouvelle partie
const openModal = () => modal.classList.remove('hidden');
const closeModal = () => modal.classList.add('hidden');

// Gestion de la partie du dé
// Génération d'un nombre aléatoire entre un mini et maxi envoyé
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
// Gestion du dé
const rollDice = () => {
    //génération d'un nombre aléatoire entre 1 et 6
    let randNum = getRandomInt(1, 7)
    // on appelle appelle la face grace au numéro généré
    let showClass = 'display-' + randNum;
    //Si il existe un style déjà appliqué on le retire
    if(currentClass) dice.classList.remove(currentClass);
    // On rajoute le style généré avec l'envoi du dé.
    dice.classList.add(showClass);
    // on stocke la valeur actuelle.
    currentClass = showClass;
    // Early return si le numéro est 1 
    if (randNum === 1) {
        return changeTurn();
    }

    // Gestion de la répartition du score en fonction du joueur actif.
    if (playerOnePlay) {
        player1RoundScore += randNum;
        Player1RoundScorePlaceHolder.innerHTML = player1RoundScore;
    } else {
        player2RoundScore += randNum;
        Player2RoundScorePlaceHolder.innerHTML = player2RoundScore;
    }

}

// Gestion du changement de Tour et réinitialisation des scores de rounds
const changeTurn = () => {
    player1RoundScore = ScoreInitial;
    player2RoundScore = ScoreInitial;
    Player1RoundScorePlaceHolder.innerHTML = ScoreInitial;
    Player2RoundScorePlaceHolder.innerHTML = ScoreInitial;
    playerOnePlay = !playerOnePlay;

    if (playerOnePlay) {
        player1Turn.classList.remove('hidden');
        player2Turn.classList.add('hidden');
    } else {
        player2Turn.classList.remove('hidden');
        player1Turn.classList.add('hidden');
    }
}

// Logique permettant de terminer la partie
const isGameWin = () => {
    if (player1GlobalScore >= 100) {
        alert(`Bravo ${Player1NamePlaceHolder.innerHTML }, tu as gagné la partie avec ${player1GlobalScore} points !`);
        activationOfButtons();
    }
    if (player2GlobalScore >= 100) {
        alert(`Bravo ${Player2NamePlaceHolder.innerHTML }, tu as gagné la partie avec ${player2GlobalScore} points !`);
        activationOfButtons();
    }
}
    
// Permet le blocage / déblocage des boutons HOLD/ROLL DICE pour qu'ils soient actif uniquement lors de la partie
const activationOfButtons = () => {
    holdButton.disabled = !holdButton.disabled    
    rollDiceButton.disabled = !rollDiceButton.disabled;
}

    
// Appelle de la fonction pour initialiser le dé
rollDice();

//Gestion des actions sur les différents buttons du DOM
startNewGameButton.addEventListener("click", openModal);
closeModalButton.addEventListener('click', closeModal);
startGameButton.addEventListener('click', initGame); 

holdButton.addEventListener('click', holdPoint);
rollDiceButton.addEventListener("click", rollDice);

