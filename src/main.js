import * as THREE from "three";
import { Vector2 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DRenderer, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
// Rapier physics engine imported dynamically later to save 889KB on initial load
let RAPIER;
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// Register Service Worker only in production. In local/dev, clear old SW caches so refreshes
// always use the latest animation code instead of stale cached bundles.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (import.meta.env.PROD && !isLocalhost) {
      navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js').catch(() => {});
      return;
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));

      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      }
    } catch {
      // Ignore cache cleanup failures in development.
    }
  });
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function resetInitialScrollPosition() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

resetInitialScrollPosition();
window.addEventListener('load', resetInitialScrollPosition);
window.addEventListener('pageshow', resetInitialScrollPosition);

// Loading Manager - tracks all Three.js asset loads
const loadingManager = new THREE.LoadingManager();
const loadingOverlay = document.getElementById('loading-overlay');
const loadingPercent = document.getElementById('loading-percent');
let currentLoadingPct = 0;

// --- Rose Three Loader Logic ---
const ROSE_SVG_NS = 'http://www.w3.org/2000/svg';
const roseConfig = {
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
  point(progress, detailScale, config) {
    const t = progress * Math.PI * 2;
    const a = config.roseA + detailScale * config.roseABoost;
    const r = a * (config.roseBreathBase + detailScale * config.roseBreathBoost) * Math.cos(3 * t);
    return {
      x: 50 + Math.cos(t) * r * config.roseScale,
      y: 50 + Math.sin(t) * r * config.roseScale,
    };
  },
};

const roseGroup = document.querySelector('#rose-group');
const rosePath = document.querySelector('#rose-path');
if (rosePath) rosePath.setAttribute('stroke-width', String(roseConfig.strokeWidth));

const roseParticles = Array.from({ length: roseConfig.particleCount }, () => {
  const circle = document.createElementNS(ROSE_SVG_NS, 'circle');
  circle.setAttribute('fill', '#ffffff'); // Clean mono color
  if (roseGroup) roseGroup.appendChild(circle);
  return circle;
});


function getRoseDetailScale(time) {
  const pulseProgress = (time % roseConfig.pulseDurationMs) / roseConfig.pulseDurationMs;
  const pulseAngle = pulseProgress * Math.PI * 2;
  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function getRoseRotation(time) {
  return -((time % roseConfig.rotationDurationMs) / roseConfig.rotationDurationMs) * 360;
}

function buildRosePath(detailScale, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = roseConfig.point(index / steps, detailScale, roseConfig);
    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

function getRoseParticle(index, progress, detailScale) {
  const tailOffset = index / (roseConfig.particleCount - 1);
  const p = ((progress - tailOffset * roseConfig.trailSpan) % 1 + 1) % 1;
  const point = roseConfig.point(p, detailScale, roseConfig);
  const fade = Math.pow(1 - tailOffset, 0.56);
  return {
    x: point.x,
    y: point.y,
    radius: 0.9 + fade * 2.7,
    opacity: 0.04 + fade * 0.96,
  };
}

let roseAnimationId;
const roseStartedAt = performance.now();

function renderRose(now) {
  const time = now - roseStartedAt;
  const progress = (time % roseConfig.durationMs) / roseConfig.durationMs;
  const detailScale = getRoseDetailScale(time);

  if (roseGroup) roseGroup.setAttribute('transform', `rotate(${getRoseRotation(time)} 50 50)`);
  roseParticles.forEach((node, index) => {
    const particle = getRoseParticle(index, progress, detailScale);
    node.setAttribute('cx', particle.x.toFixed(2));
    node.setAttribute('cy', particle.y.toFixed(2));
    node.setAttribute('r', particle.radius.toFixed(2));
    node.setAttribute('opacity', particle.opacity.toFixed(3));
  });

  // Constant steps for smooth animation from the start
  if (rosePath) {
    const steps = 480;
    rosePath.setAttribute('d', buildRosePath(detailScale, steps));
  }

  roseAnimationId = requestAnimationFrame(renderRose);
}

roseAnimationId = requestAnimationFrame(renderRose);

loadingManager.onProgress = (_url, loaded, total) => {
  currentLoadingPct = (loaded / total) * 100;
  const pct = Math.floor(currentLoadingPct);
  if (loadingPercent) loadingPercent.textContent = pct + '%';
};

loadingManager.onLoad = () => {
  if (loadingOverlay) {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.style.display = 'none'; 
      // Keep animation running for a smooth transition or potential re-use
    }, 600);
  }
};

let world;
// Vite base URL - ensures paths work both in dev (/Portfolio/) and Vercel (/)
const BASE = import.meta.env.BASE_URL;
async function initRapier() {
  // Load Rapier dynamically to prevent blocking the main thread during initial asset load
  const module = await import('@dimforge/rapier3d-compat');
  RAPIER = module;
  await RAPIER.init();
  const gravity = new RAPIER.Vector3(0.0, 0, 0.0);
  world = new RAPIER.World(gravity);
  
  // Re-initialize any components that depend on world being ready
  initAmongusPhysics();
  initTextPhysics();
}

