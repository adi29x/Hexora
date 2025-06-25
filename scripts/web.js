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
