/**
 * Magnetic Effects Module
 * Applies subtle magnetic pull on CTA buttons, exit controls, and pills.
 * As the user hovers, elements smoothly gravitate toward the cursor coordinates.
 */

const MAGNETIC_SELECTOR = '.contactSubmit, .exitAnim, .glass-pill, #github-profile-link';
const MAX_DISPLACEMENT = 12; // Maximum pixel displacement
const PULL_FACTOR = 0.28;     // Magnetic attraction strength

let activeMagneticEl = null;

export function initMagneticEffects() {
  if (window.self !== window.top) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(max-width: 1024px)').matches) return;

  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(MAGNETIC_SELECTOR);
    if (el) {
      activeMagneticEl = el;
      if (!el.classList.contains('magnetic-target')) {
        el.classList.add('magnetic-target');
      }
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!activeMagneticEl) return;

    const rect = activeMagneticEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * PULL_FACTOR;
    const deltaY = (e.clientY - centerY) * PULL_FACTOR;

    const clampedX = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, deltaX));
    const clampedY = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, deltaY));

    activeMagneticEl.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest(MAGNETIC_SELECTOR);
    if (el) {
      el.style.transform = '';
      if (activeMagneticEl === el) {
        activeMagneticEl = null;
      }
    }
  });
}
