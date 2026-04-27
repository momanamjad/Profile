import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const BASE = import.meta.env.BASE_URL;

export async function initLaptop(scene, loadingManager, css3dRenderer, state) {
  const loader = new GLTFLoader(loadingManager);

  const LAPTOP_MODEL_SCALE = 72;
  const LAPTOP_SCREEN_WIDTH = 1128;
  const LAPTOP_SCREEN_HEIGHT = 645;
  const LAPTOP_SCREEN_SCALE = 0.00032; // Adjusted for new width
  const LAPTOP_SCREEN_OFFSET = new THREE.Vector3(0, 0.1, -0.031);

  const div = document.createElement('div');
  div.style.width = `${LAPTOP_SCREEN_WIDTH}px`;
  div.style.height = `${LAPTOP_SCREEN_HEIGHT}px`;
  div.style.backgroundColor = '#1f1131';
  div.id = "saviorOfScrolls";
  div.style.pointerEvents = 'auto';
  div.style.overflow = 'hidden';
  div.style.borderRadius = '20px';
  div.style.boxShadow = '0 22px 60px rgba(0, 0, 0, 0.45)';

  const iframe = document.createElement('iframe');
  iframe.style.width = `${LAPTOP_SCREEN_WIDTH}px`;
  iframe.style.height = `${LAPTOP_SCREEN_HEIGHT}px`;
  iframe.style.border = '0px';
  iframe.src = BASE + 'iframes/index.html';
  iframe.style.pointerEvents = 'auto';
  div.appendChild(iframe);

  const screen = new CSS3DObject(div);
  screen.scale.setScalar(LAPTOP_SCREEN_SCALE);
  screen.visible = true;

  const laptopPromise = new Promise((resolve) => {
    loader.load(BASE + 'assets/models/laptop2.glb', (gltf) => {
      const laptop = gltf.scene;
      laptop.position.set(0, 300, -800);
      laptop.scale.setScalar(LAPTOP_MODEL_SCALE);
      laptop.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.name === 'Screen') {
            child.visible = false;
          }
          child.material = child.material.clone();
          if ('roughness' in child.material) child.material.roughness += 0.28;
        }
      });

      laptop.add(screen);
      screen.position.copy(LAPTOP_SCREEN_OFFSET);
      scene.add(laptop);
      resolve(laptop);
    });
  });

  const laptop = await laptopPromise;

  return { screen, laptop };
}
