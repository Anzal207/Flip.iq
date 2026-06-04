/* ==========================================
   DASHBOARD
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadDashboardStats();

        loadRecentDecks();

        setupContinueButton();

        setupQuickActions();

    }

);

/* ==========================================
   STATS
========================================== */

function loadDashboardStats(){

    const stats =
        getStats();

    document.getElementById(
        "streakCount"
    ).textContent =
        stats.streak;

    document.getElementById(
        "cardsToday"
    ).textContent =
        stats.cardsStudied;

    document.getElementById(
        "studyTime"
    ).textContent =
        `${stats.studyTime}m`;

    document.getElementById(
        "totalDecks"
    ).textContent =
        getDecks().length;

}

/* ==========================================
   RECENT DECKS
========================================== */

function loadRecentDecks(){

    const container =

        document.getElementById(
            "recentDecks"
        );

    const decks =
        getDecks();

    container.innerHTML = "";

    if(decks.length === 0){

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    No Decks Yet
                </h3>

                <p>
                    Create a deck
                    to get started.
                </p>

            </div>

        `;

        return;

    }

    decks.forEach(deck => {

        const card =
            document.createElement(
                "div"
            );

        card.classList.add(
            "deck-card"
        );

        card.innerHTML = `

            <h3>
                ${deck.name}
            </h3>

            <p>
                ${deck.flashcards.length}
                Cards
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

            <span>
                ${deck.progress}%
                Mastered
            </span>

        `;

        card.addEventListener(

            "click",

            () => {

                localStorage.setItem(

                    "currentDeckId",

                    deck.id

                );

                window.location.href =
                    "flashcards.html";

            }

        );

        container.appendChild(
            card
        );

    });

}

/* ==========================================
   CONTINUE STUDYING
========================================== */

function setupContinueButton(){

    const button =

        document.getElementById(
            "continueBtn"
        );

    if(!button) return;

    button.addEventListener(

        "click",

        () => {

            const deckId =

                localStorage.getItem(
                    "lastStudiedDeck"
                );

            if(!deckId){

                alert(
                    "No recent deck found."
                );

                return;

            }

            localStorage.setItem(

                "studyDeckId",

                deckId

            );

            window.location.href =
                "study.html";

        }

    );

}

/* ==========================================
   QUICK ACTIONS
========================================== */

function setupQuickActions(){

    const buttons =
        document.querySelectorAll(
            ".action-card"
        );

    buttons.forEach(button => {

        button.addEventListener(

            "click",

            () => {

                const text =
                    button.textContent;

                if(
                    text.includes(
                        "Create Deck"
                    )
                ){

                    window.location.href =
                        "decks.html";

                }

                else if(
                    text.includes(
                        "Quick Study"
                    )
                ){

                    window.location.href =
                        "quick-study.html";

                }

                else if(
                    text.includes(
                        "Analytics"
                    )
                ){

                    window.location.href =
                        "analytics.html";

                }

                else if(
                    text.includes(
                        "Import"
                    )
                ){

                    alert(
                        "Import Deck coming soon."
                    );

                }

            }

        );

    });

}