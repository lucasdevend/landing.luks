// =========================================================
// LUCAS COSTA — PORTFÓLIO
// Interações em JavaScript puro
// =========================================================

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

// Header compacto ao rolar
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// Menu mobile
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  nav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

// Reveal no scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

document.querySelectorAll(".reveal, .skills-panel").forEach(el => {
  revealObserver.observe(el);
});

// Contadores no hero
const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.counter);
    const duration = target > 100 ? 1100 : 700;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(animate);
    observer.unobserve(el);
  });
}, { threshold: .6 });

counters.forEach(counter => counterObserver.observe(counter));

// Glow acompanha o mouse em desktop
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.animate(
      {
        left: `${event.clientX - 210}px`,
        top: `${event.clientY - 210}px`
      },
      {
        duration: 900,
        fill: "forwards",
        easing: "cubic-bezier(.2,.7,.2,1)"
      }
    );
  });
}

// Efeito de tilt suave nos cards
const tiltCards = document.querySelectorAll(".tilt-card");

if (window.matchMedia("(pointer:fine)").matches) {
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - .5) * 5;
      const rotateX = -((y / rect.height) - .5) * 5;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

// Parallax discreto do hero
const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    const moveX = (event.clientX / window.innerWidth - .5) * 10;
    const moveY = (event.clientY / window.innerHeight - .5) * 10;

    heroVisual.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
}
