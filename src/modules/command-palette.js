/**
 * Raycast / Spotlight Style Command Palette Module
 * Opens via Alt + Space (or Ctrl + K).
 * Features:
 * - Spaceship iconography
 * - Complete background scroll lock
 * - Precise screen section navigation
 * - Fuzzy search filtering
 * - Keyboard navigation (Arrows, Enter, Escape)
 */

let modalEl = null;
let inputEl = null;
let resultsListEl = null;
let triggerBtnEl = null;
let toastEl = null;

let isPaletteOpen = false;
let selectedIndex = 0;
let filteredCommands = [];

const SPACESHIP_SVG = `
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
`;

function showCyberToast(text) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'cyber-toast';
    document.body.appendChild(toastEl);
  }

  toastEl.innerHTML = `<span class="toast-dot"></span><span>${text}</span>`;
  toastEl.classList.add('show');

  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

function getCommands() {
  return [
    // Navigation
    {
      id: 'nav-welcome',
      title: 'Home & Welcome',
      category: 'Navigation',
      iconBg: '#eff6ff',
      iconColor: '#3b82f6',
      icon: '🏠',
      desc: 'Jump to portfolio intro & headline',
      badge: 'home',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('homeSection')
    },
    {
      id: 'nav-about',
      title: 'About Me',
      category: 'Navigation',
      iconBg: '#fdf2f8',
      iconColor: '#ec4899',
      icon: '👤',
      desc: 'Education, background & tech stack',
      badge: 'about',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('aboutSection')
    },
    {
      id: 'nav-experience',
      title: 'Experience & Journey',
      category: 'Navigation',
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
      icon: '💼',
      desc: 'Fillinx internship & frontend journey',
      badge: 'exp',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('experienceSection')
    },
    {
      id: 'nav-opensource',
      title: 'Open Source Contributions',
      category: 'Navigation',
      iconBg: '#fef3c7',
      iconColor: '#d97706',
      icon: '🌐',
      desc: 'Merged pull requests, bug fixes & features',
      badge: 'contrib',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('openSourceSection')
    },
    {
      id: 'nav-projects',
      title: 'Projects Showcase',
      category: 'Navigation',
      iconBg: '#faf5ff',
      iconColor: '#9333ea',
      icon: '🚀',
      desc: 'Interactive live web apps and previews',
      badge: 'projects',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('projectSection')
    },
    {
      id: 'nav-github',
      title: 'GitHub Telemetry',
      category: 'Navigation',
      iconBg: '#f1f5f9',
      iconColor: '#0f172a',
      icon: '🐙',
      desc: 'Live commit heatmap & languages breakdown',
      badge: 'github',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('githubSection')
    },
    {
      id: 'nav-contact',
      title: 'Contact Form',
      category: 'Navigation',
      iconBg: '#ecfeff',
      iconColor: '#0891b2',
      icon: '✉️',
      desc: 'Send an email or message directly',
      badge: 'contact',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('contactSection')
    },
    {
      id: 'nav-3d',
      title: 'Exit to 3D Celestial Scene',
      category: 'Navigation',
      iconBg: '#fff1f2',
      iconColor: '#e11d48',
      icon: '🌌',
      desc: 'Return to interactive 3D Sun & Moon space',
      badge: 'esc',
      action: () => {
        const phone = document.getElementById('horizontalPhoneScreen');
        if (phone && phone.style.opacity === '1' && typeof window.PhoneFullscreenModeSwitch === 'function') {
          window.PhoneFullscreenModeSwitch();
        }
      }
    },

    // Quick Actions
    {
      id: 'act-resume-dl',
      title: 'Download Resume (PDF)',
      category: 'Quick Actions',
      iconBg: '#f0fdf4',
      iconColor: '#15803d',
      icon: '📄',
      desc: 'Download latest official curriculum vitae',
      badge: 'file',
      action: () => {
        const link = document.createElement('a');
        link.href = './assets/resume.pdf';
        link.download = 'Moman_Amjad_Resume.pdf';
        link.click();
        showCyberToast('Downloading Resume: Moman_Amjad_Resume.pdf');
      }
    },
    {
      id: 'act-copy-email',
      title: 'Copy Email Address',
      category: 'Quick Actions',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      icon: '📋',
      desc: 'momanamjad07@gmail.com',
      badge: 'copy',
      action: () => {
        navigator.clipboard.writeText('momanamjad07@gmail.com').then(() => {
          showCyberToast('Email copied: momanamjad07@gmail.com');
        }).catch(() => {
          showCyberToast('momanamjad07@gmail.com');
        });
      }
    },
    {
      id: 'act-github-web',
      title: 'Open GitHub Profile',
      category: 'Quick Actions',
      iconBg: '#f8fafc',
      iconColor: '#334155',
      icon: '🔗',
      desc: 'https://github.com/momanamjad',
      badge: 'web',
      action: () => window.open('https://github.com/momanamjad', '_blank')
    },

    // Telemetry & System
    {
      id: 'sys-analytics',
      title: 'Visitor Analytics HUD',
      category: 'Telemetry',
      iconBg: '#fefce8',
      iconColor: '#ca8a04',
      icon: '📊',
      desc: 'Real-time visitor count, latency & diagnostics',
      badge: 'hud',
      action: () => {
        if (window.openAnalyticsDashboard) {
          window.openAnalyticsDashboard();
        }
      }
    },
    {
      id: 'sys-cursor',
      title: 'Toggle Cyber Cursor',
      category: 'Telemetry',
      iconBg: '#fdf4ff',
      iconColor: '#c026d3',
      icon: '🎯',
      desc: 'Toggle the neon pinpoint & trailing aura ring',
      badge: 'cursor',
      action: () => {
        const dot = document.querySelector('.cyber-cursor-dot');
        const ring = document.querySelector('.cyber-cursor-ring');
        if (dot && ring) {
          const isHidden = dot.style.display === 'none';
          dot.style.display = isHidden ? 'block' : 'none';
          ring.style.display = isHidden ? 'block' : 'none';
          showCyberToast(isHidden ? 'Cyber Cursor Enabled' : 'Cyber Cursor Disabled');
        }
      }
    }
  ];
}

