/* ==========================================
   FLIP.IQ QUICK STUDY
========================================== */

let flashcards = [];

let currentCard = 0;

let isFlipped = false;

/* ==========================================
   ELEMENTS
========================================== */

const flashcard =
    document.getElementById("flashcard");

const frontText =
    document.getElementById("cardFront");

const backText =
    document.getElementById("cardBack");

const counter =
    document.getElementById("cardCounter");

const percent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

/* ==========================================
   LOAD ALL USER FLASHCARDS
========================================== */

function loadUserFlashcards(){

    const decks =
        getDecks();

    flashcards = [];

    decks.forEach(deck => {

        if(
            deck.flashcards &&
            deck.flashcards.length
        ){

            deck.flashcards.forEach(card => {

                flashcards.push({

                    front:
                        card.question,

                    back:
                        card.answer

                });

            });

        }

    });

}

/* ==========================================
   INITIAL LOAD
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadUserFlashcards();

        loadCard();

        setupButtons();

        setupKeyboard();

    }

);

/* ==========================================
   LOAD CARD
========================================== */

function loadCard(){

    if(
        flashcards.length === 0
    ){

        frontText.textContent =
            "No flashcards found";

        backText.textContent =
            "Create a deck first";

        counter.textContent =
            "0 Cards";

        percent.textContent =
            "0%";

        progressFill.style.width =
            "0%";

        return;

    }

    const card =
        flashcards[currentCard];

    frontText.textContent =
        card.front;

    backText.textContent =
        card.back;

    counter.textContent =
        `Card ${currentCard + 1} of ${flashcards.length}`;

    const progress =

        (
            (currentCard + 1)
            /
            flashcards.length
        ) * 100;

    percent.textContent =
        `${Math.round(progress)}%`;

    progressFill.style.width =
        `${progress}%`;

    flashcard.classList.remove(
        "flipped"
    );

    isFlipped = false;

}

/* ==========================================
   FLIP CARD
========================================== */

function flipCard(){

    if(
        flashcards.length === 0
    ) return;

    flashcard.classList.toggle(
        "flipped"
    );

    isFlipped =
        !isFlipped;

}

/* ==========================================
   NEXT CARD
========================================== */

function nextCard(){

    if(

        currentCard <
        flashcards.length - 1

    ){

        currentCard++;

        loadCard();

    }

}

/* ==========================================
   PREVIOUS CARD
========================================== */

function previousCard(){

    if(
        currentCard > 0
    ){

        currentCard--;

        loadCard();

    }

}

/* ==========================================
   SHUFFLE
========================================== */

function shuffleCards(){

    flashcards.sort(

        () =>
            Math.random() - 0.5

    );

    currentCard = 0;

    loadCard();

}

/* ==========================================
   RESTART
========================================== */

function restartSession(){

    currentCard = 0;

    loadCard();

}

/* ==========================================
   BUTTON EVENTS
========================================== */

function setupButtons(){

    document
        .getElementById(
            "flipBtn"
        )
        .addEventListener(
            "click",
            flipCard
        );

    document
        .getElementById(
            "nextBtn"
        )
        .addEventListener(
            "click",
            nextCard
        );

    document
        .getElementById(
            "prevBtn"
        )
        .addEventListener(
            "click",
            previousCard
        );

    document
        .getElementById(
            "shuffleBtn"
        )
        .addEventListener(
            "click",
            shuffleCards
        );

    document
        .getElementById(
            "restartBtn"
        )
        .addEventListener(
            "click",
            restartSession
        );

    flashcard.addEventListener(

        "click",

        flipCard

    );

}

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

function setupKeyboard(){

    document.addEventListener(

        "keydown",

        event => {

            switch(event.key){

                case " ":

                    event.preventDefault();

                    flipCard();

                    break;

                case "ArrowRight":

                    nextCard();

                    break;

                case "ArrowLeft":

                    previousCard();

                    break;

                case "s":
                case "S":

                    shuffleCards();

                    break;

                case "r":
                case "R":

                    restartSession();

                    break;

            }

        }

    );

}

/* ==========================================
   DEBUG
========================================== */

console.log(
    "%cFlip.IQ Quick Study Loaded",
    "color:#3f6b42;font-size:15px;font-weight:bold;"
);