/**
 * Command Palette Module (Ctrl + K)
 * Developer-first fuzzy action menu and cyber toast notification system.
 */

let modalEl = null;
let inputEl = null;
let resultsListEl = null;
let triggerBtnEl = null;
let toastEl = null;

let isPaletteOpen = false;
let selectedIndex = 0;
let filteredCommands = [];

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
      title: 'Welcome / Home',
      category: 'Navigation',
      icon: '🏠',
      desc: 'Jump to portfolio intro & headline',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('homeSection')
    },
    {
      id: 'nav-about',
      title: 'About Me',
      category: 'Navigation',
      icon: '👤',
      desc: 'Education, background & tech stack',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('aboutSection')
    },
    {
      id: 'nav-experience',
      title: 'Experience & Journey',
      category: 'Navigation',
      icon: '💼',
      desc: 'Internship, frontend & backend journey',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('experienceSection')
    },
    {
      id: 'nav-opensource',
      title: 'Open Source Contributions',
      category: 'Navigation',
      icon: '🌐',
      desc: 'Merged pull requests & community fixes',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('openSourceSection')
    },
    {
      id: 'nav-projects',
      title: 'Projects Showcase',
      category: 'Navigation',
      icon: '🚀',
      desc: 'Interactive live web apps and demos',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('projectSection')
    },
    {
      id: 'nav-github',
      title: 'GitHub Telemetry',
      category: 'Navigation',
      icon: '📊',
      desc: 'Live GitHub commit grid and languages',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('githubSection')
    },
    {
      id: 'nav-contact',
      title: 'Contact Form',
      category: 'Navigation',
      icon: '✉️',
      desc: 'Send an email or message directly',
      action: () => window.navigateToScreenSection && window.navigateToScreenSection('contactSection')
    },
    {
      id: 'nav-3d',
      title: 'Exit to 3D Celestial Scene',
      category: 'Navigation',
      icon: '🌌',
      desc: 'Return to full 3D interactive Sun & Moon',
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
      icon: '📄',
      desc: 'Download latest official curriculum vitae',
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
      icon: '📋',
      desc: 'momanamjad07@gmail.com',
      action: () => {
        navigator.clipboard.writeText('momanamjad07@gmail.com').then(() => {
          showCyberToast('Email copied to clipboard: momanamjad07@gmail.com');
        }).catch(() => {
          showCyberToast('momanamjad07@gmail.com');
        });
      }
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      category: 'Quick Actions',
      icon: '🐙',
      desc: 'https://github.com/momanamjad',
      action: () => window.open('https://github.com/momanamjad', '_blank')
    },

    // System Telemetry
    {
      id: 'sys-analytics',
      title: 'Visitor Analytics HUD',
      category: 'System Telemetry',
      icon: '📈',
      desc: 'Real-time visitor count, latency & diagnostics',
      action: () => {
        if (window.openAnalyticsDashboard) {
          window.openAnalyticsDashboard();
        }
      }
    },
    {
      id: 'sys-cursor',
      title: 'Toggle Cyber Cursor',
      category: 'System Telemetry',
      icon: '🎯',
      desc: 'Toggle the neon pinpoint & trailing aura ring',
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
  // Trigger button in bottom corner
  triggerBtnEl = document.createElement('button');
  triggerBtnEl.id = 'cmd-palette-trigger-btn';
  triggerBtnEl.innerHTML = `<span>Menu</span><span class="cmd-kbd">Ctrl K</span>`;
  triggerBtnEl.title = 'Open Command Palette (Ctrl + K)';
  document.body.appendChild(triggerBtnEl);

  // Modal
  modalEl = document.createElement('div');
  modalEl.id = 'command-palette-modal';
  modalEl.innerHTML = `
    <div class="cmd-palette-card">
      <div class="cmd-search-wrapper">
        <span class="cmd-search-icon">&gt;_</span>
        <input type="text" class="cmd-search-input" placeholder="Type a command or search sections..." autofocus />
        <span class="cmd-search-esc">ESC</span>
      </div>
      <ul class="cmd-results-list"></ul>
      <div class="cmd-palette-footer">
        <div class="cmd-hints">
          <span><kbd>&uarr;&darr;</kbd> Navigate</span>
          <span><kbd>&crarr;</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
        <div>Moman Portfolio v2.6</div>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  inputEl = modalEl.querySelector('.cmd-search-input');
  resultsListEl = modalEl.querySelector('.cmd-results-list');
}

function renderResults(query = '') {
  const commands = getCommands();
  const q = query.trim().toLowerCase();

  filteredCommands = commands.filter(cmd => {
    if (!q) return true;
    return cmd.title.toLowerCase().includes(q) ||
           cmd.desc.toLowerCase().includes(q) ||
           cmd.category.toLowerCase().includes(q);
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
          <div class="cmd-item-icon">${cmd.icon}</div>
          <div class="cmd-item-info">
            <div class="cmd-item-title">${cmd.title}</div>
            <div class="cmd-item-desc">${cmd.desc}</div>
          </div>
        </div>
        <div class="cmd-item-badge">${cmd.category}</div>
      </li>
    `;
  });

  resultsListEl.innerHTML = html;

  // Ensure selected item is scrolled into view
  const selectedEl = resultsListEl.querySelector('.cmd-item.selected');
  if (selectedEl) {
    selectedEl.scrollIntoView({ block: 'nearest' });
  }
}

function openCommandPalette() {
  if (isPaletteOpen) return;
  isPaletteOpen = true;
  selectedIndex = 0;
  inputEl.value = '';
  renderResults('');
  modalEl.classList.add('active');
  setTimeout(() => inputEl.focus(), 60);
}

function closeCommandPalette() {
  if (!isPaletteOpen) return;
  isPaletteOpen = false;
  modalEl.classList.remove('active');
}

function executeSelected() {
  if (filteredCommands.length > 0 && filteredCommands[selectedIndex]) {
    const cmd = filteredCommands[selectedIndex];
    closeCommandPalette();
    setTimeout(() => {
      cmd.action();
    }, 80);
  }
}

export function initCommandPalette() {
  createPaletteDOM();

  triggerBtnEl.addEventListener('click', () => {
    openCommandPalette();
  });

  // Global Keydown Handler
  window.addEventListener('keydown', (e) => {
    // Open on Ctrl + K or Cmd + K
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
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
      closeCommandPalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderResults(inputEl.value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderResults(inputEl.value);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeSelected();
    }
  });

  // Input typing listener
  inputEl.addEventListener('input', (e) => {
    selectedIndex = 0;
    renderResults(e.target.value);
  });

  // Click on list item
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
