/* ==========================================
   FLIP.IQ ANALYTICS
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    loadAnalytics

);

/* ==========================================
   LOAD ANALYTICS
========================================== */

function loadAnalytics(){

    const stats =
        getStats();

    if(!stats)
        return;

    document.getElementById(
        "analyticsStreak"
    ).textContent =
        stats.streak;

    document.getElementById(
        "analyticsCards"
    ).textContent =
        stats.cardsStudied;

    document.getElementById(
        "analyticsTime"
    ).textContent =
        `${stats.studyTime}m`;

    document.getElementById(
        "analyticsSessions"
    ).textContent =
        stats.totalSessions;

}

/* ==========================================
   DEBUG
========================================== */

console.log(

    "%cAnalytics Loaded",

    "color:#3f6b42;font-size:15px;font-weight:bold;"

);
