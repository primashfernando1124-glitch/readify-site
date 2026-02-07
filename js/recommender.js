import { BOOKS } from "./data.js";
import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll, registerServiceWorker
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const rGenre = document.getElementById("rGenre");
const rLength = document.getElementById("rLength");
const pickBtn = document.getElementById("pickBtn");
const againBtn = document.getElementById("againBtn");
const saveBtn = document.getElementById("saveBtn");

const recCard = document.getElementById("recCard");
const recImg = document.getElementById("recImg");
const recTitle = document.getElementById("recTitle");
const recMeta = document.getElementById("recMeta");
const recSyn = document.getElementById("recSyn");
const rHint = document.getElementById("rHint");
const listUl = document.getElementById("listUl");

let current = null;

function listIds() {
  return getLS(LS_KEYS.readingList, []);
}
function setListIds(ids) {
  setLS(LS_KEYS.readingList, ids);
}

function filteredBooks() {
  const g = rGenre.value;
  const l = rLength.value;
  return BOOKS.filter(b => (g === "All" || b.genre === g) && (l === "All" || b.length === l));
}

function pickRandom(arr) {
  if (!arr.length) return null;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function renderRecommendation(book) {
  if (!book) {
    current = null;
    recTitle.textContent = "No match found";
    recMeta.textContent = "Try different filters.";
    recSyn.textContent = "—";
    rHint.textContent = "No books match your filters.";
    return;
  }

  current = book;
  recImg.src = book.cover;
  recImg.alt = `${book.title} cover`;
  recTitle.textContent = book.title;
  recMeta.textContent = `${book.author} • ${book.genre} • ${book.length}`;
  recSyn.textContent = book.synopsis;

  // click animation
  recCard.classList.remove("pulse");
  void recCard.offsetWidth;
  recCard.classList.add("pulse");

  rHint.textContent = "Tip: Save it to your reading list (localStorage).";
}

function renderList() {
  const ids = listIds();
  const titles = ids.map(id => BOOKS.find(b => b.id === id)?.title).filter(Boolean);

  listUl.innerHTML = "";
  if (!titles.length) {
    const li = document.createElement("li");
    li.textContent = "No saved books yet.";
    listUl.appendChild(li);
    return;
  }
  titles.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    listUl.appendChild(li);
  });
}

pickBtn.addEventListener("click", () => {
  const arr = filteredBooks();
  renderRecommendation(pickRandom(arr));
});

againBtn.addEventListener("click", () => {
  const arr = filteredBooks().filter(b => !current || b.id !== current.id);
  renderRecommendation(pickRandom(arr.length ? arr : filteredBooks()));
});

saveBtn.addEventListener("click", () => {
  if (!current) {
    toast("No book", "Pick a recommendation first.");
    return;
  }
  const ids = listIds();
  if (ids.includes(current.id)) {
    toast("Already saved", "That book is already in your list.");
    return;
  }
  ids.push(current.id);
  setListIds(ids);
  renderList();
  toast("Saved", "Added to reading list.");
});

renderList();