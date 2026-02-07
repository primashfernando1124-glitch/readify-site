// Reusable utilities used across multiple pages (requirement)

export const LS_KEYS = {
  newsletter: "readify_newsletter_emails",
  progress: "readify_progress",
  readingList: "readify_reading_list",
  completed: "readify_completed_books",
  feedback: "readify_feedback"
};

export function $(sel, root = document) {
  return root.querySelector(sel);
}

export function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

export function safeJSONParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

export function getLS(key, fallback) {
  return safeJSONParse(localStorage.getItem(key), fallback);
}

export function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function toast(title, msg, ms = 2500) {
  const host = document.getElementById("toast");
  if (!host) return;
  host.querySelector(".title").textContent = title;
  host.querySelector(".msg").textContent = msg;
  host.classList.add("show");
  window.clearTimeout(host._t);
  host._t = window.setTimeout(() => host.classList.remove("show"), ms);
}

export function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const target = a.getAttribute("href");
    a.classList.toggle("active", target === path);
  });
}

export function setupMobileNav() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("is-open");
    menu.classList.toggle("show");
  });

  // Close on click
  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      btn.classList.remove("is-open");
      menu.classList.remove("show");
    }
  });
}

export function setupRevealOnScroll() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) en.target.classList.add("show");
    }
  }, { threshold: 0.12 });

  nodes.forEach(n => io.observe(n));
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // silent fail is ok for assignment demo
  });
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function formatDate(d) {
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" }).format(d);
}