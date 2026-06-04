/* ==========================================
   FLIP.IQ FLASHCARDS
========================================== */

let currentDeck = null;

let flashcards = [];

let editingIndex = null;

/* ==========================================
   LOAD PAGE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadDeck();

        setupEvents();

        loadFlashcards();

    }

);

/* ==========================================
   LOAD CURRENT DECK
========================================== */

function loadDeck(){

    const deckId =

        localStorage.getItem(
            "currentDeckId"
        );

    if(!deckId){

        window.location.href =
            "decks.html";

        return;

    }

    currentDeck =
        getDeckById(deckId);

    if(!currentDeck){

        window.location.href =
            "decks.html";

        return;

    }

    flashcards =
        currentDeck.flashcards;

    document.getElementById(
        "deckTitle"
    ).textContent =

        `📚 ${currentDeck.name}`;

}

/* ==========================================
   EVENTS
========================================== */

function setupEvents(){

    document
        .getElementById(
            "addCardBtn"
        )
        .addEventListener(
            "click",
            openModal
        );

    document
        .getElementById(
            "saveCardBtn"
        )
        .addEventListener(
            "click",
            saveFlashcard
        );

    document
        .getElementById(
            "studyDeckBtn"
        )
        .addEventListener(
            "click",
            () => {

                localStorage.setItem(

                    "studyDeckId",

                    currentDeck.id

                );

                localStorage.setItem(

                    "lastStudiedDeck",

                    currentDeck.id

                );

                window.location.href =
                    "study.html";

            }
        );

}

/* ==========================================
   LOAD FLASHCARDS
========================================== */

function loadFlashcards(){

    const container =
        document.getElementById(
            "flashcardContainer"
        );

    container.innerHTML = "";

    if(flashcards.length === 0){

        container.innerHTML = `

            <div class="empty-state">

                <h2>📚</h2>

                <h3>No Flashcards Yet</h3>

                <p>
                    Create your first flashcard.
                </p>

            </div>

        `;

        return;

    }

    flashcards.forEach(

        (card,index) => {

            const cardElement =
                document.createElement(
                    "div"
                );

            cardElement.classList.add(
                "flashcard-card"
            );

            cardElement.innerHTML = `

                <h3>
                    ${card.question}
                </h3>

                <p class="flashcard-answer">
                    ${card.answer}
                </p>

                <div class="card-actions">

                    <button
                        class="card-btn edit-btn"
                        onclick="editFlashcard(${index})">

                        Edit

                    </button>

                    <button
                        class="card-btn delete-btn"
                        onclick="deleteFlashcard(${index})">

                        Delete

                    </button>

                </div>

            `;

            container.appendChild(
                cardElement
            );

        }

    );

}

/* ==========================================
   MODAL
========================================== */

function openModal(){

    editingIndex = null;

    document.getElementById(
        "questionInput"
    ).value = "";

    document.getElementById(
        "answerInput"
    ).value = "";

    document
        .getElementById(
            "cardModal"
        )
        .classList.remove(
            "hidden"
        );

}

function closeModal(){

    document
        .getElementById(
            "cardModal"
        )
        .classList.add(
            "hidden"
        );

}

/* ==========================================
   SAVE CARD
========================================== */

function saveFlashcard(){

    const question =

        document
            .getElementById(
                "questionInput"
            )
            .value
            .trim();

    const answer =

        document
            .getElementById(
                "answerInput"
            )
            .value
            .trim();

    if(!question || !answer){

        alert(
            "Fill in both fields."
        );

        return;

    }

    if(editingIndex !== null){

        flashcards[
            editingIndex
        ] = {

            question,
            answer

        };

    }

    else{

        flashcards.push({

            id: Date.now(),

            question,

            answer

        });

    }

    currentDeck.flashcards =
        flashcards;

    updateDeck(
        currentDeck
    );

    closeModal();

    loadFlashcards();

}

/* ==========================================
   EDIT
========================================== */

function editFlashcard(index){

    editingIndex = index;

    document.getElementById(
        "questionInput"
    ).value =

        flashcards[index]
        .question;

    document.getElementById(
        "answerInput"
    ).value =

        flashcards[index]
        .answer;

    document
        .getElementById(
            "cardModal"
        )
        .classList.remove(
            "hidden"
        );

}

/* ==========================================
   DELETE
========================================== */

function deleteFlashcard(index){

    const confirmed =
        confirm(
            "Delete flashcard?"
        );

    if(!confirmed) return;

    flashcards.splice(
        index,
        1
    );

    currentDeck.flashcards =
        flashcards;

    updateDeck(
        currentDeck
    );

    loadFlashcards();

}

/* ==========================================
   DEBUG
========================================== */

console.log(
    "%cDeck Flashcards Loaded",
    "color:#3f6b42;font-size:15px;font-weight:bold;"
);

