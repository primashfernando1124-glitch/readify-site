import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll, registerServiceWorker
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const form = document.getElementById("fbForm");
const fbName = document.getElementById("fbName");
const fbEmail = document.getElementById("fbEmail");
const fbMsg = document.getElementById("fbMsg");
const fbHint = document.getElementById("fbHint");
const fbCount = document.getElementById("fbCount");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function allFeedback() {
  return getLS(LS_KEYS.feedback, []);
}

function setFeedback(arr) {
  setLS(LS_KEYS.feedback, arr);
}

function updateCount() {
  fbCount.textContent = `${allFeedback().length} message(s) saved.`;
}
updateCount();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = fbName.value.trim();
  const email = fbEmail.value.trim();
  const msg = fbMsg.value.trim();

  if (name.length < 2) {
    toast("Invalid name", "Name should be at least 2 characters.");
    fbName.focus();
    return;
  }
  if (!isValidEmail(email)) {
    toast("Invalid email", "Enter a valid email address.");
    fbEmail.focus();
    return;
  }
  if (msg.length < 10) {
    toast("Message too short", "Message should be at least 10 characters.");
    fbMsg.focus();
    return;
  }

  const payload = {
    name, email, msg,
    createdAt: new Date().toISOString()
  };

  const arr = allFeedback();
  arr.unshift(payload);
  setFeedback(arr);

  fbName.value = "";
  fbEmail.value = "";
  fbMsg.value = "";

  fbHint.textContent = "✅ Thanks! Your feedback was saved locally.";
  toast("Submitted", "Feedback saved to localStorage.");
  updateCount();
});

// FAQ accordion
const faq = document.getElementById("faq");
faq.addEventListener("click", (e) => {
  const header = e.target.closest(".acc-q");
  if (!header) return;
  const item = header.closest(".acc-item");
  item.classList.toggle("open");
});