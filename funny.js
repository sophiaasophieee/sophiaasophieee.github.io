let sixPressed = false;
let ninePressed = false;
let triggered = false;
document.getElementById("after").style.display = "none";

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
            document.getElementById("before").style.display = "none";
            document.getElementById("after").style.display = "flex";
            originalStyles.forEach(({ element, backgroundColor, borderColor }) => {
                element.style.backgroundColor = backgroundColor;
                element.style.borderColor = borderColor;
            });
            overlay.remove();
            
            sessionStorage.setItem('sequenceTriggered', 'true');
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

document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.clear();

    const link = document.getElementById('sixtynine');
    if (link) {
        link.addEventListener('click', e => {
            e.preventDefault();
            triggerSequence();
        });
    }
});
