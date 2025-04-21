let sixPressed = false;
let ninePressed = false;
let triggered = false;
let matt = false;

function triggerSequence() {
    if (sessionStorage.getItem('sequenceTriggered') === 'true') {
        return;
    }

    const newCfcfcf = '#ffa500';
    const newBbbbbb = '#53b6d6';

    const allElements = document.querySelectorAll('*');
    const originalStyles = [];

    allElements.forEach(el => {
        const style = getComputedStyle(el);
        originalStyles.push({
            element: el,
            backgroundColor: el.style.backgroundColor,
            borderColor: el.style.borderColor
        });

        if (style.backgroundColor.includes('207, 207, 207')) {
            el.style.backgroundColor = newCfcfcf;
        }
        if (style.backgroundColor.includes('187, 187, 187')) {
            el.style.backgroundColor = newBbbbbb;
        }
        if (style.borderColor.includes('207, 207, 207')) {
            el.style.borderColor = newCfcfcf;
        }
        if (style.borderColor.includes('187, 187, 187')) {
            el.style.borderColor = newBbbbbb;
        }
    });

    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'black';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 2.5s ease';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);
        triggered = true;
        void overlay.offsetHeight;

        overlay.style.opacity = '1';
        setTimeout(() => {
            const beforeEl = document.getElementById("before");
            const afterEl = document.getElementById("after");

            if (beforeEl && afterEl) {
                beforeEl.classList.add("hidden");
                afterEl.classList.add("active");
            }

            originalStyles.forEach(({ element, backgroundColor, borderColor }) => {
                element.style.backgroundColor = backgroundColor;
                element.style.borderColor = borderColor;
            });

            overlay.remove();
            sessionStorage.setItem('sequenceTriggered', 'true');

            const wiiAudio = document.getElementById("wiiAudio");
            if (wiiAudio) {
                wiiAudio.play();
            }
        }, 2500);
    }, 500);
}


document.addEventListener('keydown', e => {
    if (e.key === '6') sixPressed = true;
    if (e.key === '9') ninePressed = true;
    if (sixPressed && ninePressed) {
        triggerSequence();
    }
});

document.addEventListener('keyup', e => {
    if (e.key === '6') sixPressed = false;
    if (e.key === '9') ninePressed = false;
});

document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.clear();

    const link = document.getElementById('sixtynine');
    if (link) {
        link.addEventListener('click', e => {
            e.preventDefault();
            triggerSequence();
        });
    }

    document.querySelectorAll(".height").forEach(el => {
        const heightValue = parseInt(el.id, 10);
        if (!isNaN(heightValue)) {
            el.style.height = heightValue + "vh";
        }
    });

    const profilePictures = document.querySelectorAll(".profile");
    const whitesoapphia = document.querySelectorAll(".wh");
    const soapphias = document.querySelectorAll(".soap");
    const nameElements = document.querySelectorAll("h2, title");

    function mattstart() {
        const flashOverlay = document.getElementById('trol');
        flashOverlay.style.display = 'block';
        setTimeout(() => {
            flashOverlay.style.display = 'none';
            matt = true;
            profilePictures.forEach(img => img.src = "website/matt.png");
            whitesoapphia.forEach(img => img.src = "website/whmattphia.png");
            soapphias.forEach(img => img.src = "website/mattphia.png");
    
            const favicon = document.querySelector("link[rel='icon']");
            if (favicon) favicon.href = "website/matt.png";
    
            nameElements.forEach(element => {
                element.textContent = element.textContent.replace(/Sophie/g, "Matt");
            });
        }, 500);
    }

    function resetMatt() {
        matt = false;
        profilePictures.forEach(img => img.src = "website/sophie.png");
        whitesoapphia.forEach(img => img.src = "website/whsoapphia.png");
        soapphias.forEach(img => img.src = "website/soapphia.png");

        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) favicon.href = "website/sophie.png";

        nameElements.forEach(element => {
            element.textContent = element.textContent.replace(/Matt/g, "Sophie");
        });
    }

    const mattButton = document.getElementById("matt");
    if (mattButton) {
        mattButton.addEventListener("click", () => {
            matt ? resetMatt() : mattstart();
        });
    }
});
