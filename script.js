document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
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
    let dx = 2;
    let dy = 2;
    let isJumping = false;
    const sophieletters = ["s", "o", "p", "h", "i", "e"];
    const dvdletters = ["d", "v", "d"];
    let sophindex = 0;
    let indvdex = 0;

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
    
        if (event.key === "r" || event.key === "R") {
            resetAll();
        }
    });
    

    document.addEventListener("keyup", (event) => {
        keyStates[event.key] = false;
    });

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

    function resetAll() {
        posX = window.innerWidth / 2 - box.offsetWidth / 2;
        posY = window.innerHeight / 2 - box.offsetHeight / 2;
        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;
        sophiemode = false;
        dvdmode = false;
        dx = 2;
        dy = 2;
        isJumping = false;
        Object.keys(keyStates).forEach((key) => {
            keyStates[key] = false;
        });
    }
    

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