function initTextPhysics() {
  // Logic moved to a function that can be called when both font and Rapier are ready
  if (window._textPendingPhysics) {
    const { textMesh, size, center } = window._textPendingPhysics;
    if (!world || !RAPIER) return;

    const textBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(center.x, center.y - 0.2, center.z).setAdditionalMass(1000000).enabledTranslations(true, true, false)
    );
    const textShape = RAPIER.ColliderDesc.cuboid(size.x / 2 - 0.17, size.y / 2 - 0.07, size.z / 2).setTranslation(0.58, 0, 0).setRestitution(1);
    world.createCollider(textShape, textBody);

    dynamicBodies.push([textMesh, textBody]);
    delete window._textPendingPhysics;
  }
}
const dynamicBodies = []

const desktopAssetLoaders = [];
let desktopAssetsLoaded = false;

window.loadDesktopAssets = function() {
  if (desktopAssetsLoaded) return;
  desktopAssetsLoaded = true;
  desktopAssetLoaders.forEach(fn => fn());
};

desktopAssetLoaders.push(() => {
  initRapier();
});

const canvas = document.getElementById("bg");

const clock = new THREE.Clock();
//settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
// Cap pixel ratio at 2 to prevent GPU overload on HiDPI screens
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);
camera.position.z = 10;




// sun glow
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0.1;
bloomPass.strength = 1.4; //intensity of glow
const bloomComposer = new EffectComposer(renderer);
// Render bloom at half resolution for better performance on low-end/mobile GPUs
bloomComposer.setSize(Math.floor(window.innerWidth / 1.5), Math.floor(window.innerHeight / 1.5));
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//stars - use instanced mesh for much better GPU performance
const starCount = 450;
const starGeometry = new THREE.SphereGeometry(0.26, 6, 6); // Low poly since they're tiny
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // BasicMaterial = no lighting calc
const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, starCount);
const dummy = new THREE.Object3D();
for (let i = 0; i < starCount; i++) {
  dummy.position.set(
    THREE.MathUtils.randFloat(-300, 300),
    THREE.MathUtils.randFloat(-200, 200),
    THREE.MathUtils.randFloat(-600, -100)
  );
  dummy.updateMatrix();
  starMesh.setMatrixAt(i, dummy.matrix);
}
scene.add(starMesh);

//sun
const textureLoader = new THREE.TextureLoader(loadingManager);
const sunTexture = textureLoader.load(BASE + 'assets/images/sun.webp');
const sunGeometry = new THREE.SphereGeometry(20, 25, 25);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFF00, map: sunTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

sun.position.set(100, 40, -110);

scene.add(sun);


//moon

const moonTexture = textureLoader.load(BASE + 'assets/images/moon.jpg');
const moon3dTexture = textureLoader.load(BASE + 'assets/images/moonSurface.jpg');
// Reduced from 64x64 to 32x32 segments — virtually indistinguishable at render distance
const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({
  color: 0x202020,
  map: moonTexture,
  normalMap: moon3dTexture,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
var vh = window.innerHeight;
var iw = window.innerWidth;
var aspect = iw / vh;



// moon.position.set(-1.8, -3.6, -vh/3.318);
moon.position.set(1000, 1000, -500);
moon.rotation.x = 0.775;
moon.rotation.y = 0.674;
scene.add(moon);

// smartphone.position.x += -0.1;
//   smartphone.position.y += 2.66;
//   smartphone.position.z -= 1.5;
var smartphoneZrotation;
//phone 
const loader = new GLTFLoader(loadingManager);
var smartphone;
// Create a clean texture for the phone screen with no text content
function createLinkedInTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Dark display background
  ctx.fillStyle = '#0d1020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft screen glow and subtle paneling without any written data
  const glow = ctx.createRadialGradient(256, 380, 40, 256, 380, 320);
  glow.addColorStop(0, 'rgba(65, 120, 255, 0.28)');
  glow.addColorStop(0.45, 'rgba(30, 56, 120, 0.18)');
  glow.addColorStop(1, 'rgba(13, 16, 32, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(120, 160, 255, 0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 120, 408, 784);

  ctx.fillStyle = 'rgba(120, 160, 255, 0.08)';
  ctx.fillRect(76, 170, 360, 180);
  ctx.fillRect(76, 390, 360, 110);
  ctx.fillRect(76, 530, 360, 110);
  ctx.fillRect(76, 670, 360, 110);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const profileTexture = createLinkedInTexture();
profileTexture.flipY = false;
profileTexture.repeat.set(1, 1);
profileTexture.offset.set(0, 0);

desktopAssetLoaders.push(() => {
  loader.load(BASE + 'assets/models/newSmartphone.glb', (gltf) => {
    smartphone = gltf.scene;
    smartphone.position.set(100, 100, -400);
    smartphone.scale.setScalar(0.64);
    smartphoneZrotation = smartphone.rotation.z;

    // Directly remap the phone's main screen mesh only (Plane007_1 = glass display)
    smartphone.traverse(child => {
      if (child.isMesh && child.name === "Plane007_1") {
        child.material = child.material.clone(); // clone to avoid mutating shared material
        child.material.map = profileTexture;
        child.material.emissive = new THREE.Color(0x4a5ca8);
        child.material.emissiveMap = profileTexture;
        child.material.emissiveIntensity = 0.025;
        child.material.needsUpdate = true;
        child.frustumCulled = false;
      }
    });

    // Add a screen backlight glow ΓÇö soft blue light emanating from the front of the phone
    const screenGlow = new THREE.PointLight(0x4a5ca8, 0.22, 2.4);
    screenGlow.position.set(0, 0.65, 0.3); // Slightly in front of screen
    smartphone.add(screenGlow);

    window.debugSmartphone = smartphone;
    scene.add(smartphone);
  }, undefined, (err) => {
    console.log(err);
  });
});
// gltf.scene.position.set(0, 0, 0);

// Use a separate loader for heavy background assets so they don't block the initial page load
const backgroundLoader = new GLTFLoader(); 

//cursor
var amongus, amongusCollider, amongusBody;
desktopAssetLoaders.push(() => {
  backgroundLoader.load(BASE + 'assets/models/amongus.glb', (gltf) => {
    amongus = gltf.scene;
    amongus.position.set(0, 0, -2);
    scene.add(amongus);

    initAmongusPhysics();
  }, undefined, (err) => {
    console.log(err);
  });
});

function initAmongusPhysics() {
  if (!amongus || !world || !RAPIER) return;

  amongusBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.kinematicPositionBased()
      .setTranslation(amongus.position.x, amongus.position.y, amongus.position.z)
  );

  amongusCollider = world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.1, 0.1, 0.1).setRestitution(1),
    amongusBody
  );
}

