/* ==========================================
   FLIP.IQ ACHIEVEMENTS
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        checkAchievements();

        loadAchievements();

    }

);

/* ==========================================
   LOAD ACHIEVEMENTS
========================================== */

function loadAchievements(){

    const achievementGrid =

        document.getElementById(
            "achievementGrid"
        );

    const achievements =

        getAchievements();

    achievementGrid.innerHTML = "";

    achievements.forEach(

        achievement => {

            const card =

                document.createElement(
                    "div"
                );

            card.classList.add(
                "achievement-card"
            );

            card.classList.add(

                achievement.unlocked
                    ? "unlocked"
                    : "locked"

            );

            card.innerHTML = `

                <h2>

                    ${
                        achievement.unlocked
                            ? "🏆"
                            : "🔒"
                    }

                </h2>

                <h3>

                    ${achievement.title}

                </h3>

                <p>

                    ${
                        achievement.unlocked
                            ? "Unlocked"
                            : "Locked"
                    }

                </p>

            `;

            achievementGrid.appendChild(
                card
            );

        }

    );

}

/* ==========================================
   REFRESH
========================================== */

function refreshAchievements(){

    checkAchievements();

    loadAchievements();

}

/* ==========================================
   DEBUG
========================================== */

console.log(

    "%cAchievements Loaded",

    "color:#3f6b42;font-size:15px;font-weight:bold;"

);
