// Sidebar Section
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1025) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Hero Section
const words = ["Design", "Create", "Build", "Grow", "Launch", "Innovate", "Imagine", "Develop", "Thrive"];
let index = 0;
let charIndex = 0;
let currentWord = words[index];
let isDeleting = false;
const wordElement = document.getElementById('changing-word');

function typeEffect() {
    wordElement.textContent = currentWord.substring(0, charIndex);

    let typingSpeed = isDeleting ? 150 : 250;  // Typing or deleting speed
    let pauseAfterTyping = 3000;  // Pause after typing full word

    if (!isDeleting && charIndex === currentWord.length) {
        // Word typed fully, pause then start deleting
        setTimeout(() => {
            isDeleting = true;
            typeEffect();  // Start deleting after pause
        }, pauseAfterTyping);
        return;
    }

    if (isDeleting && charIndex === 0) {
        // Word deleted fully, move to next word and start typing immediately (no pause)
        index = (index + 1) % words.length;
        currentWord = words[index];
        isDeleting = false;
        typeEffect();  // Immediate next typing
        return;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeEffect, typingSpeed);
}

typeEffect();
