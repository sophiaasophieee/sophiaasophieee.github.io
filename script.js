document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
    const profilePicture = box.querySelector("img");
    const nameElements = document.querySelectorAll("h2, title");
    const pfpMenu = document.querySelector(".box img:nth-child(1)");
    const fileMenu = document.querySelector(".box h2:nth-child(2)");
    const editMenu = document.querySelector(".menu p:nth-child(3)");
    let posX = window.innerWidth / 2 - box.offsetWidth / 2;
    let posY = window.innerHeight / 2 - box.offsetHeight / 2;
    box.style.position = "absolute";
    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;

    const keyStates = {};
    const speed = 5;
    const gravity = 1;
    const leap = -15;
    let sophiemode = false;
    let dvdmode = false;
    let matt = false;
    let dx = 2;
    let dy = 2;
    let isJumping = false;
    const sophieletters = ["s", "o", "p", "h", "i", "e"];
    const dvdletters = ["d", "v", "d"];
    const mattletters = ["m", "a", "t", "t"];
    let sophindex = 0;
    let indvdex = 0;
    let mattindex = 0;

    const wiiAudio = new Audio("wii.mp3");
    let isFirstClick = true;

    document.addEventListener("keydown", (event) => {
        keyStates[event.key] = true;

        if (!sophiemode && !dvdmode) {
            if (event.key === sophieletters[sophindex]) {
                sophindex++;
                if (sophindex === sophieletters.length) {
                    sophiemode = true;
                    sophindex = 0;
                }
            } else {
                sophindex = 0;
            }

            if (event.key === dvdletters[indvdex]) {
                indvdex++;
                if (indvdex === dvdletters.length) {
                    dvdmode = true;
                    indvdex = 0;
                }
            } else {
                indvdex = 0;
            }
        }
        if (event.key === mattletters[mattindex]) {
            mattindex++;
            if (mattindex === mattletters.length) {
                mattstart();
                mattindex = 0;
            }
        } else {
            mattindex = 0;
        }

        if (event.key === "r" || event.key === "R") {
            resetAll();
        }
    });

    document.addEventListener("keyup", (event) => {
        keyStates[event.key] = false;
    });

    function mattstart() {
        matt = true;
        profilePicture.src = "matt.png";
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "matt.png";
        nameElements.forEach((element) => {
            element.textContent = element.textContent.replace(/Sophie/g, "Matt");
        });
    }

    function resetAll() {
        posX = window.innerWidth / 2 - box.offsetWidth / 2;
        posY = window.innerHeight / 2 - box.offsetHeight / 2;
        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;
        sophiemode = false;
        dvdmode = false;
        matt = false;
        dx = 2;
        dy = 2;
        isJumping = false;
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "sophie.png";
        profilePicture.src = "sophie.png";
        nameElements.forEach((element) => {
            element.textContent = element.textContent.replace(/Matt/g, "Sophie");
        });

        Object.keys(keyStates).forEach((key) => {
            keyStates[key] = false;
        });
    }

    function move() {
        if (dvdmode) {
            posX += dx;
            posY += dy;

            if (posX <= 0 || posX >= window.innerWidth - box.offsetWidth) {
                dx *= -1;
            }
            if (posY <= 0 || posY >= window.innerHeight - box.offsetHeight) {
                dy *= -1;
            }
        } else if (sophiemode) {
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);

            dy += gravity;
            posY = Math.min(window.innerHeight - box.offsetHeight, posY + dy);

            if (posY >= window.innerHeight - box.offsetHeight) {
                dy = 0;
                isJumping = false;
            }

            if ((keyStates[" "] || keyStates["ArrowUp"]) && !isJumping) {
                dy = leap;
                isJumping = true;
            }
        } else {
            if (keyStates["ArrowUp"]) posY = Math.max(0, posY - speed);
            if (keyStates["ArrowDown"]) posY = Math.min(window.innerHeight - box.offsetHeight, posY + speed);
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);
        }

        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;

        requestAnimationFrame(move);
    }

    move();

    pfpMenu.addEventListener("click", () => {
        if (isFirstClick || wiiAudio.paused) {
            wiiAudio.play();
            isFirstClick = false;
        }

        if (matt) {
            matt = false;
            const favicon = document.querySelector("link[rel='icon']");
            favicon.href = "sophie.png";
            profilePicture.src = "sophie.png";
            nameElements.forEach((element) => {
                element.textContent = element.textContent.replace(/Matt/g, "Sophie");
            });
        } else {
            mattstart();
        }
    });

    fileMenu.addEventListener("click", () => {
        dvdmode = true;
        indvdex = 0;
    });

    editMenu.addEventListener("click", () => {
        resetAll(); 
    });

    box.addEventListener("mousedown", (event) => {
        let isDragging = true;
        const mouseX = event.clientX - box.offsetLeft;
        const mouseY = event.clientY - box.offsetTop;

        const dragMove = (moveEvent) => {
            if (isDragging) {
                posX = Math.max(0, Math.min(window.innerWidth - box.offsetWidth, moveEvent.clientX - mouseX));
                posY = Math.max(0, Math.min(window.innerHeight - box.offsetHeight, moveEvent.clientY - mouseY));
                box.style.left = `${posX}px`;
                box.style.top = `${posY}px`;
            }
        };

        document.addEventListener("mousemove", dragMove);

        document.addEventListener("mouseup", () => {
            isDragging = false;
            document.removeEventListener("mousemove", dragMove);
        }, { once: true });
    });
});
