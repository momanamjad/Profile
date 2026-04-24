// --- DOM Elements ---
const startButton = document.querySelector(".startButton");
const bootScreen = document.querySelector(".bootScreen");
const loaderScreen = document.querySelector(".Loader");
const desktopView = document.querySelector(".windows");
const bootProgress = document.querySelector(".boot-progress");
const bootStatus = document.querySelector(".boot-status");
const powerButton = document.querySelector(".power-button");
const desktopClock = document.getElementById("desktop-clock");
const desktopGrid = document.querySelector(".desktop-grid");
const desktopHint = document.querySelector(".desktop-hint");
const profileIcon = document.querySelector(".taskbar-profile");

// --- App Data ---
const apps = {
    github: {
        title: "GitHub Clone",
        url: "https://github-kappa-two.vercel.app/"
    },
    delivery: {
        title: "Food Delivery",
        url: "https://delivery-omega.vercel.app/"
    },
    recursion: {
        title: "Portfolio",
        url: "../index.html"
    },
    employ: {
        title: "Employee Tasks",
        url: "https://employ-sigma.vercel.app/"
    },
    theater: {
        title: "Theater Web",
        url: "https://theater-web-in-react-orco.vercel.app/"
    },
    profile: {
        title: "User Profile",
        isProfile: true
    }
};

// --- Power On Sequence ---
powerButton.addEventListener("click", () => {
    startButton.classList.add("displayHide");
    bootScreen.classList.remove("displayHide");
    
    startBootSequence();
});

function startBootSequence() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(showDesktop, 500);
        }
        
        bootProgress.style.width = `${progress}%`;
        
        // Update status text based on progress
        if (progress > 80) bootStatus.innerText = "Starting Desktop...";
        else if (progress > 50) bootStatus.innerText = "Loading User Profile...";
        else if (progress > 20) bootStatus.innerText = "Loading Modules...";
    }, 100);
}

function showDesktop() {
    bootScreen.classList.add("displayHide");
    desktopView.classList.remove("displayHide");
    updateClock();
    setInterval(updateClock, 1000);
}

// --- Clock Logic ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    desktopClock.innerText = `${hours}:${minutes} ${ampm}`;
}

// --- App Navigation ---
let selectedApp = null;

desktopGrid.addEventListener("click", (e) => {
    const icon = e.target.closest(".app-icon");
    
    if (icon) {
        if (desktopHint) desktopHint.style.opacity = "0";
        if (selectedApp) selectedApp.classList.remove("selected");
        selectedApp = icon;
        selectedApp.classList.add("selected");
    } else {
        if (selectedApp) selectedApp.classList.remove("selected");
        selectedApp = null;
    }
});

// Double click to open
desktopGrid.addEventListener("dblclick", (e) => {
    const icon = e.target.closest(".app-icon");
    if (icon) {
        openApp(icon.dataset.app);
    }
});

// Support single click for "Enter" feel if user prefers, 
// but dblclick is more like a real OS.
// Let's add a "touch/click" handler for the icon's image for easier opening in 3D
document.querySelectorAll(".app-icon img").forEach(img => {
    img.addEventListener("click", (e) => {
        e.stopPropagation();
        const icon = img.closest(".app-icon");
        // If already selected, second click opens it (like mobile)
        if (icon.classList.contains("selected")) {
            openApp(icon.dataset.app);
        } else {
            if (selectedApp) selectedApp.classList.remove("selected");
            selectedApp = icon;
            selectedApp.classList.add("selected");
        }
    });
});

// --- Window Management ---
// Profile click listener
if (profileIcon) {
    profileIcon.addEventListener("click", () => openApp("profile"));
}

