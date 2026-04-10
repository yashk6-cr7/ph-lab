// ── ASSETS ────────────────────────────────────────────────
let bgImage;
let clickSound;

// ── LAYOUT CONSTANTS (design was built at this size) ──────
const BASE_W = 1200;
const BASE_H = 800;

// ── RUNTIME STATE ─────────────────────────────────────────
let sf;        // scaleFactor — all sizes multiply by this
let buttons = [];

const buttonLabels = [
  "Magic Liquids: Acid or Base?",
  "How is it acidic or basic?",
  "Mix and Change! Can We Flip It?"
];

const buttonColors = ["#4da6ff", "#ffd633", "#66cc66"];

const buttonLinks = [
  "https://parthmevada2307.github.io/Sim1/",
  "https://parthmevada2307.github.io/Sim2/",
  "https://parthmevada2307.github.io/Sim3/"
];

// ── PRELOAD ───────────────────────────────────────────────
function preload() {
  bgImage = loadImage("bg.jpg");
  clickSound = loadSound("mixkit-sci-fi-click-900.wav");
}

// ── SETUP ─────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");
  textFont("Helvetica");
  buildButtons();
}

// ── BUILD BUTTONS (called on setup + every resize) ────────
function buildButtons() {
  sf = min(width / BASE_W, height / BASE_H); // uniform scale factor

  buttons = [];

  let btnW    = 500 * sf;
  let btnH    = 70  * sf;
  let spacing = 50  * sf;
  let startY  = 320 * sf;

  for (let i = 0; i < 3; i++) {
    buttons.push({
      x:     width / 2 - btnW / 2,
      y:     startY + i * (btnH + spacing),
      w:     btnW,
      h:     btnH,
      label: buttonLabels[i],
      color: buttonColors[i],
      link:  buttonLinks[i]
    });
  }
}

// ── DRAW ──────────────────────────────────────────────────
function draw() {
  // Background image stretched to fill canvas
  if (bgImage) {
    image(bgImage, 0, 0, width, height);
  } else {
    background(30);
  }

  // Dark overlay
  fill(0, 180);
  noStroke();
  rect(0, 0, width, height);

  // Title
  fill(255);
  textAlign(CENTER, TOP);
  textSize(48 * sf);
  text("pH Scale Simulation", width / 2, 87 * sf);

  // Subtitle
  fill(255);
  textSize(22 * sf);
  textStyle(BOLD);
  text(
    "Learn about the pH scale by mixing liquids and testing them with litmus paper.",
    width / 2,
    170 * sf
  );
  textStyle(NORMAL);

  // Buttons
  for (let btn of buttons) {
    drawButton(btn);
  }
}

// ── DRAW A SINGLE BUTTON ──────────────────────────────────
function drawButton(btn) {
  noStroke();
  fill(btn.color);
  rect(btn.x, btn.y, btn.w, btn.h, 20 * sf);

  fill(0);
  textSize(18 * sf);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// ── INPUT: works for mouse AND touch ─────────────────────
function mousePressed() {
  handleInput(mouseX, mouseY);
}

function touchStarted() {
  if (touches.length > 0) {
    handleInput(touches[0].x, touches[0].y);
  }
  return false; // stops the page from scrolling on tap
}

function handleInput(x, y) {
  for (let btn of buttons) {
    if (x > btn.x && x < btn.x + btn.w &&
        y > btn.y && y < btn.y + btn.h) {
      playClickSound();
      window.open(btn.link, "_blank");
    }
  }
}

// ── SOUND ─────────────────────────────────────────────────
function playClickSound() {
  if (clickSound && clickSound.isLoaded()) {
    if (clickSound.isPlaying()) clickSound.stop();
    clickSound.play();
  }
}

// ── RESIZE ────────────────────────────────────────────────
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildButtons(); // recalculate all positions at new size
}
