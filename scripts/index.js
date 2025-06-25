// PreLoader and Reveal Animations
window.addEventListener("load", () => {
  const body = document.body;
  const loader = document.getElementById("loader");

  // 1. Trigger panel split after loading bar fills
  setTimeout(() => {
    loader.classList.add("loaded");
    body.classList.add("loaded"); // enables content
  }, 2000); // bar finishes after 2s

  // 2. Fade out loader completely
  setTimeout(() => {
    loader.classList.add("hide-loader");
    body.style.overflow = "auto";
  }, 2000); // after panels open
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;

  reveals.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < triggerPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const cursor = document.getElementById("cursor");

// Move cursor with mouse
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Detect hoverable elements
const hoverables = document.querySelectorAll("a, button, .hover-target");

hoverables.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Sidebar Section
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  menuToggle.classList.remove("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1025) {
    sidebar.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Hero Section
const words = [
  "Design",
  "Create",
  "Build",
  "Grow",
  "Launch",
  "Innovate",
  "Imagine",
  "Develop",
  "Thrive",
];
let index = 0;
let charIndex = 0;
let currentWord = words[index];
let isDeleting = false;
const wordElement = document.getElementById("changing-word");

function typeEffect() {
  wordElement.textContent = currentWord.substring(0, charIndex);

  let typingSpeed = isDeleting ? 150 : 250; // Typing or deleting speed
  let pauseAfterTyping = 3000; // Pause after typing full word

  if (!isDeleting && charIndex === currentWord.length) {
    // Word typed fully, pause then start deleting
    setTimeout(() => {
      isDeleting = true;
      typeEffect(); // Start deleting after pause
    }, pauseAfterTyping);
    return;
  }

  if (isDeleting && charIndex === 0) {
    // Word deleted fully, move to next word and start typing immediately (no pause)
    index = (index + 1) % words.length;
    currentWord = words[index];
    isDeleting = false;
    typeEffect(); // Immediate next typing
    return;
  }

  charIndex += isDeleting ? -1 : 1;
  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// Feature Section
document.querySelectorAll(".feature-card").forEach((card) => {
  const flipper = card.querySelector(".flipper");

  card.querySelector(".read-more").addEventListener("click", (e) => {
    e.preventDefault();
    flipper.classList.add("flipped");
  });

  card.querySelector(".back-btn").addEventListener("click", (e) => {
    e.preventDefault();
    flipper.classList.remove("flipped");
  });
});

// Contact Form Submission
const form = document.getElementById("quote-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    company: form.company.value,
    phone: form.phone.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxTgiLfHxenVif8N2sW4Sf0gPOY1_4ONehqprJ7sraWEy7vC19nQMq-FU23r5OVCzU57Q/exec",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    alert("Thanks! Your message has been sent.");
    form.reset();
  } else {
    alert("Oops! Something went wrong.");
  }
});