function createPaletteDOM() {
  // Trigger button in bottom corner with spaceship icon
  triggerBtnEl = document.createElement('button');
  triggerBtnEl.id = 'cmd-palette-trigger-btn';
  triggerBtnEl.innerHTML = `
    <span class="cmd-spaceship-icon">${SPACESHIP_SVG}</span>
    <span class="cmd-kbd">Alt Space</span>
  `;
  triggerBtnEl.title = 'Open Command Palette (Alt + Space or Ctrl + K)';
  document.body.appendChild(triggerBtnEl);

  // Modal Structure
  modalEl = document.createElement('div');
  modalEl.id = 'command-palette-modal';
  modalEl.innerHTML = `
    <div class="cmd-palette-card">
      <div class="cmd-search-wrapper">
        <div class="cmd-spaceship-header-icon">${SPACESHIP_SVG}</div>
        <input type="text" class="cmd-search-input" placeholder="Search for sections, files and commands..." autofocus />
        <span class="cmd-search-esc">ESC</span>
      </div>
      <ul class="cmd-results-list"></ul>
      <div class="cmd-palette-footer">
        <div class="cmd-footer-left">
          ${SPACESHIP_SVG}
          <span>Moman Portfolio</span>
        </div>
        <div class="cmd-hints">
          <span><kbd>&uarr;&darr;</kbd> Navigate</span>
          <span><kbd>&crarr;</kbd> Open</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  inputEl = modalEl.querySelector('.cmd-search-input');
  resultsListEl = modalEl.querySelector('.cmd-results-list');

  // Prevent background scrolling / wheel events
  modalEl.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: false });

  modalEl.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: false });
}

function renderResults(query = '') {
  const commands = getCommands();
  const q = query.trim().toLowerCase();

  filteredCommands = commands.filter(cmd => {
    if (!q) return true;
    return cmd.title.toLowerCase().includes(q) ||
           cmd.desc.toLowerCase().includes(q) ||
           cmd.category.toLowerCase().includes(q) ||
           (cmd.badge && cmd.badge.toLowerCase().includes(q));
  });

  selectedIndex = Math.min(selectedIndex, Math.max(0, filteredCommands.length - 1));

  if (filteredCommands.length === 0) {
    resultsListEl.innerHTML = `<div class="cmd-empty-state">No matching commands found for "${query}"</div>`;
    return;
  }

  let html = '';
  let lastCategory = '';

  filteredCommands.forEach((cmd, idx) => {
    if (cmd.category !== lastCategory) {
      lastCategory = cmd.category;
      html += `<div class="cmd-group-title">${lastCategory}</div>`;
    }

    const isSelected = idx === selectedIndex ? 'selected' : '';
    html += `
      <li class="cmd-item ${isSelected}" data-index="${idx}">
        <div class="cmd-item-left">
          <div class="cmd-item-icon-box" style="background: ${cmd.iconBg}; color: ${cmd.iconColor};">
            ${cmd.icon}
          </div>
          <div class="cmd-item-info">
            <div class="cmd-item-title">${cmd.title}</div>
            <div class="cmd-item-desc">${cmd.desc}</div>
          </div>
        </div>
        <div class="cmd-item-badge">${cmd.badge || cmd.category}</div>
      </li>
    `;
  });

  resultsListEl.innerHTML = html;

  const selectedEl = resultsListEl.querySelector('.cmd-item.selected');
  if (selectedEl) {
    selectedEl.scrollIntoView({ block: 'nearest' });
  }
}

function openCommandPalette() {
  if (isPaletteOpen) return;
  isPaletteOpen = true;
  window.isModalActive = true;
  document.body.style.overflow = 'hidden';

  selectedIndex = 0;
  inputEl.value = '';
  renderResults('');
  modalEl.classList.add('active');
  setTimeout(() => inputEl.focus(), 60);
}

function closeCommandPalette() {
  if (!isPaletteOpen) return;
  isPaletteOpen = false;
  window.isModalActive = false;
  document.body.style.overflow = '';
  modalEl.classList.remove('active');
}

function executeSelected() {
  if (filteredCommands.length > 0 && filteredCommands[selectedIndex]) {
    const cmd = filteredCommands[selectedIndex];
    closeCommandPalette();
    setTimeout(() => {
      cmd.action();
    }, 60);
  }
}

export function initCommandPalette() {
  createPaletteDOM();

  triggerBtnEl.addEventListener('click', () => {
    openCommandPalette();
  });

  // Global Keyboard Listener
  window.addEventListener('keydown', (e) => {
    // 1. Primary: Alt + Space (like Raycast, Flow Launcher)
    const isAltSpace = e.altKey && (e.code === 'Space' || e.key === ' ' || e.keyCode === 32);
    // 2. Secondary: Ctrl + K / Cmd + K
    const isCtrlK = (e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K');

    if (isAltSpace || isCtrlK) {
      e.preventDefault();
      e.stopPropagation();
      if (isPaletteOpen) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }

    if (!isPaletteOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      closeCommandPalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderResults(inputEl.value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderResults(inputEl.value);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      executeSelected();
    }
  }, true);

  // Search input typing
  inputEl.addEventListener('input', (e) => {
    selectedIndex = 0;
    renderResults(e.target.value);
  });

  // Item click
  resultsListEl.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (item) {
      const idx = parseInt(item.dataset.index, 10);
      if (!isNaN(idx) && filteredCommands[idx]) {
        selectedIndex = idx;
        executeSelected();
      }
    }
  });

  // Click outside to close
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeCommandPalette();
    }
  });

  window.openCommandPalette = openCommandPalette;
  window.closeCommandPalette = closeCommandPalette;
  window.showCyberToast = showCyberToast;
}
