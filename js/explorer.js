import { BOOKS } from "./data.js";
import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll, registerServiceWorker,
  $, $all
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const grid = $("#booksGrid");
const search = $("#search");
const genre = $("#genre");
const clearBtn = $("#clearBtn");
const countHint = $("#countHint");

const modal = $("#modal");
const modalClose = $("#modalClose");

const mTitle = $("#mTitle");
const mMeta = $("#mMeta");
const mSynopsis = $("#mSynopsis");
const mPrequels = $("#mPrequels");
const mSequels = $("#mSequels");
const mReviews = $("#mReviews");
const saveBtn = $("#saveToListBtn");
const removeBtn = $("#removeFromListBtn");
const mListHint = $("#mListHint");

let currentBook = null;

function readingList() {
  return getLS(LS_KEYS.readingList, []);
}

function setReadingList(list) {
  setLS(LS_KEYS.readingList, list);
}

function renderBooks(list) {
  grid.innerHTML = "";
  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${book.title}`);
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title} cover">
      <h3>${book.title}</h3>
      <p>${book.author} • <span style="color:var(--accent)">${book.genre}</span></p>
    `;
    card.addEventListener("click", () => openModal(book));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(book);
    });
    grid.appendChild(card);
  });
  countHint.textContent = `Showing ${list.length} of ${BOOKS.length} books.`;
}

function applyFilters() {
  const q = search.value.trim().toLowerCase();
  const g = genre.value;

  const filtered = BOOKS.filter(b => {
    const matchesQ =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    const matchesG = (g === "All") || (b.genre === g);
    return matchesQ && matchesG;
  });

  renderBooks(filtered);
}

search.addEventListener("input", applyFilters);
genre.addEventListener("change", applyFilters);
clearBtn.addEventListener("click", () => {
  search.value = "";
  genre.value = "All";
  applyFilters();
});

function fillList(ul, items) {
  ul.innerHTML = "";
  if (!items || !items.length) {
    const li = document.createElement("li");
    li.textContent = "None";
    ul.appendChild(li);
    return;
  }
  items.forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    ul.appendChild(li);
  });
}

function fillReviews(rows) {
  mReviews.innerHTML = "";
  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.source}</td><td>${r.rating}</td><td>${r.comment}</td>`;
    mReviews.appendChild(tr);
  });
}

function updateListButtons(bookId) {
  const list = readingList();
  const inList = list.includes(bookId);
  saveBtn.disabled = inList;
  removeBtn.disabled = !inList;
  mListHint.textContent = inList
    ? "This book is already in your reading list (localStorage)."
    : "Not in your list yet.";
}

function openModal(book) {
  currentBook = book;
  mTitle.textContent = book.title;
  mMeta.textContent = `${book.author} • ${book.genre} • ${book.length}`;
  mSynopsis.textContent = book.synopsis;

  fillList(mPrequels, book.prequels);
  fillList(mSequels, book.sequels);
  fillReviews(book.reviews);

  updateListButtons(book.id);

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  currentBook = null;
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

saveBtn.addEventListener("click", () => {
  if (!currentBook) return;
  const list = readingList();
  if (!list.includes(currentBook.id)) list.push(currentBook.id);
  setReadingList(list);
  updateListButtons(currentBook.id);
  toast("Saved", "Added to your reading list.");
});

removeBtn.addEventListener("click", () => {
  if (!currentBook) return;
  const list = readingList().filter(id => id !== currentBook.id);
  setReadingList(list);
  updateListButtons(currentBook.id);
  toast("Removed", "Removed from your reading list.");
});

// initial render
applyFilters();