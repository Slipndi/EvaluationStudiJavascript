// Création des variables
let dice = document.querySelector('.dice');
let rollDiceButton = document.querySelector('#RollDice');
let currentClass = '';

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let namePlayer1 = 'Player 1';
let namePlayer2 = 'Player 2';





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
}

// Appelle de la fonction pour initialiser le dé
rollDice();
// On ecoute le clic qui peut avoir lieu sur le boutton rollDice.
rollDiceButton.addEventListener("click", rollDice);