let mouse = new Vector2();
document.addEventListener('pointermove', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(mouseX, mouseY);
});

const rayCaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 2)
//for cursor end here
var string = `+------------------------------+
|    WELCOME STRANGER     |
|          Scroll Down           |
+------------------------------+`
const fontLoader = new FontLoader(loadingManager); // Text is critical for first impression, so we wait for it
fontLoader.load(BASE + 'assets/fonts/font2.json', function (font) {
  const textGeometry = new TextGeometry(string, {
    font: font,
    size: 0.1,
    height: 0.6,
    curveSegments: 22,
    bevelEnabled: true,
    bevelThickness: 0.0001,
    bevelSize: .0003,
    bevelOffset: 0,
    bevelSegments: 3,
    depth: 0.002,
  });

  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xFDBB2D });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(0.44, 0.35, -2);
  scene.add(textMesh);
  const box = new THREE.Box3().setFromObject(textMesh);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  window._textPendingPhysics = { textMesh, size, center };
  initTextPhysics();
});


const torusTexture = textureLoader.load(BASE + 'assets/images/grad.jpg');
var pivot = new THREE.Object3D();
const torusgeometry = new THREE.TorusGeometry(0.3, 0.1, 12, 48);
const torusmaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, map: torusTexture });
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
pivot.add(torus);
torus.position.set(2, 1.5, 0);
scene.add(pivot);

var rocket;
desktopAssetLoaders.push(() => {
  backgroundLoader.load(BASE + 'assets/models/rocket.glb', (gltf) => {
    rocket = gltf.scene;
    rocket.traverse((child) => {
      if (child.isMesh) {
        child.layers.set(1); // Set to layer 1
      }
    });
    // rocket.position.set(0, 0, -10);

    pivot.add(rocket);
    rocket.position.set(0, 0, 50);
    rocket.rotation.x = 2.8;
    rocket.rotation.y = 3;
    rocket.rotation.z = 1.5;
  });
});

var laptop;
desktopAssetLoaders.push(() => {
  backgroundLoader.load(BASE + 'assets/models/laptop2.glb', (gltf) => {
    laptop = gltf.scene;
    laptop.position.set(0, 300, -800)
    scene.add(laptop);
  });
});


const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("extra").appendChild(css3dRenderer.domElement);

const div = document.createElement('div');
div.style.width = '1128px';
div.style.height = '645px';
div.style.backgroundColor = '#aaaaaa';
div.style.transform = `scale(0.2)`;
div.id = "saviorOfScrolls";
div.style.pointerEvents = 'auto';

const iframe = document.createElement('iframe');
iframe.style.width = '1128px';
iframe.style.height = '645px';
iframe.style.border = '0px';
iframe.src = BASE + 'iframes/index.html';
iframe.style.pointerEvents = 'auto';
div.appendChild(iframe);


const screen = new CSS3DObject(div);
scene.add(screen);
screen.position.set(0, 0, -100);
screen.visible = false;




function getIframePointFromViewport(frameElement, clientX, clientY) {
  const rect = frameElement.getBoundingClientRect();
  if (
    rect.width <= 0 ||
    rect.height <= 0 ||
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return null;
  }

  const frameWindow = frameElement.contentWindow;
  if (!frameWindow) return null;

  return {
    x: ((clientX - rect.left) / rect.width) * frameWindow.innerWidth,
    y: ((clientY - rect.top) / rect.height) * frameWindow.innerHeight
  };
}

function resolveNestedFrameTarget(frameWindow, pointX, pointY) {
  let activeWindow = frameWindow;
  let x = pointX;
  let y = pointY;

  for (let depth = 0; depth < 4; depth++) {
    let activeDocument;
    try {
      activeDocument = activeWindow.document;
    } catch {
      return null;
    }
    const target = activeDocument.elementFromPoint(x, y);

    if (!target) return null;

    if (target.tagName === 'IFRAME') {
      try {
        const nextWindow = target.contentWindow;
        if (!nextWindow) {
          return { target, ownerWindow: activeWindow, x, y };
        }
        nextWindow.document;

        const nestedPoint = getIframePointFromViewport(target, x, y);
        if (!nestedPoint) {
          return { target, ownerWindow: activeWindow, x, y };
        }

        activeWindow = nextWindow;
        x = nestedPoint.x;
        y = nestedPoint.y;
        continue;
      } catch {
        return { target, ownerWindow: activeWindow, x, y };
      }
    }

    return { target, ownerWindow: activeWindow, x, y };
  }

  return null;
}

