// szelektáljuk a html elemeket
const newGameBtn = document.querySelector('.js-start-game');
const guessListContainer = document.querySelector('.js-guess-container');
const currentGuessField = document.querySelector('.js-guess-field');
const submutGuessBtn = document.querySelector('.js-submit-guess');



// létrehozzuk globálisan a kitalálandó szám változót
let target;
let guessList = [];
let gameOver = false;

const guessResults = {
    'KISEEB': 'kisebb',
    'NAGYOBB': 'nagyobb',
    'HELYES': 'talált',
}

// véletlen szám generálása 1 és 100 között!
function generateTarget() {
    return Math.floor((Math.random() * 100) + 1)
};


// jeták resetelése
function resetGame() {
    //korábbi tippek törlése
    guessList = [];
    renderGuessList();
    currentGuessField.value = ''; // töröljük a form értékét
    //engedünk tippelni
    gameOver = false;


};

//játék indítása
function startGame() {
    resetGame();  // minden játék indítésnél lefut a reset
    target = generateTarget(); // minden játék indításnál új kitalálandó számot generálunk
};



// hozzáadjuk a guessListhez a tippet és az összahasonlítás eredményét
function addGuess(guessValue, result) {
    guessList.unshift({ guessValue, result });
}



// a tipp és a gondolt szám összehasonlítása. eredmény megjelenítése
function compareGuessToTarget(guess) {
    if (guess < target) {
        addGuess(guess, guessResults.NAGYOBB);
    } else if (guess > target) {
        addGuess(guess, guessResults.KISEEB);
    } else {
        addGuess(guess, guessResults.HELYES);
        gameOver = true;
    }
    renderGuessList();
};



function submitGuess(event) {
    event.preventDefault();
    if (!gameOver) {
        const guessValue = Number.parseInt(currentGuessField.value);
        if (validatGuess()) {
            compareGuessToTarget(guessValue);
        }
    }
};


// vallidálás
function addValidation() {
    currentGuessField.classList.add('is-invalid');
};

function removeValidation() {
    currentGuessField.classList.remove('is-invalid');
};

function validatGuess() {
    const guessValue = Number.parseInt(currentGuessField.value);
    // a tizedes számok miatt, mivel a javascript levágja alapból a tizedeseket ezért engedi beküldeni. 
    // megoldás: mivel egész számként kapjuk meg az input value-t így ezt a számot visszaírjuk az input mezőbe!
    currentGuessField.value = guessValue;

    // ellenőrizzük hogy nem szám , kis mint egy vagy nagyobb mint 100. ha igen akkor hibaüzenet!
    if (Number.isNaN(guessValue) || guessValue < 1 || guessValue > 100) {
        addValidation()
        return false;
    }
    removeValidation();
    return true;
};

function renderGuessList() {
    let html = '';
    let guessType, guessText;

    for (let { guessValue, result } of guessList) {
        if (result === guessResults.KISEEB) {
            guessType = "warning";
            guessText = "A keresett szám kisebb!";
        } else if (result === guessResults.NAGYOBB) {
            guessType = "primary";
            guessText = "A keresett szám nagyobb!";
        } else {
            guessType = "success";
            guessText = `Gratulálok, eltaláltad! Tippek száma: ${guessList.length}`;
        }

        html += `
            <div class="row">
            <div
                class="mb-3 fs-5 col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4  offset-xl-4 text-center alert alert-${guessType}">
                ${guessValue} - ${guessText}
            </div>
        </div>
        `
    }

    guessListContainer.innerHTML = html;
}



// minden oldal betöltéskor indul a játék
startGame();

// ozzáadjuk a játék indítását az új játék gombhoz
newGameBtn.addEventListener('click', startGame);
submutGuessBtn.addEventListener('click', submitGuess);
// az input mező fókuszát figyeljük. ha fókuszban van akkor elvesszük a hibe üzenetet!
currentGuessField.addEventListener('focus', removeValidation);
currentGuessField.addEventListener('change', validatGuess);