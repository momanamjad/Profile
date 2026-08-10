import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import * as RAPIER from '@dimforge/rapier3d-compat';

const BASE = import.meta.env.BASE_URL;

export async function createSceneObjects(scene, loadingManager, world, dynamicBodies) {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const loader = new GLTFLoader(loadingManager);
  const fontLoader = new FontLoader(loadingManager);

  // Dynamic Lighting
  const solarLight = new THREE.DirectionalLight(0xffea9f, 2.2);
  solarLight.position.set(100, 40, -110);
  scene.add(solarLight);

  const ambientLight = new THREE.AmbientLight(0x1a2638, 1.5);
  scene.add(ambientLight);

  const cyanPointLight = new THREE.PointLight(0x00c9ff, 3, 50);
  cyanPointLight.position.set(0, 5, 0);
  scene.add(cyanPointLight);

  // Multi-layered Starfield Particles
  const starCount = 1200;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const palette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0x00c9ff),
    new THREE.Color(0x9d4edd),
    new THREE.Color(0x00ffb4)
  ];

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = THREE.MathUtils.randFloat(-400, 400);
    starPositions[i * 3 + 1] = THREE.MathUtils.randFloat(-300, 300);
    starPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-700, -50);

    const color = palette[Math.floor(Math.random() * palette.length)];
    starColors[i * 3] = color.r;
    starColors[i * 3 + 1] = color.g;
    starColors[i * 3 + 2] = color.b;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  });

  const starMesh = new THREE.Points(starGeometry, starMaterial);
  scene.add(starMesh);

  // Floating Cyber Dust Field near foreground
  const dustCount = 300;
  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = THREE.MathUtils.randFloat(-20, 20);
    dustPositions[i * 3 + 1] = THREE.MathUtils.randFloat(-15, 15);
    dustPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-25, 15);
  }

  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    size: 0.12,
    color: 0x00c9ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dustParticles);

  // Sun
  const sunTexture = textureLoader.load(BASE + 'assets/images/sun.webp');
  const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF88, map: sunTexture });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(100, 40, -110);
  scene.add(sun);

  // Moon
  const moonTexture = textureLoader.load(BASE + 'assets/images/moon.webp');
  const moon3dTexture = textureLoader.load(BASE + 'assets/images/moonSurface.webp');
  const moonGeometry = new THREE.SphereGeometry(3, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x303030, map: moonTexture, normalMap: moon3dTexture, roughness: 0.8 });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(1000, 1000, -500);
  moon.rotation.set(0.775, 0.674, 0);
  scene.add(moon);

  // Pivot & Rocket
  const pivot = new THREE.Object3D();
  scene.add(pivot);
  const torusTexture = textureLoader.load(BASE + 'assets/images/grad.jpg');
  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 12, 48), new THREE.MeshStandardMaterial({ color: 0xcccccc, map: torusTexture }));
  pivot.add(torus);
  torus.position.set(2, 1.5, 0);

  // Loaders as Promises
  const loadAmongus = () => new Promise((resolve) => {
    loader.load(BASE + 'assets/models/amongus-draco.glb', (gltf) => {
      const amongus = gltf.scene;
      amongus.position.set(0, 0, -2);
      scene.add(amongus);
      const amongusBody = world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, -2));
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 0.1, 0.1).setRestitution(1), amongusBody);
      resolve({ amongus, amongusBody });
    });
  });

  const loadRocket = () => new Promise((resolve) => {
    loader.load(BASE + 'assets/models/rocket.glb', (gltf) => {
      const rocket = gltf.scene;
      rocket.traverse(c => { if (c.isMesh) c.layers.set(1); });
      pivot.add(rocket);
      rocket.position.set(0, 0, 50);
      rocket.rotation.set(2.8, 3, 1.5);
      resolve(rocket);
    });
  });

  const loadText = () => new Promise((resolve) => {
    fontLoader.load(BASE + 'assets/fonts/font2.json', (font) => {
      const string = `+------------------------------+\n|    WELCOME STRANGER     |\n|          Scroll Down           |\n+------------------------------+`;
      const textGeometry = new TextGeometry(string, { font: font, size: 0.1, height: 0.6, curveSegments: 22, bevelEnabled: true, bevelThickness: 0.0001, bevelSize: .0003, bevelOffset: 0, bevelSegments: 3, depth: 0.002 });
      const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshStandardMaterial({ color: 0xFDBB2D }));
      textMesh.position.set(0.44, 0.35, -2);
      scene.add(textMesh);
      const box = new THREE.Box3().setFromObject(textMesh);
      const size = new THREE.Vector3(); const center = new THREE.Vector3();
      box.getSize(size); box.getCenter(center);
      const textBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(center.x, center.y - 0.2, center.z).setAdditionalMass(1000000).enabledTranslations(true, true, false));
      world.createCollider(RAPIER.ColliderDesc.cuboid(size.x / 2 - 0.17, size.y / 2 - 0.07, size.z / 2).setTranslation(0.58, 0, 0).setRestitution(1), textBody);
      dynamicBodies.push([textMesh, textBody]);
      resolve();
    });
  });

  const [{ amongus, amongusBody }, rocket] = await Promise.all([loadAmongus(), loadRocket(), loadText()]);

  return { sun, moon, amongus, amongusBody, pivot, torus, rocket, starMesh, dustParticles };
}
