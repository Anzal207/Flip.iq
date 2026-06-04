/* ==========================================
   SETTINGS
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        document
            .getElementById(
                "resetBtn"
            )
            .addEventListener(

                "click",

                () => {

                    const confirmed =

                        confirm(
                            "Reset all Flip.IQ data?"
                        );

                    if(confirmed){

                        resetFlipIQ();

                    }

                }

            );

    }

);

console.log(
    "%cSettings Loaded",
    "color:#3f6b42;font-size:15px;font-weight:bold;"
);
