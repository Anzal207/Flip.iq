/* ==========================================
   FLIP.IQ DECK MANAGEMENT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDecks();

        setupEventListeners();

    }
);

/* ==========================================
   LOAD DECKS
========================================== */

function loadDecks() {

    const deckContainer =
        document.getElementById(
            "deckContainer"
        );

    if (!deckContainer) return;

    const decks = getDecks();

    deckContainer.innerHTML = "";

    if (decks.length === 0) {

        deckContainer.innerHTML = `

            <div class="empty-state">

                <h2>📚</h2>

                <h3>No Decks Yet</h3>

                <p>
                    Create your first deck
                    to start studying.
                </p>

            </div>

        `;

        return;

    }

    decks.forEach(deck => {

        const deckCard =
            document.createElement("div");

        deckCard.classList.add(
            "deck-card"
        );

        deckCard.innerHTML = `

    <h3>${deck.name}</h3>

    <p class="deck-meta">
    
${deck.flashcards.length} Cards
    </p>

    <div class="progress-bar">

        <div
            class="progress-fill"
            style="
                width:
                ${deck.progress}%;
            ">
        </div>

    </div>

    <p>
        ${deck.progress}% Mastered
    </p>

    <div class="deck-actions">

        <button
            class="deck-btn study-btn"
            onclick="openDeck(${deck.id})">

            Open

        </button>

        <button
            class="deck-btn delete-btn"
            onclick="removeDeck(${deck.id})">

            Delete

        </button>

    </div>

`;
        deckContainer.appendChild(
            deckCard
        );

    });

}

/* ==========================================
   SETUP EVENTS
========================================== */

function setupEventListeners() {

    const createButton =
        document.getElementById(
            "createDeckBtn"
        );

    const saveButton =
        document.getElementById(
            "saveDeckBtn"
        );

    const modal =
        document.getElementById(
            "deckModal"
        );

    if (createButton) {

        createButton.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "hidden"
                );

            }
        );

    }

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            createDeck
        );

    }

    setupSearch();

}

/* ==========================================
   CREATE DECK
========================================== */

function createDeck() {

    const input =
        document.getElementById(
            "deckNameInput"
        );

    const deckName =
        input.value.trim();

    if (!deckName) {

        alert(
            "Please enter a deck name."
        );

        return;

    }

const newDeck = {

    id: Date.now(),

    name: deckName,

    progress: 0,

    color: "#3f6b42",

    flashcards: []

};


    addDeck(newDeck);

    input.value = "";

    document
        .getElementById("deckModal")
        .classList.add("hidden");

    loadDecks();

}

/* ==========================================
   DELETE DECK
========================================== */

function removeDeck(deckId) {

    const confirmed =
        confirm(
            "Delete this deck?"
        );

    if (!confirmed) return;

    deleteDeck(deckId);

    loadDecks();

}

/* ==========================================
   SEARCH
========================================== */

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    if (!searchInput) return;

    searchInput.addEventListener(
        "input",
        () => {

            const searchTerm =
                searchInput.value
                .toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".deck-card"
                );

            cards.forEach(card => {

                const title =
                    card.querySelector("h3")
                    .textContent
                    .toLowerCase();

                if (
                    title.includes(
                        searchTerm
                    )
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}

/* ==========================================
   DEBUG
========================================== */

console.log(
    "%cFlip.IQ Deck Manager Loaded",
    "color:#3f6b42;font-size:15px;font-weight:bold;"
);

/* ==========================================
   OPEN DECK
========================================== */

function openDeck(deckId){

    localStorage.setItem(
        "currentDeckId",
        deckId
    );

    window.location.href =
        "flashcards.html";

}

