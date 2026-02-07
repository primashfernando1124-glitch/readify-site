import {
  LS_KEYS, getLS, setLS, toast,
  setActiveNav, setupMobileNav, setupRevealOnScroll, registerServiceWorker
} from "./utils.js";

setActiveNav();
setupMobileNav();
setupRevealOnScroll();
registerServiceWorker();

const player = document.getElementById("player");
const soundHint = document.getElementById("soundHint");

// Remote MP3 URLs (no local mp3 files needed)
const sounds = {
  rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  cafe: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  fire: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
};

function playSound(key) {
  const src = sounds[key];
  player.src = src;
  player.loop = true;

  player.play().then(() => {
    soundHint.textContent = `Playing: ${key} (remote mp3)`;
    toast("Sound On", `Now playing: ${key}`);
  }).catch(() => {
    soundHint.textContent = `Cannot play audio. Browser may block autoplay. Click again or try another sound.`;
    toast("Audio blocked", "Try clicking the button again.");
  });
}

function stopSound() {
  player.pause();
  player.currentTime = 0;
  player.src = "";
  soundHint.textContent = "Stopped.";
  toast("Sound Off", "Audio stopped.");
}

document.getElementById("rainBtn").addEventListener("click", () => playSound("rain"));
document.getElementById("cafeBtn").addEventListener("click", () => playSound("cafe"));
document.getElementById("fireBtn").addEventListener("click", () => playSound("fire"));
document.getElementById("stopBtn").addEventListener("click", stopSound);

// Completed books
const doneForm = document.getElementById("doneForm");
const doneTitle = document.getElementById("doneTitle");
const doneUl = document.getElementById("doneUl");
const clearDoneBtn = document.getElementById("clearDoneBtn");

function getDone() {
  return getLS(LS_KEYS.completed, []);
}
function setDone(arr) {
  setLS(LS_KEYS.completed, arr);
}

function renderDone() {
  const arr = getDone();
  doneUl.innerHTML = "";
  if (!arr.length) {
    const li = document.createElement("li");
    li.textContent = "No completed books yet.";
    doneUl.appendChild(li);
    return;
  }
  arr.forEach((t, i) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.gap = "10px";
    li.innerHTML = `<span>${t}</span> <button class="btn danger" type="button" data-i="${i}">Remove</button>`;
    doneUl.appendChild(li);
  });

  doneUl.querySelectorAll("button[data-i]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-i"));
      const next = getDone().filter((_, j) => j !== idx);
      setDone(next);
      renderDone();
      toast("Removed", "Removed from completed list.");
    });
  });
}

doneForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = doneTitle.value.trim();
  if (!t) {
    toast("Missing", "Please enter a book title.");
    return;
  }
  const arr = getDone();
  arr.unshift(t);
  setDone(arr);
  doneTitle.value = "";
  renderDone();
  toast("Nice!", "Added to completed books.");
});

clearDoneBtn.addEventListener("click", () => {
  setDone([]);
  renderDone();
  toast("Cleared", "Completed list cleared.");
});

renderDone();