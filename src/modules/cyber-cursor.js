/**
 * Cyber Cursor Module
 * Renders a dual-layer cyber cursor: pinpoint neon dot + smooth trailing aura ring.
 * Features:
 * - Smooth lerp tracking on requestAnimationFrame
 * - Interactive hover expansion on links, buttons, interactive cards
 * - Click shockwave burst
 * - Event-delegated hover detection (works with dynamic content/scenes)
 * - Auto-disabled on mobile / touch viewports
 */

let dot = null;
let ring = null;
let isMoving = false;

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let dotX = -100;
let dotY = -100;

let rafId = null;

const INTERACTIVE_SELECTOR = 'a, button, .link, .clickAnimations, .project-preview-window, .exitAnim, .glass-card, .glass-pill, .os-card, .repo-card, .contactSubmit, input, textarea';

function createCursorElements() {
  dot = document.createElement('div');
  dot.classList.add('cyber-cursor-dot');

  ring = document.createElement('div');
  ring.classList.add('cyber-cursor-ring');

  document.body.appendChild(dot);
  document.body.appendChild(ring);
}

function spawnBurst(x, y) {
  const burst = document.createElement('div');
  burst.classList.add('cyber-cursor-burst');
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  document.body.appendChild(burst);

  setTimeout(() => {
    if (burst && burst.parentNode) {
      burst.parentNode.removeChild(burst);
    }
  }, 400);
}

function renderLoop() {
  // Smooth linear interpolation for trailing ring
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  // Snappier interpolation for pinpoint dot
  dotX += (mouseX - dotX) * 0.65;
  dotY += (mouseY - dotY) * 0.65;

  if (ring && dot) {
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
  }

  rafId = requestAnimationFrame(renderLoop);
}

export function initCyberCursor() {
  if (window.self !== window.top) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(max-width: 1024px)').matches) return;

  createCursorElements();

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      ringX = mouseX;
      ringY = mouseY;
      dotX = mouseX;
      dotY = mouseY;
      dot.classList.add('visible');
      ring.classList.add('visible');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    if (dot && ring) {
      dot.classList.remove('visible');
      ring.classList.remove('visible');
      isMoving = false;
    }
  });

  document.addEventListener('mouseenter', () => {
    if (dot && ring && mouseX > 0 && mouseY > 0) {
      dot.classList.add('visible');
      ring.classList.add('visible');
      isMoving = true;
    }
  });

  // Interactive Hover Detection using Event Delegation
  document.addEventListener('mouseover', (e) => {
    if (!ring || !dot) return;
    const target = e.target.closest(INTERACTIVE_SELECTOR);
    if (target) {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (!ring || !dot) return;
    const target = e.target.closest(INTERACTIVE_SELECTOR);
    if (target) {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  });

  // Click Shockwave Burst
  window.addEventListener('pointerdown', (e) => {
    spawnBurst(e.clientX, e.clientY);
  }, { passive: true });

  rafId = requestAnimationFrame(renderLoop);
}
