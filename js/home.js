import { HOME_QUOTES, AUTHORS, BOOKS } from "./data.js";
import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll,
  registerServiceWorker, formatDate
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const quoteText = document.getElementById("quoteText");
const quoteMeta = document.getElementById("quoteMeta");
const todayDate = document.getElementById("todayDate");

const kpiBooks = document.getElementById("kpiBooks");
const kpiSaved = document.getElementById("kpiSaved");
const kpiDone = document.getElementById("kpiDone");

todayDate.textContent = formatDate(new Date());

kpiBooks.textContent = BOOKS.length;

function updateKPIs() {
  const list = getLS(LS_KEYS.readingList, []);
  const done = getLS(LS_KEYS.completed, []);
  kpiSaved.textContent = list.length;
  kpiDone.textContent = done.length;
}
updateKPIs();

let qi = 0;
function showQuote(i) {
  const q = HOME_QUOTES[i % HOME_QUOTES.length];
  quoteText.textContent = `“${q.text}”`;
  quoteMeta.textContent = `— ${q.from}`;
  const host = quoteText.closest(".hero-quote");
  host.classList.remove("pulse");
  void host.offsetWidth; // restart animation
  host.classList.add("pulse");
}
showQuote(qi);
setInterval(() => { qi++; showQuote(qi); }, 3500);

// Author of the Day (date-based)
function authorOfTheDay(date = new Date()) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const idx = seed % AUTHORS.length;
  return AUTHORS[idx];
}

const a = authorOfTheDay();
document.getElementById("authorName").textContent = a.name;
document.getElementById("authorBio").textContent = a.bio;
document.getElementById("authorFact").textContent = `Fun fact: ${a.funFact}`;

// Smooth scroll to author section
document.getElementById("scrollBtn").addEventListener("click", () => {
  document.querySelector("section.section").scrollIntoView({ behavior: "smooth" });
});

// Newsletter localStorage
const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const hint = document.getElementById("newsletterHint");

function loadExisting() {
  const emails = getLS(LS_KEYS.newsletter, []);
  if (emails.length) hint.textContent = `Saved emails: ${emails.length}`;
}
loadExisting();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast("Invalid Email", "Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  const emails = getLS(LS_KEYS.newsletter, []);
  if (!emails.includes(email)) emails.push(email);
  setLS(LS_KEYS.newsletter, emails);

  emailInput.value = "";
  hint.textContent = `Saved emails: ${emails.length}`;
  toast("Subscribed!", "Your email was saved in localStorage.");
});