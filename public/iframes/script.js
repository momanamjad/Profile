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
