import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import * as RAPIER from '@dimforge/rapier3d-compat';

const BASE = import.meta.env.BASE_URL;

export async function createSceneObjects(scene, loadingManager, world, dynamicBodies) {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const loader = new GLTFLoader(loadingManager);
  const fontLoader = new FontLoader(loadingManager);

  // Stars
  const starCount = 450;
  const starGeometry = new THREE.SphereGeometry(0.26, 6, 6);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const starMesh = new THREE.InstancedMesh(starGeometry, starMaterial, starCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < starCount; i++) {
    dummy.position.set(THREE.MathUtils.randFloat(-300, 300), THREE.MathUtils.randFloat(-200, 200), THREE.MathUtils.randFloat(-600, -100));
    dummy.updateMatrix();
    starMesh.setMatrixAt(i, dummy.matrix);
  }
  scene.add(starMesh);

  // Sun
  const sunTexture = textureLoader.load(BASE + 'assets/images/sun.webp');
  const sunGeometry = new THREE.SphereGeometry(20, 25, 25);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00, map: sunTexture });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(100, 40, -110);
  scene.add(sun);

  // Moon
  const moonTexture = textureLoader.load(BASE + 'assets/images/moon.jpg');
  const moon3dTexture = textureLoader.load(BASE + 'assets/images/moonSurface.jpg');
  const moonGeometry = new THREE.SphereGeometry(3, 64, 64);
  const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x202020, map: moonTexture, normalMap: moon3dTexture });
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
    loader.load(BASE + 'assets/models/amongus.glb', (gltf) => {
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

  return { sun, moon, amongus, amongusBody, pivot, torus, rocket };
}
