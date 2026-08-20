/* =====================================================================
   EDIT ME FIRST — all the content lives in these arrays.
   Add, remove, or rewrite entries freely; the page rebuilds itself
   from whatever is here.
===================================================================== */

// ---- PHOTOS -----------------------------------------------------------
// Put image files in the /images folder, then list them here.
// `src`     -> "images/yourfile.jpg"
// `caption` -> one line under the photo (handwritten-style font)
// Add as many objects as you want — the grid grows automatically.
const photos = [
  { src: "images/photo1.jpg", caption: "EDIT: write the caption for this one" },
  { src: "images/photo2.jpg", caption: "EDIT: write the caption for this one" },
  { src: "images/photo3.jpg", caption: "EDIT: write the caption for this one" },
  { src: "images/photo4.jpg", caption: "EDIT: write the caption for this one" },
  { src: "images/photo5.jpg", caption: "EDIT: write the caption for this one" },
  { src: "images/photo6.jpg", caption: "EDIT: write the caption for this one" },
  // { src: "images/photo7.jpg", caption: "add more anytime, just copy this line" },
];

// ---- TIMELINE (the "our story" section) --------------------------------
// One entry per month (or per memory — add as many as you like).
const timeline = [
  { month: "Month 1", text: "EDIT: how it started — the first date, the first text, whatever kicked this off." },
  { month: "Month 2", text: "EDIT: a memory from month two." },
  { month: "Month 3", text: "EDIT: a memory from month three." },
  { month: "Month 4", text: "EDIT: a memory from month four." },
  { month: "Month 5", text: "EDIT: a memory from month five." },
  { month: "Month 6", text: "EDIT: today — six months in, and still here." },
];

// ---- REASONS (flip cards) ---------------------------------------------
// `front` is what's always visible; `back` is what's revealed on tap.
// Make these specific to her, not generic — that's what makes them land.
const reasons = [
  { front: "Hot chocolate, every time", back: "EDIT: the real reason — maybe how you always order two, or she always finishes yours." },
  { front: "The Shagun regulars", back: "EDIT: what's actually true about your spot together." },
  { front: "The nickname, Ojo", back: "EDIT: why you started calling her that, or what it means to you now." },
  { front: "The way you laugh", back: "EDIT: something specific and true, not a compliment card." },
  { front: "Six months, still counting", back: "EDIT: what you're looking forward to next." },
  { front: "One more reason", back: "EDIT: add as many of these cards as you want in the `reasons` array." },
];

// ---- SURPRISE MESSAGES ---------------------------------------------
// Shown one at a time (randomly) when the confetti button is pressed.
const surprises = [
  "EDIT: message #1 — something sweet, silly, or true.",
  "EDIT: message #2 — the button can cycle through a few of these.",
  "EDIT: message #3 — add or remove as many as you like.",
];

/* =====================================================================
   Below this line is just the machinery that renders the arrays above
   and wires up the interactions. You don't need to touch it — but
   nothing here is locked, feel free to poke around.
===================================================================== */

// ---- render: photo gallery ---------------------------------------------
const photoGrid = document.getElementById("photoGrid");
photos.forEach((p) => {
  const frame = document.createElement("figure");
  frame.className = "photo-frame";

  const imgWrap = document.createElement("div");
  imgWrap.className = "img-wrap";

  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.caption || "a photo of us";
  img.loading = "lazy";
  img.onerror = () => {
    imgWrap.innerHTML = `<div class="photo-placeholder">
        <span class="icon">🖼️</span>
        add "${p.src.split("/").pop()}"<br>to /images
      </div>`;
  };

  imgWrap.appendChild(img);
  frame.appendChild(imgWrap);

  const caption = document.createElement("figcaption");
  caption.className = "photo-caption";
  caption.textContent = p.caption;
  frame.appendChild(caption);

  photoGrid.appendChild(frame);
});

// ---- render: timeline ---------------------------------------------------
const timelineList = document.getElementById("timelineList");
timeline.forEach((t) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="t-month">${t.month}</span><p class="t-text">${t.text}</p>`;
  timelineList.appendChild(li);
});

// ---- render: reason flip cards -------------------------------------------
const reasonGrid = document.getElementById("reasonGrid");
reasons.forEach((r, i) => {
  const card = document.createElement("div");
  card.className = "flip-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Reason ${i + 1}: ${r.front}. Press to flip.`);
  card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-face flip-card-front">
        <span class="num">0${i + 1}</span>
        <span>${r.front}</span>
      </div>
      <div class="flip-card-face flip-card-back">
        <span>${r.back}</span>
      </div>
    </div>`;
  const toggle = () => card.classList.toggle("flipped");
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
  reasonGrid.appendChild(card);
});

// ---- cursor eye: pupil tracks the mouse, blinks occasionally ------------
const cursorEye = document.getElementById("cursorEye");
const eyePupil = document.getElementById("eyePupil");

document.addEventListener("mousemove", (e) => {
  if (!cursorEye) return;
  const rect = cursorEye.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
  const dist = 5; // how far the pupil can drift
  const px = 50 + Math.cos(angle) * dist;
  const py = 30 + Math.sin(angle) * dist * 0.6;
  eyePupil.setAttribute("cx", px);
  eyePupil.setAttribute("cy", py);
});

function scheduleBlink() {
  const delay = 2200 + Math.random() * 3500;
  setTimeout(() => {
    cursorEye.classList.add("blink");
    setTimeout(() => cursorEye.classList.remove("blink"), 320);
    scheduleBlink();
  }, delay);
}
if (cursorEye) scheduleBlink();

// ---- secret note eye button ----------------------------------------------
const secretEyeBtn = document.getElementById("secretEyeBtn");
const secretNote = document.getElementById("secretNote");
secretEyeBtn.addEventListener("click", () => {
  const isHidden = secretNote.hidden;
  secretNote.hidden = !isHidden;
  secretEyeBtn.setAttribute("aria-expanded", String(isHidden));
  if (isHidden) {
    secretNote.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// ---- scroll cue button ----------------------------------------------------
document.getElementById("scrollDown").addEventListener("click", () => {
  document.getElementById("story").scrollIntoView({ behavior: "smooth" });
});

// ---- surprise button: confetti + random message ---------------------------
const confettiLayer = document.getElementById("confettiLayer");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");
const emojiSet = ["💛", "🍫", "✨", "☕", "🤎", "👀"];

function burstConfetti() {
  const count = 26;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDuration = 2.4 + Math.random() * 1.8 + "s";
    piece.style.fontSize = 1 + Math.random() * 1.2 + "rem";
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

let lastSurpriseIndex = -1;
surpriseBtn.addEventListener("click", () => {
  burstConfetti();
  let idx = Math.floor(Math.random() * surprises.length);
  if (surprises.length > 1 && idx === lastSurpriseIndex) {
    idx = (idx + 1) % surprises.length;
  }
  lastSurpriseIndex = idx;
  surpriseMessage.textContent = surprises[idx];
  surpriseMessage.hidden = false;
});
