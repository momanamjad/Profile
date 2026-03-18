# 🌌 Three.js Portfolio Project - Analysis & Study Guide

Welcome! This documentation was generated specifically to help you, a React developer, understand this vanilla Three.js project and rebuild it using React.

## 🚀 Quick Start

To run this project locally and see it in action:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Dev Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 🛠 Tech Stack

*   **Core:** [Three.js](https://threejs.org/) (Vanilla JS implementation).
*   **Build Tool:** [Vite](https://vitejs.dev/) (Fast hot module replacement).
*   **Physics:** [Rapier](https://rapier.rs/) (`@dimforge/rapier3d-compat`) - Used for the "Among Us" character and falling text.
*   **Post-Processing:** `EffectComposer` & `UnrealBloomPass` (for the glowing sun effect).
*   **Animations:** `GSAP` (loaded via CDN in `index.html`) & custom interpolation (lerping) in the render loop.
*   **CSS Integration:** `CSS3DRenderer` (to display the interactive iframe/website inside the 3D laptop screen).
*   **Styling:** Vanilla CSS (`src/style.css`) + Bootstrap 5 (CDN).

---

## 📂 Project Structure

The project is simple, with almost all logic contained in a single file.

```text
├── public/              # Static assets (images, 3D models .glb, fonts)
├── src/
│   ├── main.js          # 🧠 THE BRAIN. All 3D logic, event listeners, and animation loop.
│   └── style.css        # Global styles for the HTML overlays.
├── index.html           # Entry point. Contains HTML overlays (sections) and canvas.
└── package.json         # Dependencies.
```

---

## 🎨 Key Functionalities

1.  **Scroll-Based Navigation:**
    *   The website is divided into 3 "Sections" (0: Sun, 1: Moon/Phone, 2: Laptop).
    *   Scrolling doesn't actually scroll the page normally; it triggers a transition to the next "Scene" index.
    *   **Code:** Look for `window.addEventListener('wheel', ...)` in `main.js`.

2.  **3D Scene Transitions (Camera & Objects):**
    *   Instead of moving the camera to different rooms, the code keeps the camera mostly static (except for some Z-axis movement based on scroll) and **moves the objects** (Sun, Moon, Laptop) into view based on the current section.
    *   **Lerp (Linear Interpolation):** Smooth movement is achieved using `vector.lerp(target, alpha)` inside the `animate()` loop.

3.  **Interactive 3D Objects:**
    *   **The "Among Us" Character:** Follows the mouse cursor using Raycasting + Physics (Kinematic body).
    *   **Falling Text:** "WELCOME STRANGER" is a dynamic physics body that falls and collides.
    *   **Laptop Screen:** Uses `CSS3DRenderer` to embed a real, clickable HTML `<iframe>` inside the 3D world.

---

## ⚛️ For the React Developer: How to Read This Code

Since you know React but not Three.js, here is your "Rosetta Stone" to translate concepts.

### 1. The "Imperative" vs. "Declarative" Shift

**Vanilla Three.js (Current Code):**
You have to manually create everything, add it to the scene, and manage updates.
```javascript
// main.js
const scene = new THREE.Scene();             // 1. Create Scene
const geometry = new THREE.BoxGeometry();    // 2. Create Geometry
const material = new THREE.MeshBasicMaterial(); // 3. Create Material
const cube = new THREE.Mesh(geometry, material); // 4. Create Mesh
scene.add(cube);                             // 5. Add to Scene
```

**React (React Three Fiber - R3F):**
You declare what you want, like HTML.
```jsx
// Your Rebuild
<Canvas>
  <mesh>
    <boxGeometry />
    <meshBasicMaterial />
  </mesh>
</Canvas>
```

### 2. The Animation Loop (`animate()`)

**Current Code:**
There is a function `animate()` that calls itself recursively using `requestAnimationFrame`. This runs 60/120 times per second.
```javascript
function animate() {
  requestAnimationFrame(animate);
  
  // Logic to move objects smoothly
  object.position.lerp(targetPosition, 0.1);
  
  renderer.render(scene, camera); // Draw the frame
}
animate();
```

**React Equivalent:**
You will use the `useFrame` hook from R3F.
```jsx
import { useFrame } from '@react-three/fiber'

function MyComponent() {
  useFrame((state, delta) => {
    // This code runs every frame
    // Logic to move objects
  })
  return <mesh ... />
}
```

### 3. State Management

**Current Code:**
State is handled by global let/var variables.
```javascript
let currentSection = 0;
let smartphoneMode = false;
```

**React Equivalent:**
Use `useState` for local state or `Zustand` (very popular with R3F) for global state like "Current Section".
```javascript
const [curentSection, setCurrentSection] = useState(0);
// Or Zustand
const useStore = create(set => ({ section: 0, setSection: (n) => set({section: n}) }))
```

---

## 🗺️ Rebuilding Strategy (Step-by-Step)

Here is how you should approach rebuilding this in React:

### Phase 1: Setup
1.  Initialize a new Vite + React project.
2.  Install libraries:
    ```bash
    npm install three @types/three @react-three/fiber @react-three/drei @react-three/rapier @react-three/postprocessing lamina
    ```
    *   `@react-three/fiber`: The core renderer.
    *   `@react-three/drei`: Essential helpers (OrbitControls, Stars, Text, Html, useGLTF).
    *   `@react-three/rapier`: Physics made easy.
    *   `@react-three/postprocessing`: For the Bloom effect.

### Phase 2: Componentize
Break `main.js` into components. Don't put everything in one file!

*   `<SceneContainer />`: Holds the Canvas and Lights.
*   `<StarsBackground />`: Replace the procedural star generation loop with `<Stars />` from `drei` or a custom component.
*   `<Sun />`: Sphere mesh + Bloom effect.
*   `<Moon />`: Sphere mesh with texture maps.
*   `<Smartphone />`: Use `gltfjsx` (command line tool) to turn the `.glb` model into a React component.
    *   `npx gltfjsx public/models/newSmartphone.glb` -> Generates `NewSmartphone.jsx`.
*   `<Laptop />`: Same for the laptop model.
    *   **Challenge:** Implementing `CSS3DRenderer` in R3F. Look for `<Html transform>` from `@react-three/drei`—it does exactly what the complex `HTMLMesh/CSS3D` code does, but much easier!

### Phase 3: The Scroll Logic (The Hardest Part)
In the current code, scrolling manually calculates positions.
In R3F, used `@react-three/drei`'s **`<ScrollControls>`**.
*   It gives you a `<Scroll>` component to put HTML on top.
*   It gives you access to `scroll.offset` (0 to 1) to drive animations.

**Example Plan:**
```jsx
<ScrollControls pages={3}>
  <Scroll>
    {/* 3D Content that moves based on scroll */}
    <Experience /> 
  </Scroll>
  <Scroll html>
    {/* Your DOM Overlay (Home, About, etc.) */}
    <Interface />
  </Scroll>
</ScrollControls>
```

### Phase 4: Physics
Replace the manual Rapier setup with `<Physics>` provider from `@react-three/rapier`.
*   Current Code: `world.createRigidBody(...)`
*   React Code: `<RigidBody><mesh ... /></RigidBody>`

---

## 🔍 Deep Dive: Specific Code Blocks in `main.js`

*   **Lines 50-62 (Bloom):** Sets up the "glow" pipeline. In React, use `<EffectComposer><Bloom /></EffectComposer>`.
*   **Lines 79-90 (Sun):** Creates the sun. Note the `TextureLoader`. In React, use `useTexture`.
*   **Lines 125 (GLTFLoader):** Loads the phone. This is asynchronous. In React, `useGLTF` handles this with Suspense automatically.
*   **Lines 244-246 (CSS3DRenderer):** This creates the "screen" inside the 3D world. In React, utilize `<Html transform occlude wrapperClass="screen" position={[...]}> <iframe ... /> </Html>`.

---

## 📝 Assets Location
All your textures (`sun.png`, `moon.jpg`) and models (`models/*.glb`) are in the `public/` folder. You can copy this folder directly to your new React project's `public/` folder.
