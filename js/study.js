/* ==========================================
   STUDY DECK
========================================== */

let deck = null;

let flashcards = [];

let currentIndex = 0;

let showingAnswer = false;

let sessionStarted = false;

let sessionStartTime = 0;

/* ==========================================
   LOAD
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadDeck();

        setupEvents();

    }

);

/* ==========================================
   LOAD DECK
========================================== */

function loadDeck(){

    const deckId =

        localStorage.getItem(
            "studyDeckId"
        );

    if(!deckId){

        window.location.href =
            "decks.html";

        return;

    }

    deck =
        getDeckById(deckId);

    if(!deck){

        window.location.href =
            "decks.html";

        return;

    }

    flashcards =
        deck.flashcards;

    startStudySession();

    document.getElementById(
        "deckName"
    ).textContent =

        deck.name;

    renderCard();

}

/* ==========================================
   STUDY SESSION
========================================== */

function startStudySession(){

    if(sessionStarted)
        return;

    sessionStarted = true;

    sessionStartTime =
        Date.now();

    const stats =
        getStats();

    stats.totalSessions++;

    updateStreak();

    updateStats(
        stats
    );

}

/* ==========================================
   STREAK
========================================== */

function updateStreak(){

    const stats =
        getStats();

    const today =
        new Date()
        .toDateString();

    if(
        stats.lastStudyDate ===
        today
    ){
        return;
    }

    const yesterday =
        new Date();

    yesterday.setDate(

        yesterday.getDate() - 1

    );

    if(

        stats.lastStudyDate ===
        yesterday.toDateString()

    ){

        stats.streak++;

    }

    else{

        stats.streak = 1;

    }

    stats.lastStudyDate =
        today;

    updateStats(
        stats
    );

}

/* ==========================================
   RENDER
========================================== */

function renderCard(){

    const cardText =
        document.getElementById(
            "cardText"
        );

    const counter =
        document.getElementById(
            "cardCounter"
        );

    if(flashcards.length === 0){

        cardText.textContent =
            "No flashcards in this deck.";

        counter.textContent =
            "0 Cards";

        return;

    }

    const card =
        flashcards[currentIndex];

    cardText.textContent =

        showingAnswer
            ? card.answer
            : card.question;

   counter.textContent =

    `Card ${currentIndex + 1} of ${flashcards.length}`;

const progress =

    (
        (currentIndex + 1)
        /
        flashcards.length
    ) * 100;

document.getElementById(
    "progressFill"
).style.width =

    `${progress}%`;

document.getElementById(
    "progressText"
).textContent =

    `${Math.round(progress)}%`;

}

/* ==========================================
   FLIP
========================================== */

function flipCard(){

    if(
        flashcards.length === 0
    ) return;

    showingAnswer =
        !showingAnswer;

    if(showingAnswer){

        const stats =
            getStats();

        stats.cardsStudied++;

        updateStats(
            stats
        );

    }

    renderCard();

}

/* ==========================================
   NEXT
========================================== */

function nextCard(){

    if(
        currentIndex <
        flashcards.length - 1
    ){

        currentIndex++;

        showingAnswer =
            false;

        renderCard();

    }

}

/* ==========================================
   PREVIOUS
========================================== */

function previousCard(){

    if(currentIndex > 0){

        currentIndex--;

        showingAnswer =
            false;

        renderCard();

    }

}

/* ==========================================
   STUDY TIME
========================================== */

window.addEventListener(

    "beforeunload",

    () => {

        if(
            !sessionStartTime
        ) return;

        const stats =
            getStats();

        const minutes =

    Math.max(

        1,

        Math.ceil(

            (
                Date.now()
                -
                sessionStartTime
            )
            /
            60000

        )

    );

        stats.studyTime +=
            minutes;

        updateStats(
            stats
        );

    }

);

/* ==========================================
   EVENTS
========================================== */

function setupEvents(){

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
        .querySelector(
            ".study-card"
        )
        .addEventListener(
            "click",
            flipCard
        );

}
