import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CSS3DRenderer } from "three/examples/jsm/Addons.js";

export function setupThree() {
  const canvas = document.getElementById("bg");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.layers.enable(1);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x05070c, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.domElement.style.position = 'fixed';
  css3dRenderer.domElement.style.top = '0';
  css3dRenderer.domElement.style.pointerEvents = 'none';
  css3dRenderer.domElement.style.zIndex = '10';
  document.body.appendChild(css3dRenderer.domElement);

  // Post-processing: Glowing bloom pass tailored for neon space theme
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2, // strength
    0.45, // radius
    0.15 // threshold
  );
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  return { scene, camera, renderer, css3dRenderer, composer, clock: new THREE.Clock() };
}

export function handleResize(camera, renderer, css3dRenderer, composer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
