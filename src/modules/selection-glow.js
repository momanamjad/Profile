/**
 * Futuristic Selection Glow — Holographic overlay system.
 *
 * Replaces the boring native text selection with custom animated
 * overlay rectangles that track the exact selection geometry.
 * Features: animated gradient, scan-lines, neon edge glow, radial aura.
 *
 * Performance: Uses requestAnimationFrame, pools DOM elements,
 * and only runs while a selection is active.
 */

let fxLayer = null;
let auraEl = null;
let activeRects = [];
let rafId = null;
let isSelecting = false;

const RECT_POOL_MAX = 40;

function createFxLayer() {
  const aura = document.createElement('div');
  aura.classList.add('selection-fx-aura');
  document.body.appendChild(aura);

  return { aura };
}

function getRectEl(pool, index) {
  if (index < pool.length) {
    return pool[index];
  }
  const el = document.createElement('div');
  el.classList.add('selection-fx-rect');
  document.body.appendChild(el);
  pool.push(el);
  return el;
}

function updateOverlay() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    hideOverlay();
    return;
  }

  // Only activate inside screen overlays, not on the home/landing page
  const anchor = selection.anchorNode;
  const node = anchor?.nodeType === 3 ? anchor.parentElement : anchor;
  if (!node || !node.closest('#horizontalPhoneScreen, #saviorOfScrolls')) {
    hideOverlay();
    return;
  }

  const range = selection.getRangeAt(0);
  const rects = range.getClientRects();

  if (rects.length === 0) {
    hideOverlay();
    return;
  }

  isSelecting = true;

  // Merge overlapping / adjacent rects for cleaner visuals
  const merged = mergeRects(rects);

  // Bounding box for aura positioning
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (let i = 0; i < merged.length && i < RECT_POOL_MAX; i++) {
    const r = merged[i];
    const el = getRectEl(activeRects, i);

    el.style.left = `${r.left}px`;
    el.style.top = `${r.top}px`;
    el.style.width = `${r.width}px`;
    el.style.height = `${r.height}px`;
    el.style.display = 'block';

    minX = Math.min(minX, r.left);
    minY = Math.min(minY, r.top);
    maxX = Math.max(maxX, r.left + r.width);
    maxY = Math.max(maxY, r.top + r.height);
  }

  // Hide unused rects
  for (let i = merged.length; i < activeRects.length; i++) {
    activeRects[i].style.display = 'none';
  }

  // Position aura at center of selection
  if (isFinite(minX) && auraEl) {
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const spread = Math.max(maxX - minX, maxY - minY, 200);

    auraEl.style.left = `${cx - spread}px`;
    auraEl.style.top = `${cy - spread}px`;
    auraEl.style.width = `${spread * 2}px`;
    auraEl.style.height = `${spread * 2}px`;
    auraEl.classList.add('active');
  }
}

function hideOverlay() {
  if (!isSelecting) return;
  isSelecting = false;

  for (const el of activeRects) {
    el.style.display = 'none';
  }

  if (auraEl) {
    auraEl.classList.remove('active');
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * Merge touching / overlapping rects into larger blocks
 * to reduce visual noise from many tiny rectangles.
 */
function mergeRects(clientRects) {
  const rects = [];
  for (const r of clientRects) {
    if (r.width < 1 || r.height < 1) continue;
    rects.push({
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
      right: r.left + r.width,
      bottom: r.top + r.height,
    });
  }

  if (rects.length === 0) return rects;

  // Sort by top then left
  rects.sort((a, b) => a.top - b.top || a.left - b.left);

  const merged = [rects[0]];
  for (let i = 1; i < rects.length; i++) {
    const curr = rects[i];
    const prev = merged[merged.length - 1];

    // Merge if vertically overlapping and horizontally touching
    const vertOverlap = Math.abs(curr.top - prev.top) < 4 &&
                         Math.abs(curr.height - prev.height) < 4;
    const horizTouch = curr.left <= prev.right + 2;

    if (vertOverlap && horizTouch) {
      prev.right = Math.max(prev.right, curr.right);
      prev.width = prev.right - prev.left;
      prev.bottom = Math.max(prev.bottom, curr.bottom);
      prev.height = prev.bottom - prev.top;
    } else {
      merged.push(curr);
    }
  }

  return merged;
}

function onSelectionChange() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(updateOverlay);
}

/**
 * Initialize the futuristic selection overlay.
 * Call once after DOM is ready.
 */
export function initSelectionGlow() {
  // Don't run in iframes (recursive laptop preview)
  if (window.self !== window.top) return;
  // Don't run on mobile/tablet (portfolio shows mobile overlay there)
  if (window.matchMedia('(max-width: 1024px)').matches) return;

  const { aura } = createFxLayer();
  auraEl = aura;

  document.addEventListener('selectionchange', onSelectionChange);

  // Clear overlay on mousedown so it resets before new drag
  document.addEventListener('mousedown', () => {
    hideOverlay();
  });

  // Also update on scroll since rects are viewport-relative
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!isSelecting) return;
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(() => {
        updateOverlay();
        scrollTick = false;
      });
    }
  }, { passive: true });
}
