// szelektáljuk a html elemeket
const newGameBtn = document.querySelector('.js-start-game');
const $guessListContainer = document.querySelector('.js-guess-container');
const $currentGuessField = document.querySelector('.js-guess-field');
const $submutGuessBtn = document.querySelector('.js-submut-guess');



// létrehozzuk globálisan a kitalálandó szám változót
let target;


// véletlen szám generálása 1 és 100 között!
function generateTarget() {
    return Math.floor((Math.random() * 100) + 1)
};


// jeták resetelése
function resetGame() {
    $guessListContainer.innerHTML = '';  // töröljük az alerteket
    $currentGuessField.value = ''; // töröljük a form értékét
};

//játék indítása
function startGame() {
    resetGame();  // minden játék indítésnél lefut a reset
    target = generateTarget(); // minden játék indításnál új kitalálandó számot generálunk
};


// minden oldal betöltéskor indul a játék
startGame();


// ozzáadjuk a játék indítását az új játék gombhoz
newGameBtn.addEventListener('click', startGame);
