/**
 * Terminal Typing Engine
 * Creates a terminal typing effect cycling through roles on the Welcome screen.
 */

const ROLES = [
  "Software Developer",
  "Frontend Engineer",
  "Creative Tech Builder",
  "UI/UX Specialist"
];

let targetEl = null;
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let timeoutId = null;
let isRunning = false;

function tick() {
  if (!targetEl) return;

  const currentRole = ROLES[currentRoleIndex];

  if (isDeleting) {
    currentCharIndex--;
    targetEl.textContent = currentRole.substring(0, currentCharIndex);
  } else {
    currentCharIndex++;
    targetEl.textContent = currentRole.substring(0, currentCharIndex);
  }

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && currentCharIndex === currentRole.length) {
    // Finished typing current role, pause before backspacing
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    // Finished deleting, move to next role
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % ROLES.length;
    delay = 450;
  }

  timeoutId = setTimeout(tick, delay);
}

export function initTypingTerminal() {
  targetEl = document.getElementById('welcome-typewriter');
  if (!targetEl) return;

  if (!isRunning) {
    isRunning = true;
    currentRoleIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    tick();
  }
}

export function restartTypingTerminal() {
  if (timeoutId) clearTimeout(timeoutId);
  targetEl = document.getElementById('welcome-typewriter');
  if (!targetEl) return;

  currentCharIndex = 0;
  isDeleting = false;
  targetEl.textContent = '';
  tick();
}