function forwardLaptopMouseEvent(sourceEvent, type) {
  if (!screen.visible || currentSection !== 2 || smartphoneMode) return false;

  const viewportPoint = getIframePointFromViewport(iframe, sourceEvent.clientX, sourceEvent.clientY);
  if (!viewportPoint) return false;

  const frameWindow = iframe.contentWindow;
  if (!frameWindow) return false;

  const resolvedTarget = resolveNestedFrameTarget(frameWindow, viewportPoint.x, viewportPoint.y);
  if (!resolvedTarget) return false;

  const { target, ownerWindow, x, y } = resolvedTarget;

  if ((type === 'mousedown' || type === 'click') && typeof target.focus === 'function') {
    target.focus({ preventScroll: true });
  }

  const forwardedEvent = new ownerWindow.MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    clientX: x,
    clientY: y,
    button: sourceEvent.button ?? 0,
    buttons: sourceEvent.buttons ?? 0,
    ctrlKey: sourceEvent.ctrlKey,
    shiftKey: sourceEvent.shiftKey,
    altKey: sourceEvent.altKey,
    metaKey: sourceEvent.metaKey,
    detail: sourceEvent.detail ?? (type === 'dblclick' ? 2 : 1)
  });

  target.dispatchEvent(forwardedEvent);
  return true;
}

['mousedown', 'mouseup', 'click', 'dblclick'].forEach((eventType) => {
  css3dRenderer.domElement.addEventListener(eventType, (event) => {
    if (forwardLaptopMouseEvent(event, eventType)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
});


let currentSection = 0;
const totalSections = 3;
var lastSection = 0;
var smartphoneMode = false;  //remember to turn it false
var timerStarted = false;
var laptopInitiated = false;
var onceForLaptop = true;
let screenShowTimeout;
let screenHideTimeout;

function clearLaptopScreenTimers() {
  if (screenShowTimeout) {
    clearTimeout(screenShowTimeout);
    screenShowTimeout = undefined;
  }
  if (screenHideTimeout) {
    clearTimeout(screenHideTimeout);
    screenHideTimeout = undefined;
  }
}

function hideLaptopScreen() {
  clearLaptopScreenTimers();
  // Animate screen off
  const div = screen.element;
  div.classList.remove('screen-on');
  screenHideTimeout = setTimeout(() => {
    if (currentSection !== 2) {
      screen.visible = false;
    }
    screenHideTimeout = undefined;
  }, 700); // match CSS transition
}

function queueLaptopScreenShow(delay) {
  clearLaptopScreenTimers();
  screenShowTimeout = setTimeout(() => {
    if (currentSection === 2) {
      screen.visible = true;
      // Animate screen on
      const div = screen.element;
      div.classList.remove('screen-on');
      setTimeout(() => {
        div.classList.add('screen-on');
      }, 10); // allow visible to take effect first
    }
    screenShowTimeout = undefined;
  }, delay);
}

function syncInitialSectionState() {
  currentSection = 0;
  lastSection = 0;
  resetInitialScrollPosition();
}

syncInitialSectionState();

function navigateToSection(index) {
  if (index < 0 || index >= totalSections || smartphoneMode || timerStarted) return;
  
  timerStarted = true;
  lastSection = currentSection;
  currentSection = parseInt(index);

  // Update dots
  document.getElementById(lastSection).classList.remove("selected");
  document.getElementById(currentSection).classList.add("selected");

  // Perform scroll
  window.scrollTo({
    top: currentSection * window.innerHeight,
    behavior: 'smooth'
  });

  // Handle laptop screen visibility
  if (currentSection != 2) {
    hideLaptopScreen();
  } else {
    if (laptopInitiated) {
      queueLaptopScreenShow(lastSection == 0 ? 800 : 500);
    } else {
      laptopInitiated = true;
      queueLaptopScreenShow(2500);
    }
  }

  // Debounce
  setTimeout(() => {
    timerStarted = false;
  }, 1400);
}

document.querySelectorAll(".dot").forEach((el) => {
  el.addEventListener("click", (e) => {
    navigateToSection(el.id);
  });
});

// Keyboard navigation (Arrows, PageUp/Down, Home/End)
window.addEventListener('keydown', (e) => {
  if (smartphoneMode) return;
  
  const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
  if (keys.includes(e.key)) {
    e.preventDefault(); // Stop native scrolling
    
    if (timerStarted) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      navigateToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      navigateToSection(currentSection - 1);
    } else if (e.key === 'Home') {
      navigateToSection(0);
    } else if (e.key === 'End') {
      navigateToSection(totalSections - 1);
    }
  }
});

// Focus/Tab navigation synchronization
window.addEventListener('focusin', (e) => {
  const section = e.target.closest('.scroll-section');
  if (section) {
    const sections = Array.from(document.querySelectorAll('.scroll-section'));
    const index = sections.indexOf(section);
    if (index !== -1 && index !== currentSection) {
      // Don't prevent default here as we want the focus to happen, 
      // but sync our internal state and 3D camera.
      lastSection = currentSection;
      currentSection = index;
      
      document.getElementById(lastSection).classList.remove("selected");
      document.getElementById(currentSection).classList.add("selected");
      
      if (currentSection != 2) {
        hideLaptopScreen();
      } else {
        if (laptopInitiated) {
          queueLaptopScreenShow(500);
        } else {
          laptopInitiated = true;
          queueLaptopScreenShow(2500);
        }
      }
    }
  }
});

document.getElementById(currentSection).classList.add("selected");

document.querySelectorAll(".body").forEach((el) => {
  el.addEventListener("wheel", (e) => {
    e.stopPropagation();
    // console.log("body scroll");
  })
})

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (timerStarted || smartphoneMode) return;

  if (e.deltaY > 0) {
    navigateToSection(currentSection + 1);
  } else if (e.deltaY < 0) {
    navigateToSection(currentSection - 1);
  }
}, { passive: false });


