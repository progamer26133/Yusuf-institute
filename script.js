const yearElement = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const quoteText = document.getElementById("quoteText");
const nextQuoteBtn = document.getElementById("nextQuoteBtn");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const quotes = [
  "“Education is not the filling of a pail, but the lighting of a fire.”",
  "“A teacher affects eternity; no one can tell where influence stops.”",
  "“Small daily progress is the secret of big academic success.”",
  "“Learning never exhausts the mind, it only expands its power.”",
];

let quoteIndex = 0;

function setYear() {
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

function initMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

function initTheme() {
  const saved = localStorage.getItem("aves-demo-theme");
  if (saved === "dark") document.body.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("aves-demo-theme", theme);
  });
}

function initBackToTop() {
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 350);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initQuoteRotator() {
  if (!quoteText || !nextQuoteBtn) return;

  const showNextQuote = () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.textContent = quotes[quoteIndex];
  };

  nextQuoteBtn.addEventListener("click", showNextQuote);
  setInterval(showNextQuote, 6000);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  const runCounters = () => {
    if (hasAnimated) return;

    const triggerElement = document.querySelector("#about");
    if (!triggerElement) return;

    const top = triggerElement.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.78) return;

    hasAnimated = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 70));

      const timer = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(timer);
        }
        counter.textContent = value.toLocaleString();
      }, 20);
    });
  };

  window.addEventListener("scroll", runCounters);
  runCounters();
}

function initRevealOnScroll() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initActiveNav() {
  const sections = [...document.querySelectorAll("main section")];
  const links = [...document.querySelectorAll(".nav-links a")];

  const onScroll = () => {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

function initContactForm() {
  if (!contactForm || !formStatus) return;

  const fields = ["name", "email", "message"].map((id) => document.getElementById(id));

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    fields.forEach((field) => {
      if (!field) return;
      const isFieldValid = field.value.trim().length > 0;
      field.classList.toggle("invalid", !isFieldValid);
      if (!isFieldValid) valid = false;
    });

    const emailField = document.getElementById("email");
    if (emailField) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
      emailField.classList.toggle("invalid", !emailOk);
      if (!emailOk) valid = false;
    }

    if (!valid) {
      formStatus.textContent = "Please fill all fields with valid information.";
      formStatus.style.color = "#dc2626";
      return;
    }

    formStatus.textContent = "✅ Demo submitted! In real website, this will send to Yusuf Areeb.";
    formStatus.style.color = "#16a34a";
    contactForm.reset();
  });
}

setYear();
initMenu();
initTheme();
initBackToTop();
initQuoteRotator();
initCounterAnimation();
initRevealOnScroll();
initActiveNav();
initContactForm();
