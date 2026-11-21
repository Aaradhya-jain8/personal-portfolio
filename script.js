const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const themeToggle = document.getElementById("themeToggle");
const scoreElements = document.querySelectorAll(".edu-score");

function updatePercentageDisplay(isDark) {
  scoreElements.forEach((el) => {
    if (isDark) {
      el.textContent = "";
    } else {
      el.textContent = el.getAttribute("data-percentage");
    }
  });
}

const savedTheme = localStorage.getItem("aaradhya_theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "Light Mode";
  updatePercentageDisplay(true);
} else {
  updatePercentageDisplay(false);
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("aaradhya_theme", isDark ? "dark" : "light");
  updatePercentageDisplay(isDark);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    skillCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const detailsBox = document.getElementById(targetId);
    detailsBox.classList.toggle("hidden");
    btn.textContent = detailsBox.classList.contains("hidden") ? "Show Details" : "Hide Details";
  });
});

const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");

copyEmailBtn.addEventListener("click", () => {
  const email = document.getElementById("emailText").textContent;
  navigator.clipboard.writeText(email).then(() => {
    copyStatus.textContent = "Email copied to clipboard!";
    setTimeout(() => {
      copyStatus.textContent = "";
    }, 2500);
  });
});

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
  formSuccess.textContent = "";

  let isValid = true;

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your name (at least 2 characters).";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (subjectInput.value.trim().length < 3) {
    subjectError.textContent = "Please enter a subject.";
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent =
      "Thank you, " + nameInput.value.trim() + "! Your message has been received.";
    contactForm.reset();
  }
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    }
  });
});