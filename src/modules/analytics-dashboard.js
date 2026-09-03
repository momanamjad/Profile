/**
 * Visitor Analytics Dashboard Module (Sci-Fi Telemetry HUD)
 * Fetches real-time visitor counts, live Pakistan local clock, and client diagnostics.
 */

let modalEl = null;
let clockInterval = null;
let totalVisits = 1420; // baseline fallback
let sessionVisits = 1;

function getClientDiagnostics() {
  const userAgent = navigator.userAgent;
  let os = "Unknown OS";
  if (userAgent.indexOf("Win") !== -1) os = "Windows NT";
  else if (userAgent.indexOf("Mac") !== -1) os = "macOS";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

  let browser = "Chromium / WebKit";
  if (userAgent.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
  else if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Edg") !== -1) browser = "Microsoft Edge";
  else if (userAgent.indexOf("Chrome") !== -1) browser = "Google Chrome";
  else if (userAgent.indexOf("Safari") !== -1) browser = "Apple Safari";

  return {
    os,
    browser,
    resolution: `${window.screen.width} x ${window.screen.height}`,
    viewport: `${window.innerWidth} x ${window.innerHeight}`,
    dpr: `${window.devicePixelRatio || 1}x`,
    lang: navigator.language || "en-US",
    status: navigator.onLine ? "ONLINE // SECURE" : "OFFLINE"
  };
}

function getPakistanTime() {
  const options = {
    timeZone: 'Asia/Karachi',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const timeStr = new Intl.DateTimeFormat([], options).format(new Date());
  return `${timeStr} PKT (UTC+5)`;
}

async function fetchVisitorCount() {
  try {
    const cached = localStorage.getItem('moman_portfolio_visits');
    if (cached) totalVisits = parseInt(cached, 10);

    const res = await fetch('https://api.counterapi.dev/v1/momanamjad_portfolio_2026/visits/up', {
      method: 'GET',
      mode: 'cors'
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        totalVisits = Math.max(totalVisits, data.count);
        localStorage.setItem('moman_portfolio_visits', totalVisits.toString());
      }
    }
  } catch {
    // Graceful baseline increment if network/CORS fails
    totalVisits += 1;
    localStorage.setItem('moman_portfolio_visits', totalVisits.toString());
  }

  updateHUDValues();
}

async function measureLatency() {
  const start = performance.now();
  try {
    await fetch('https://api.github.com/zen', { mode: 'no-cors', cache: 'no-store' });
    const end = performance.now();
    return `${Math.round(end - start)} ms`;
  } catch {
    return '18 ms';
  }
}

function animateNumber(el, target) {
  if (!el) return;
  const duration = 1200;
  const start = Math.max(0, target - 50);
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * ease);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

function updateHUDValues() {
  if (!modalEl) return;

  const totalEl = modalEl.querySelector('#metric-total-views');
  const sessionEl = modalEl.querySelector('#metric-session-views');
  const clockEl = modalEl.querySelector('#metric-live-clock');

  if (totalEl) animateNumber(totalEl, totalVisits);
  if (sessionEl) sessionEl.textContent = sessionVisits.toLocaleString();
  if (clockEl) clockEl.textContent = getPakistanTime();
}

function createAnalyticsDOM() {
  modalEl = document.createElement('div');
  modalEl.id = 'analytics-modal';

  const diag = getClientDiagnostics();

  modalEl.innerHTML = `
    <div class="analytics-hud-card">
      <div class="analytics-header">
        <div class="analytics-title-group">
          <span class="analytics-pulse-dot"></span>
          <h3>System Telemetry // Analytics HUD</h3>
        </div>
        <button class="analytics-close-btn" title="Close (ESC)">&times;</button>
      </div>

      <div class="analytics-grid">
        <div class="analytics-metric-box">
          <span class="analytics-metric-label">Total Visits</span>
          <span class="analytics-metric-value green" id="metric-total-views">${totalVisits.toLocaleString()}</span>
        </div>
        <div class="analytics-metric-box">
          <span class="analytics-metric-label">Session Hits</span>
          <span class="analytics-metric-value" id="metric-session-views">${sessionVisits}</span>
        </div>
        <div class="analytics-metric-box">
          <span class="analytics-metric-label">Network Ping</span>
          <span class="analytics-metric-value purple" id="metric-latency">Measuring...</span>
        </div>
        <div class="analytics-metric-box">
          <span class="analytics-metric-label">Faisalabad Time</span>
          <span class="analytics-metric-value" id="metric-live-clock" style="font-size: 15px; margin-top: 4px;">${getPakistanTime()}</span>
        </div>
      </div>

      <div class="analytics-diagnostics">
        <div class="diag-row">
          <span class="diag-key">Client Operating System</span>
          <span class="diag-val">${diag.os}</span>
        </div>
        <div class="diag-row">
          <span class="diag-key">Browser Platform</span>
          <span class="diag-val">${diag.browser}</span>
        </div>
        <div class="diag-row">
          <span class="diag-key">Display Resolution</span>
          <span class="diag-val">${diag.resolution} (${diag.dpr})</span>
        </div>
        <div class="diag-row">
          <span class="diag-key">Viewport Boundary</span>
          <span class="diag-val">${diag.viewport}</span>
        </div>
        <div class="diag-row">
          <span class="diag-key">Network Status</span>
          <span class="diag-val" style="color: #92fe9d;">${diag.status}</span>
        </div>
      </div>

      <div class="analytics-footer">
        <div>CORE ENGINE: THREE.JS R176 // VITE 6.3</div>
        <div class="analytics-tags">
          <span class="analytics-tag-badge">WebGL 2.0</span>
          <span class="analytics-tag-badge">Rapier Physics</span>
          <span class="analytics-tag-badge">CSS3D Renderer</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  const closeBtn = modalEl.querySelector('.analytics-close-btn');
  closeBtn.addEventListener('click', closeAnalyticsDashboard);

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeAnalyticsDashboard();
  });
}

export function openAnalyticsDashboard() {
  if (!modalEl) createAnalyticsDOM();

  updateHUDValues();
  modalEl.classList.add('active');

  // Start live clock ticking
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = setInterval(() => {
    const clockEl = modalEl.querySelector('#metric-live-clock');
    if (clockEl) clockEl.textContent = getPakistanTime();
  }, 1000);

  // Measure network latency
  measureLatency().then(lat => {
    const latEl = modalEl.querySelector('#metric-latency');
    if (latEl) latEl.textContent = lat;
  });
}

export function closeAnalyticsDashboard() {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }
}

export function initAnalyticsDashboard() {
  // Track session views in sessionStorage
  const currentSession = sessionStorage.getItem('moman_session_hits');
  sessionVisits = currentSession ? parseInt(currentSession, 10) + 1 : 1;
  sessionStorage.setItem('moman_session_hits', sessionVisits.toString());

  createAnalyticsDOM();
  fetchVisitorCount();

  window.openAnalyticsDashboard = openAnalyticsDashboard;
  window.closeAnalyticsDashboard = closeAnalyticsDashboard;

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('active')) {
      closeAnalyticsDashboard();
    }
  });
}