//lights
const pointLight = new THREE.PointLight(0xfff0bb, 10, 100);
pointLight.position.copy(moon.position);
pointLight.position.x += 3;
pointLight.position.y += 4;
pointLight.position.z += -1.6;
scene.add(pointLight);

const pointLightLaptop = new THREE.PointLight(0xffffff, 10, 100);
pointLightLaptop.position.z = 2;
scene.add(pointLightLaptop);




const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const ambientLight2 = new THREE.AmbientLight(0x010101);
ambientLight2.layers.set(1);
scene.add(ambientLight2);


//sunlight
const sunlight = new THREE.DirectionalLight(0xfff0bb, 0.72);
sunlight.position.set(100, 100, 100);
sunlight.position.copy(sun.position);
scene.add(sunlight);


//fog
// scene.fog = new THREE.FogExp2( 0xffffff, .012 );




//helpers

const lightHelper = new THREE.PointLightHelper(pointLightLaptop);
const gridHelper = new THREE.GridHelper(200, 300);

// scene.add( lightHelper); 

// const controls = new OrbitControls( camera, renderer.domElement );


let resizeTimeout;
window.addEventListener('resize', () => {
  // Debounce resize to avoid thrashing
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    vh = window.innerHeight;
    iw = window.innerWidth;
    aspect = iw / vh;
    visibleMoonPos.set(-2.6, -4.2, -(vh / 3.318));
    visibleLaptopPos.set(0, -7, -((vh * 0.6) + 24));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(Math.floor(window.innerWidth / 1.5), Math.floor(window.innerHeight / 1.5));
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  }, 150);
}, false);

function checkMobileOverlay() {
  if (window.innerWidth <= 1024) {
    const frame = document.getElementById('mobile-game-frame');
    if (frame && !frame.src && frame.getAttribute('data-src')) {
      frame.src = frame.getAttribute('data-src');
    }
  } else {
    if (window.loadDesktopAssets) {
      window.loadDesktopAssets();
    }
  }
}
window.addEventListener('resize', checkMobileOverlay);
checkMobileOverlay();

const moonPos = new THREE.Vector3(100, 100, -400);
const laptopPos = new THREE.Vector3(0, 300, -800);
const phoneWidth = 500;
const phoneHeight = 800;
const hiddenMoonPos = new THREE.Vector3(1000, 1000, -500);
const visibleMoonPos = new THREE.Vector3(-2.6, -4.2, -(vh / 3.318));
const hiddenLaptopPos = new THREE.Vector3(0, 300, -800);
const visibleLaptopPos = new THREE.Vector3(0, -7, -((vh * 0.6) + 24));
const snapThreshold = 0.015;
const cameraSnapThreshold = 0.02;

function getSectionCameraZ(sectionIndex) {
  return -(sectionIndex * vh * 0.3);
}

function smoothToTarget(object, target, smoothing) {
  if (!object) return;

  object.position.lerp(target, smoothing);

  if (object.position.distanceToSquared(target) < snapThreshold * snapThreshold) {
    object.position.copy(target);
  }
}

function updateSectionTargets() {
  if (currentSection == 1) {
    moonPos.copy(visibleMoonPos);
  } else {
    moonPos.copy(hiddenMoonPos);
  }
}

