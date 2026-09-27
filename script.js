/* =====================================================
   ELEMENTS
===================================================== */

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");

const heroCharacter =
    document.querySelector(".hero-character");

const web =
    document.querySelector(".web-effect");

const eventIntro =
    document.querySelector(".event-intro");

const eventCards =
    document.querySelectorAll(".event-card");

const heroButton =
    document.querySelector(".hero-button");

const registerButton =
    document.querySelector(".register-button");


/* =====================================================
   DEVICE CHECK
===================================================== */

const isMobile =
    window.innerWidth <= 768;


/* =====================================================
   HERO INTRO
===================================================== */

window.addEventListener(
    "load",
    () => {

        heroContent.style.opacity = "0";

        heroContent.style.transform =
            "translate3d(-80px, 25px, 0)";


        heroCharacter.style.opacity = "0";

        heroCharacter.style.transform =
            "translate3d(120px, 40px, 0)";


        setTimeout(() => {

            heroContent.style.transition =
                "opacity 1.25s ease, transform 1.25s cubic-bezier(0.22,1,0.36,1)";

            heroContent.style.opacity = "1";

            heroContent.style.transform =
                "translate3d(0,0,0)";

        }, 180);


        setTimeout(() => {

            heroCharacter.style.transition =
                "opacity 1.5s ease, transform 1.5s cubic-bezier(0.22,1,0.36,1)";

            heroCharacter.style.opacity = "1";

            heroCharacter.style.transform =
                "translate3d(0,0,0)";

        }, 450);

    }
);


/* =====================================================
   MOUSE CAMERA
===================================================== */

let mouseX = 0;
let mouseY = 0;

let smoothX = 0;
let smoothY = 0;


if (!isMobile) {

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (
                    event.clientX /
                    window.innerWidth
                    - 0.5
                ) * 2;


            mouseY =
                (
                    event.clientY /
                    window.innerHeight
                    - 0.5
                ) * 2;

        }
    );

}


function cinematicCamera() {

    smoothX +=
        (mouseX - smoothX) *
        0.055;


    smoothY +=
        (mouseY - smoothY) *
        0.055;


    if (!isMobile) {

        /* Character = foreground */

        heroCharacter.style.setProperty(
            "--character-x",
            `${smoothX * 30}px`
        );


        heroCharacter.style.setProperty(
            "--character-y",
            `${smoothY * 20}px`
        );


        /* Web = background */

        web.style.setProperty(
            "--web-x",
            `${smoothX * -12}px`
        );


        web.style.setProperty(
            "--web-y",
            `${smoothY * -8}px`
        );


        /* Typography */

        heroContent.style.setProperty(
            "--content-x",
            `${smoothX * -8}px`
        );


        heroContent.style.setProperty(
            "--content-y",
            `${smoothY * -5}px`
        );

    }


    requestAnimationFrame(
        cinematicCamera
    );

}


cinematicCamera();


/* =====================================================
   SCROLL PARALLAX
===================================================== */

function scrollScene() {

    const scrollY =
        window.scrollY;

    const heroHeight =
        window.innerHeight;


    if (
        scrollY <= heroHeight
    ) {

        const progress =
            scrollY / heroHeight;


        heroCharacter.style.setProperty(
            "--character-scroll",
            `${progress * 85}px`
        );


        heroContent.style.setProperty(
            "--content-scroll",
            `${progress * -55}px`
        );

    }

}


window.addEventListener(
    "scroll",
    scrollScene,
    {
        passive: true
    }
);


scrollScene();


/* =====================================================
   EVENT INITIAL STATE
===================================================== */

eventIntro.style.opacity = "0";

eventIntro.style.transform =
    "translateY(90px)";


eventCards.forEach(
    (card) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(100px) rotateX(14deg)";

    }
);


/* =====================================================
   EVENT REVEAL
===================================================== */

let cardsRevealed = false;


function revealEventScene() {

    const trigger =
        window.innerHeight * 0.80;


    /* Intro */

    const introTop =
        eventIntro
            .getBoundingClientRect()
            .top;


    if (
        introTop < trigger
    ) {

        eventIntro.style.transition =
            "opacity 1.1s ease, transform 1.15s cubic-bezier(0.22,1,0.36,1)";

        eventIntro.style.opacity = "1";

        eventIntro.style.transform =
            "translateY(0)";

    }


    /* Cards */

    if (
        !cardsRevealed &&
        eventCards.length > 0
    ) {

        const firstCardTop =
            eventCards[0]
                .getBoundingClientRect()
                .top;


        if (
            firstCardTop < trigger
        ) {

            cardsRevealed = true;


            eventCards.forEach(
                (card, index) => {

                    setTimeout(
                        () => {

                            card.style.transition =
                                "opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)";

                            card.style.opacity = "1";

                            card.style.transform =
                                "translateY(0) rotateX(0deg)";

                        },
                        index * 180
                    );

                }
            );

        }

    }

}


window.addEventListener(
    "scroll",
    revealEventScene,
    {
        passive: true
    }
);


revealEventScene();


/* =====================================================
   3D CARD TILT
===================================================== */

if (!isMobile) {

    eventCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 5;


                    const rotateX =
                        (
                            (centerY - y) /
                            centerY
                        ) * 5;


                    card.style.transform =
                        `
                        translateY(-10px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        `
                        translateY(0)
                        rotateX(0deg)
                        rotateY(0deg)
                        `;

                }
            );

        }
    );

}


/* =====================================================
   HERO BUTTON
===================================================== */

heroButton.addEventListener(
    "mouseenter",
    () => {

        heroButton.style.transform =
            "translateY(-5px) scale(1.04)";

    }
);


heroButton.addEventListener(
    "mouseleave",
    () => {

        heroButton.style.transform =
            "translateY(0) scale(1)";

    }
);


/* =====================================================
   REGISTER BUTTON
===================================================== */

registerButton.addEventListener(
    "mouseenter",
    () => {

        registerButton.style.transform =
            "translateY(-6px) scale(1.04)";

    }
);


registerButton.addEventListener(
    "mouseleave",
    () => {

        registerButton.style.transform =
            "translateY(0) scale(1)";

    }
);


/* =====================================================
   REGISTER CLICK
===================================================== */

registerButton.addEventListener(
    "click",
    () => {

        alert(
            "Registration will open soon!"
        );

    }
);


/* =====================================================
   MOBILE
===================================================== */

if (isMobile) {

    document.body.style.cursor =
        "default";

}