function openApp(appKey) {
    const app = apps[appKey];
    if (!app) return;

    // Remove existing window if any
    const existing = document.querySelector(".window-container");
    if (existing) existing.remove();

    const windowEl = document.createElement("div");
    windowEl.className = "window-container";
    
    let content = `<iframe src="${app.url}"></iframe>`;
    if (app.isProfile) {
        windowEl.classList.add("profile-window");
        content = `
            <div class="user-card">
                <div class="user-header">
                    <img src="./assets/profile.png" alt="Profile">
                    <h3>Moman Amjad</h3>
                    <p>Web Developer & Intern</p>
                </div>
                <div class="user-stats">
                    <div class="stat"><span>Project Count</span> <strong>12+</strong></div>
                    <div class="stat"><span>Experience</span> <strong>Inter</strong></div>
                </div>
                <button class="view-resume-btn" onclick="window.open('https://docs.google.com/document/d/1LlfNWSqvcL76hCxQD2O4te-xABO0aiP3/edit?usp=sharing&ouid=101804073816581409929&rtpof=true&sd=true', '_blank')">View Resume</button>
            </div>
        `;
    }

    const windowIcon = app.isProfile ? "./assets/profile.png" : "./assets/globe.png";

    windowEl.innerHTML = `
        <div class="title-bar">
            <div class="title">
                <img src="${windowIcon}" class="title-icon" alt="icon">
                ${app.title.toUpperCase()}
            </div>
            <div class="controls">
                <div class="control-btn minimize" title="Minimize">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <div class="control-btn close">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            </div>
        </div>
        <div class="window-content">
            ${content}
        </div>
    `;

    document.body.appendChild(windowEl);

    // Close functionality
    windowEl.querySelector(".close").addEventListener("click", () => {
        windowEl.style.transform = "translate(-50%, -45%) scale(0.9)";
        windowEl.style.opacity = "0";
        setTimeout(() => windowEl.remove(), 200);
    });

    // Minimize functionality
    windowEl.querySelector(".minimize").addEventListener("click", () => {
        windowEl.classList.add("minimized-out");
        setTimeout(() => windowEl.remove(), 400);
    });
}

// Disable right click inside the laptop screen
document.addEventListener('contextmenu', event => event.preventDefault());

// --- OS Detection and Logo Update ---
function updateOSLogo() {
    const startButtonIcon = document.querySelector(".start-menu-button");
    const centerLogo = document.querySelector(".desktop-center-logo");
    const wallpaper = document.querySelector(".desktop-wallpaper");
    if (!startButtonIcon || !centerLogo) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    let os = 'Windows'; // Default

    // Improved detection to handle DevTools spoofing better
    if (userAgent.includes('macintosh') || userAgent.includes('mac os') || platform.includes('mac')) {
        os = 'macOS';
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        os = 'iOS';
    } else if (userAgent.includes('android')) {
        os = 'Android';
    } else if (userAgent.includes('linux') || platform.includes('linux')) {
        os = 'Linux';
    } else if (userAgent.includes('win') || platform.includes('win')) {
        os = 'Windows';
    }

    // Use a clean background if not Windows (to hide the built-in Windows wallpaper logo)
    if (os !== 'Windows' && wallpaper) {
        wallpaper.classList.add('clean');
    }

    let iconSvg = '';

    switch (os) {
        case 'macOS':
        case 'iOS':
            // Apple Logo
            iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.04 1.72-3.12 1.72-1.07 0-1.44-.64-2.73-.64-1.28 0-1.7.63-2.73.63-1.03 0-1.99-.68-3.04-1.74-2.14-2.15-3.3-6.14-3.3-8.74 0-4.04 2.5-6.17 4.9-6.17 1.25 0 2.29.83 3.03.83.73 0 1.93-.83 3.32-.83 1.15 0 2.65.61 3.51 1.76-2.52 1.48-2.11 4.77.42 5.92-.76 1.83-1.8 3.54-3.26 5.27zm-3.03-15.63c0-1.63 1.34-2.95 2.99-2.95.03.35-.07.72-.22 1.08-.43 1.05-1.55 1.87-2.77 1.87-.03-.35.07-.72.22-1.08z"/></svg>';
            break;
        case 'Android':
            // Android Logo
            iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.85-1.18-6.09-1.18-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C3.13 11.91 1 15.31 1 19.14h22c0-3.83-2.13-7.23-5.4-9.66zM7 15.14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>';
            break;
        case 'Linux':
            // Linux Penguin (Simplified)
            iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C10.5 2 9.2 3.3 9.2 4.8c0 .6.2 1.2.5 1.7C8.2 7.7 7 9.7 7 12c0 2.3 1.2 4.3 3 5.5-.3.5-.5 1.1-.5 1.7 0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8c0-.6-.2-1.2-.5-1.7 1.8-1.2 3-3.2 3-5.5 0-2.3-1.2-4.3-3-5.5.3-.5.5-1.1.5-1.7 0-1.5-1.3-2.8-2.8-2.8z"/></svg>';
            break;
        case 'Windows':
        default:
            // Windows Logo
            iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"></path></svg>';
            break;
    }

    startButtonIcon.innerHTML = iconSvg;
    centerLogo.innerHTML = iconSvg;
    startButtonIcon.title = `Start (${os})`;
}

// Call on load
updateOSLogo();