// Pre-allocate reusable vectors to avoid per-frame garbage collection
const _animTargetPoint = new THREE.Vector3();
const _animPhoneTargetPos = new THREE.Vector3();
const _animDir = new THREE.Vector3();
const _animPhonePos = new THREE.Vector3();
const _animLaptopTargetCamPos = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  if (window.innerWidth <= 1024) return; // Pause heavy 3D rendering on mobile for performance
  const deltaTime = clock.getDelta();
  const lerpSpeed = 6;
  const cameraTargetZ = getSectionCameraZ(currentSection);
  camera.position.z = THREE.MathUtils.lerp(
    camera.position.z,
    cameraTargetZ,
    1 - Math.exp(-7 * deltaTime)
  );
  if (Math.abs(camera.position.z - cameraTargetZ) < cameraSnapThreshold) {
    camera.position.z = cameraTargetZ;
  }

  sun.rotation.x += 0.0001;
  sun.rotation.y += 0.0002;

  if (world)
    world.step();

  for (const [mesh, body] of dynamicBodies) {
    const pos = body.translation();
    const rot = body.rotation();
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  }

  if (amongus) {
    rayCaster.setFromCamera(mouse, camera);
    // Reuse pre-allocated vector instead of allocating each frame
    rayCaster.ray.intersectPlane(plane, _animTargetPoint);

    amongus.position.lerp(_animTargetPoint, 1 - Math.exp(-1.5 * deltaTime));
    var x = amongus.position.x;
    var y = amongus.position.y;
    var z = amongus.position.z;
    amongusBody.setNextKinematicTranslation({ x, y, z });
    amongus.rotation.z += Math.sin(60) * 0.006;

    amongus.rotation.x += (mouse.x - amongus.rotation.x) * 0.1;
    amongus.rotation.y += (mouse.y - amongus.rotation.y) * 0.1;
  }
  updateSectionTargets();
  smoothToTarget(moon, moonPos, 1 - Math.exp(-10 * deltaTime));

  if (smartphone) {
    pivot.position.copy(smartphone.position);

    pivot.rotation.y += 0.003;
    torus.rotation.x += 0.006;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.005;

    // Reuse pre-allocated vector
    _animPhoneTargetPos.set(
      moon.position.x + -0.1,
      moon.position.y + 2.701,
      moon.position.z - 1.3
    );

    smartphone.position.lerp(_animPhoneTargetPos, 1 - Math.exp(-lerpSpeed * deltaTime));
    if (smartphone && currentSection == 1) {
      if (phoneFullscreen == true) {
        smartphone.rotation.z = smartphone.rotation.z + ((-(Math.PI / 2)) - smartphone.rotation.z) * 0.04;

        camera.getWorldDirection(_animDir);
        _animPhonePos.copy(camera.position).add(_animDir.multiplyScalar(0));
        _animPhonePos.x += -0.7;
        _animPhonePos.y += 1.4;
        _animPhonePos.z += 1;
        smartphone.position.lerp(_animPhonePos, 1 - Math.exp(-6 * deltaTime));

      }

      else if (nophonefullscreen) {
        smartphone.rotation.z = smartphone.rotation.z + (smartphoneZrotation - smartphone.rotation.z) * 0.04;

        _animPhoneTargetPos.set(
          moon.position.x + 0.3,
          moon.position.y + 2.701,
          moon.position.z - 1.3
        );

        smartphone.position.lerp(_animPhoneTargetPos, 1 - Math.exp(-lerpSpeed * deltaTime));
      }

    }

  }

  if (currentSection == 2 && onceForLaptop) {
    let t = document.body.getBoundingClientRect().top;
    if ((-t < (vh * 2 + 50)) && (-t >= (vh * 2) - 50)) {
      camera.getWorldDirection(_animDir);

      const targetZ = getSectionCameraZ(2);
      _animLaptopTargetCamPos.set(0, 0, targetZ);

      laptopPos.copy(_animLaptopTargetCamPos).add(_animDir.multiplyScalar(0.18));
      laptop.lookAt(_animLaptopTargetCamPos);
      laptop.rotation.x = 0;
      laptop.rotation.y = 0;
      laptop.rotation.z = 0;

      onceForLaptop = false;
    }
    pointLightLaptop.position.lerp(laptop.position, 1 - Math.exp(-6 * deltaTime));
    pointLightLaptop.position.z += 0.1;
    pointLightLaptop.position.y += 0.1;
  }
  if (laptop) {
    laptop.position.lerp(laptopPos, 1 - Math.exp(-7 * deltaTime));
    laptop.position.y = -0.09;
    screen.position.copy(laptop.position);
    screen.quaternion.copy(laptop.quaternion);
    screen.rotation.x = -0;
    screen.position.x += 0;
    screen.position.y += 50;
    screen.position.z -= 800;
  }

  bloomComposer.render();
  css3dRenderer.render(scene, camera);
}
camera.layers.enable(1);

animate();

let horizontalPhoneDOM = document.getElementById("horizontalPhoneScreen");
const moonContent = document.getElementById("moonContent");
const scrollTeller = document.getElementById("scrollTeller");
const loadingScreen = document.getElementById("loading");
const screenContent = document.getElementById("screenContent");
const curtains = document.querySelector(".curtains");
const leftCurtain = document.querySelector(".leftHalf");
const rightCurtain = document.querySelector(".rightHalf");


let phoneFullscreen = false;
let nophonefullscreen = false;
const phoneTransitionTimeouts = [];

function clearPhoneTransitionTimeouts() {
  while (phoneTransitionTimeouts.length) {
    clearTimeout(phoneTransitionTimeouts.pop());
  }
}

function schedulePhoneTransition(callback, delay) {
  const timeoutId = setTimeout(() => {
    const timeoutIndex = phoneTransitionTimeouts.indexOf(timeoutId);
    if (timeoutIndex >= 0) {
      phoneTransitionTimeouts.splice(timeoutIndex, 1);
    }
    callback();
  }, delay);

  phoneTransitionTimeouts.push(timeoutId);
  return timeoutId;
}

function resetPhoneOverlayState() {
  loadingScreen.classList.remove("hidden");
  loadingScreen.style.display = "";
  screenContent.classList.add("displayHide");
  curtains.classList.add("displayHide");
  curtains.style.display = "";
  leftCurtain.classList.remove("hoverLeft");
  rightCurtain.classList.remove("hoverRight");
  horizontalPhoneDOM.classList.add("displayHide");
  horizontalPhoneDOM.style.opacity = "0";
  horizontalPhoneDOM.style.pointerEvents = "none";
}

resetPhoneOverlayState();

