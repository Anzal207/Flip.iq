/* ==========================================
   FLIP.IQ STORAGE SYSTEM
========================================== */

const defaultData = {

    decks: [],

    stats: {

        streak: 0,
        cardsStudied: 0,
        studyTime: 0,
        accuracy: 0,
        totalSessions: 0,
        lastStudyDate: null

    },

    achievements: [

        {
            title: "First Deck",
            unlocked: false
        },

        {
            title: "First Study Session",
            unlocked: false
        },

        {
            title: "10 Cards Studied",
            unlocked: false
        },

        {
            title: "100 Cards Reviewed",
            unlocked: false
        },

        {
            title: "7 Day Streak",
            unlocked: false
        }

    ],

   settings: {}

};

/* ==========================================
   INIT
========================================== */

function initializeStorage(){

    const existingData =
        localStorage.getItem(
            "flipiq_data"
        );

    if(!existingData){

        localStorage.setItem(

            "flipiq_data",

            JSON.stringify(
                defaultData
            )

        );

        return;

    }

    const data =
        JSON.parse(
            existingData
        );

    if(
        !data.stats
            .hasOwnProperty(
                "lastStudyDate"
            )
    ){

        data.stats
            .lastStudyDate =
                null;

    }

    saveData(data);

}

/* ==========================================
   DATA
========================================== */

function getData(){

    return JSON.parse(

        localStorage.getItem(
            "flipiq_data"
        )

    );

}

function saveData(data){

    localStorage.setItem(

        "flipiq_data",

        JSON.stringify(data)

    );

}

/* ==========================================
   DECKS
========================================== */

function getDecks(){

    return getData().decks;

}

function getDeckById(deckId){

    return getDecks().find(

        deck =>
            deck.id ===
            Number(deckId)

    );

}

function addDeck(deck){

    const data =
        getData();

    data.decks.push(
        deck
    );

    saveData(data);

    checkAchievements();

}

function updateDeck(updatedDeck){

    const data =
        getData();

    const index =
        data.decks.findIndex(

            deck =>
                deck.id ===
                updatedDeck.id

        );

    if(index !== -1){

        data.decks[index] =
            updatedDeck;

        saveData(data);

    }

}

function deleteDeck(deckId){

    const data =
        getData();

    data.decks =
        data.decks.filter(

            deck =>
                deck.id !==
                deckId

        );

    saveData(data);

}

/* ==========================================
   STATS
========================================== */

function getStats(){

    return getData().stats;

}

function updateStats(stats){

    const data =
        getData();

    data.stats =
        stats;

    saveData(data);

    checkAchievements();

}

/* ==========================================
   ACHIEVEMENTS
========================================== */

function getAchievements(){

    return getData()
        .achievements;

}

function unlockAchievement(title){

    const data =
        getData();

    const achievement =
        data.achievements.find(

            achievement =>
                achievement.title ===
                title

        );

    if(
        achievement &&
        !achievement.unlocked
    ){

        achievement.unlocked =
            true;

        saveData(data);

    }

}

function checkAchievements(){

    const stats =
        getStats();

    const decks =
        getDecks();

    if(
        decks.length >= 1
    ){

        unlockAchievement(
            "First Deck"
        );

    }

    if(
        stats.totalSessions >= 1
    ){

        unlockAchievement(
            "First Study Session"
        );

    }

    if(
        stats.cardsStudied >= 10
    ){

        unlockAchievement(
            "10 Cards Studied"
        );

    }

    if(
        stats.cardsStudied >= 100
    ){

        unlockAchievement(
            "100 Cards Reviewed"
        );

    }

    if(
        stats.streak >= 7
    ){

        unlockAchievement(
            "7 Day Streak"
        );

    }

}

/* ==========================================
   SETTINGS
========================================== */

function getSettings(){

    return getData()
        .settings;

}

function saveSettings(settings){

    const data =
        getData();

    data.settings =
        settings;

    saveData(data);

}

/* ==========================================
   RESET
========================================== */

function resetFlipIQ(){

    localStorage.removeItem(
        "flipiq_data"
    );

    location.reload();

}

/* ==========================================
   START
========================================== */

initializeStorage();
