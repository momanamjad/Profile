import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const BASE = import.meta.env.BASE_URL;

export async function initSmartphone(scene, loadingManager) {
  const loader = new GLTFLoader(loadingManager);
  let smartphone;
  let smartphoneZrotation;

  function createLinkedInTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1020';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  const profileTexture = createLinkedInTexture();
  profileTexture.flipY = false;

  return new Promise((resolve) => {
    loader.load(BASE + 'assets/models/newSmartphone.glb', (gltf) => {
      smartphone = gltf.scene;
      smartphone.position.set(100, 100, -400);
      smartphone.scale.setScalar(0.64);
      smartphoneZrotation = smartphone.rotation.z;

      smartphone.traverse(child => {
        if (child.isMesh && child.name === "Plane007_1") {
          child.material = child.material.clone();
          child.material.map = profileTexture;
          child.material.emissive = new THREE.Color(0x4a5ca8);
          child.material.emissiveMap = profileTexture;
          child.material.emissiveIntensity = 0.025;
        }
      });

      scene.add(smartphone);
      resolve({ smartphone, smartphoneZrotation });
    });
  });
}