function PhoneFullscreenModeSwitch() {
  if ((!phoneFullscreen && !nophonefullscreen) || (!phoneFullscreen && nophonefullscreen)) {
    smartphoneMode = true;
    phoneFullscreen = true;
    nophonefullscreen = false;
    clearPhoneTransitionTimeouts();
    resetPhoneOverlayState();
    
    // Smoothly hide content to focus on 3D transition
    moonContent.classList.add("hidden");
    scrollTeller.classList.add("hidden");

    // DELAY the overlay appearance until the 3D phone is zooming in
    schedulePhoneTransition(() => {
      horizontalPhoneDOM.classList.remove("displayHide");
      // Use opacity for smooth fade after 3D animation starts
      schedulePhoneTransition(() => {
        horizontalPhoneDOM.style.opacity = "1";
        horizontalPhoneDOM.style.pointerEvents = "auto";
      }, 50);
    }, 1200); // Increased delay to ensure 3D phone is nearly in place

    // Close curtains / start loader
    schedulePhoneTransition(() => {
      moonContent.classList.add("displayHide");
      scrollTeller.classList.add("displayHide");
    }, 500);

    //loading screen
    schedulePhoneTransition(() => {
      loadingScreen.classList.add("hidden");
    }, 1800);
    schedulePhoneTransition(() => {
      loadingScreen.style.display = "none";
      screenContent.classList.remove("displayHide");
      homeSection.classList.remove("displayHide");
      curtains.classList.remove("displayHide");
    }, 2400);
    schedulePhoneTransition(() => {
      rightCurtain.classList.add("hoverRight");
      leftCurtain.classList.add("hoverLeft");
    }, 2600);
    schedulePhoneTransition(() => {
      curtains.style.display = "none";
    }, 3600);
    //loading end here

  } else {
    smartphoneMode = false;
    phoneFullscreen = false;
    nophonefullscreen = true;
    clearPhoneTransitionTimeouts();
    scrollTeller.classList.remove("hidden");
    moonContent.classList.remove("hidden");
    // Fade out and disable pointer events
    horizontalPhoneDOM.style.opacity = "0";
    horizontalPhoneDOM.style.pointerEvents = "none";
    
    schedulePhoneTransition(() => {
      resetPhoneOverlayState();
      scrollTeller.classList.remove("displayHide");
      moonContent.classList.remove("displayHide");
    }, 1200); // Match transition time in CSS
  }
}
window.PhoneFullscreenModeSwitch = PhoneFullscreenModeSwitch;


function getScreenPosition(object3D, camera) {
  let vector = new THREE.Vector3();
  let canva = renderer.domElement;
  renderer.domElement.style.transform = `translateX(-50%) translateY(-50%)`;
  vector.copy(object3D.position);
  vector.project(camera);

  return {
    x: (vector.x + 1) / 2 * canva.clientWidth,
    y: (-vector.y + 1) / 2 * canva.clientHeight
  };
};

let homeSection = document.getElementById("homeSection");
let aboutSection = document.getElementById("aboutSection");
let experienceSection = document.getElementById("experienceSection");
let openSourceSection = document.getElementById("openSourceSection");
let projectSection = document.getElementById("projectSection");
let githubSection = document.getElementById("githubSection");
let contactSection = document.getElementById("contactSection");

let currentScene = homeSection;
function changeScene(to) {
  // console.log(to);
  currentScene.classList.add("displayHide");
  currentScene = document.getElementById(to);
  currentScene.classList.remove("displayHide");

}

window.changeScene = changeScene

// Contact Form AJAX Submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.contactSubmit');
      const originalBtnText = submitBtn.textContent;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.style.display = 'block';
      formStatus.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      formStatus.style.color = 'white';
      formStatus.textContent = 'Sending your message...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
          formStatus.style.color = '#28a745';
          formStatus.textContent = 'Message sent successfully!';
          contactForm.reset();
        } else {
          const data = await response.json();
          formStatus.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
          formStatus.style.color = '#dc3545';
          formStatus.textContent = data.message || 'Oops! There was a problem submitting your form';
        }
      } catch (error) {
        formStatus.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
        formStatus.style.color = '#dc3545';
        formStatus.textContent = 'Oops! There was a problem connecting to the server';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.button === 1) { // 1 = middle mouse button
    e.preventDefault();
  }
});




















// else {
//   setTimeout(() => {
//     const hiddenPos = new THREE.Vector3(100, 100, -600);
//     smartphone.position.lerp(hiddenPos, 0.05);

//     const hiddenPosMoon = new THREE.Vector3(250, 450, -1000);
//     moon.position.lerp(hiddenPosMoon, 0.05);
//   }, 300);
// }



// var lastScroll = 0;
// window.onscroll = () => scrollCheck();
// function scrollCheck() {
//   let t = document.body.getBoundingClientRect().top;
//   t = Math.abs(t);
//   console.log(t);
//   if(t > lastScroll){
//     //scroll down
//     // console.log("scroll down");
//     lastScroll = t;
//     if(t < 10){
//       //scroll to moon
//       window.scrollTo({
//         top: 990,
//         behavior: "smooth",
//       });
//       // camera.lookAt(moon.position);
//     }
//   } else {
//     //scroll up
//     // console.log("scroll up");
//     if(t < 1000 && t > 900){
//       window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//       });

//     }
//     lastScroll = t;
//   }
// }

