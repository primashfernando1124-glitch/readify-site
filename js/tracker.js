import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll, registerServiceWorker,
  clamp, formatDate
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const form = document.getElementById("trackerForm");
const bookName = document.getElementById("bookName");
const totalPages = document.getElementById("totalPages");
const pagesRead = document.getElementById("pagesRead");
const speed = document.getElementById("speed");

const progressFill = document.getElementById("progressFill");
const percentText = document.getElementById("percentText");
const finishText = document.getElementById("finishText");
const remainingText = document.getElementById("remainingText");

const saveBtn = document.getElementById("saveProgressBtn");
const clearBtn = document.getElementById("clearSavedBtn");
const savedHint = document.getElementById("savedHint");

let lastCalc = null;

function calc() {
  const t = Number(totalPages.value);
  const r = Number(pagesRead.value);
  const s = Number(speed.value);

  if (!t || t <= 0) return { ok:false, msg:"Total pages must be > 0" };
  if (r < 0) return { ok:false, msg:"Pages read cannot be negative" };
  if (r > t) return { ok:false, msg:"Pages read cannot exceed total pages" };
  if (!s || s <= 0) return { ok:false, msg:"Daily speed must be > 0" };

  const pct = clamp((r / t) * 100, 0, 100);
  const remaining = t - r;

  const daysLeft = remaining === 0 ? 0 : Math.ceil(remaining / s);
  const finish = new Date();
  finish.setDate(finish.getDate() + daysLeft);

  return {
    ok:true,
    book: bookName.value.trim(),
    total: t,
    read: r,
    speed: s,
    pct,
    remaining,
    daysLeft,
    finishDate: finish
  };
}

function render(result) {
  progressFill.style.width = `${result.pct.toFixed(1)}%`;
  percentText.textContent = `${result.pct.toFixed(1)}%`;
  remainingText.textContent = `Remaining pages: ${result.remaining} (≈ ${result.daysLeft} day(s))`;
  finishText.textContent = `Estimated finish: ${formatDate(result.finishDate)}`;

  const wrap = progressFill.closest(".card");
  wrap.classList.remove("pulse");
  void wrap.offsetWidth;
  wrap.classList.add("pulse");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = calc();
  if (!result.ok) {
    toast("Check inputs", result.msg);
    return;
  }
  lastCalc = result;
  render(result);
});

function loadSaved() {
  const saved = getLS(LS_KEYS.progress, null);
  if (!saved) {
    savedHint.textContent = "No saved progress yet.";
    return;
  }
  savedHint.textContent = `Saved progress found for "${saved.book || "Unnamed Book"}".`;
  bookName.value = saved.book || "";
  totalPages.value = saved.total;
  pagesRead.value = saved.read;
  speed.value = saved.speed;
  lastCalc = saved;
  render({ ...saved, finishDate: new Date(saved.finishDate) });
}

saveBtn.addEventListener("click", () => {
  const result = calc();
  if (!result.ok) {
    toast("Cannot save", result.msg);
    return;
  }
  // store finishDate as ISO string
  const payload = { ...result, finishDate: result.finishDate.toISOString() };
  setLS(LS_KEYS.progress, payload);
  toast("Saved", "Progress saved to localStorage.");
  loadSaved();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(LS_KEYS.progress);
  toast("Cleared", "Saved progress removed.");
  savedHint.textContent = "No saved progress yet.";
});

// Load saved on start
loadSaved();