// GitHub Integration Functions
async function fetchGitHubData(username) {
  const contentEl = document.getElementById('github-content');
  const errorEl = document.getElementById('github-error');

  if (!contentEl || !errorEl) return;

  // No more explicit loader element, just fade in the content once ready
  contentEl.style.opacity = '0.3';
  errorEl.classList.add('displayHide');

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
    ]);

    if (profileRes.status === 403 || reposRes.status === 403) {
      throw new Error('RATE_LIMIT');
    }

    if (!profileRes.ok || !reposRes.ok) throw new Error('FAILED');

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();
    const eventsData = await eventsRes.json();

    updateGitHubUI(profileData, reposData, eventsData);

    contentEl.classList.remove('displayHide');
    contentEl.style.opacity = '1';
  } catch (error) {
    console.error('GitHub Fetch Error:', error);
    errorEl.classList.remove('displayHide');
    if (error.message === 'RATE_LIMIT') {
      errorEl.innerHTML = '<p>GitHub API Rate Limit reached. <br> Please wait a few minutes and try again.</p>';
    } else {
      errorEl.innerHTML = '<p>Failed to load GitHub data. <br> Please check your connection.</p>';
    }
  }
}

function updateGitHubUI(profile, repos, events) {
  const avatar = document.getElementById('github-avatar');
  const name = document.getElementById('github-name');
  const bio = document.getElementById('github-bio');
  const reposCount = document.getElementById('github-repos-count');
  const followers = document.getElementById('github-followers');
  const totalStars = document.getElementById('github-total-stars');
  const totalForks = document.getElementById('github-total-forks');
  const profileLink = document.getElementById('github-profile-link');
  const reposList = document.getElementById('github-repos-list');
  const graph = document.getElementById('github-graph');
  const statsCard = document.getElementById('github-stats-card');
  const languagesCard = document.getElementById('github-languages-card');
  const graphNew = document.getElementById('github-graph-new');
  const reviewsCount = document.getElementById('github-reviews');
  const commitsCount = document.getElementById('github-commits-count');
  const issuesCount = document.getElementById('github-issues-count');
  const prsCount = document.getElementById('github-prs-count');
  const timeline = document.getElementById('github-recent-activity');

  if (avatar) avatar.src = profile.avatar_url;
  if (name) name.textContent = profile.name || profile.login;
  if (bio) bio.textContent = profile.bio || 'No bio available';
  if (reposCount) reposCount.textContent = profile.public_repos;
  if (followers) followers.textContent = profile.followers;
  
  if (repos) {
    const starsSum = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const forksSum = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    if (totalStars) totalStars.textContent = starsSum;
    if (totalForks) totalForks.textContent = forksSum;
  }

  if (profileLink) profileLink.href = profile.html_url;

  if (graphNew) {
    graphNew.src = `https://ghchart.rshah.org/409ba5/${profile.login}`;
  }

  // Calculate Activity Stats from events
  if (events) {
    let commits = 0;
    let issues = 0;
    let prs = 0;
    let reviews = 0;

    events.forEach(event => {
      if (event.type === 'PushEvent') commits += event.payload.commits ? event.payload.commits.length : 1;
      if (event.type === 'IssuesEvent') issues++;
      if (event.type === 'PullRequestEvent') prs++;
      if (event.type === 'PullRequestReviewCommentEvent') reviews++;
    });

    if (commitsCount) commitsCount.textContent = commits;
    if (issuesCount) issuesCount.textContent = issues;
    if (prsCount) prsCount.textContent = prs;
    if (reviewsCount) reviewsCount.textContent = reviews;
  }

  if (statsCard) {
    statsCard.src = `https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff&icon_color=92fe9d&t=${Date.now()}`;
  }

  if (languagesCard) {
    languagesCard.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&layout=compact&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff&t=${Date.now()}`;
  }

  if (timeline && events) {
    timeline.innerHTML = '';
    events.slice(0, 5).forEach(event => {
      let action = '';
      let target = event.repo.name.split('/')[1];

      switch (event.type) {
        case 'PushEvent': action = `Pushed commits to <span class="activity-action">${target}</span>`; break;
        case 'WatchEvent': action = `Starred <span class="activity-action">${target}</span>`; break;
        case 'CreateEvent': action = `Created <span class="activity-action">${target}</span>`; break;
        case 'PullRequestEvent': action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} PR on <span class="activity-action">${target}</span>`; break;
        default: action = `Activity on <span class="activity-action">${target}</span>`;
      }

      const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <span class="activity-date">${date}</span>
        <p style="margin:0">${action}</p>
      `;
      timeline.appendChild(item);
    });
  }

  if (reposList) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
      const repoCard = document.createElement('div');
      repoCard.className = 'repo-card';
      repoCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
          <h4 style="margin: 0 0 5px 0; color: #92fe9d;">${repo.name}</h4>
          <p style="font-size: 13px; margin-bottom: 10px;">${repo.description || 'No description available'}</p>
          <div class="repo-meta" style="display: flex; gap: 15px; font-size: 12px; opacity: 0.6;">
            <span>Γ¡É ${repo.stargazers_count}</span>
            <span>≡ƒì┤ ${repo.forks_count}</span>
            <span>${repo.language || 'Code'}</span>
          </div>
        </a>
      `;
      reposList.appendChild(repoCard);
    });
  }
}

// Initial load for GitHub data when reaching home section
fetchGitHubData('momanamjad');

// Handle scene changes
const originalChangeScene = window.changeScene;
window.changeScene = (to) => {
  if (typeof originalChangeScene === 'function') {
    originalChangeScene(to);
  } else {
    document.querySelectorAll('.fullHeight').forEach(s => s.classList.add('displayHide'));
    document.getElementById(to).classList.remove('displayHide');
  }
};
