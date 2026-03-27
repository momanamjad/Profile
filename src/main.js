if (window.innerWidth <= 450) {
  window.location.href = "https://momanamjad.github.io/portfolio-website-mobile-site/";
} else {
  // window.location.href = "http://localhost:5173/Portfolio/";
}

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Geometries from "three/src/renderers/common/Geometries.js";
import { cameraFar, modelPosition, threshold } from "three/tsl";
import { DirectionalLight, Vector2 } from "three/webgpu";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mx_fractal_noise_float, nodeProxy } from "three/src/nodes/TSL.js";
import { CSS3DRenderer, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import * as RAPIER from '@dimforge/rapier3d-compat';
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

let world;
async function initRapier() {
  await RAPIER.init() // This line is only needed if using the compat version
  const gravity = new RAPIER.Vector3(0.0, 0, 0.0)
  world = new RAPIER.World(gravity)
}
const dynamicBodies = []

initRapier();

const canvas = document.getElementById("bg");

const clock = new THREE.Clock();
//settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
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
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//stars
function addStar() {
  let x = THREE.MathUtils.randFloat(-300, 300);
  let y = THREE.MathUtils.randFloat(-200, 200);
  let z = THREE.MathUtils.randFloat(-600, -100);
  const starGeometry = new THREE.SphereGeometry(0.26, 25, 25);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set(x, y, z);
  scene.add(star);
}

Array(450).fill().forEach(addStar);

//sun
const sunTexture = new THREE.TextureLoader().load('./sun.png');
const sun3dTexture = new THREE.TextureLoader().load('./sunTexture.jpg');
const sunGeometry = new THREE.SphereGeometry(20, 25, 25);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFF00, map: sunTexture,
  // normalMap: sun3dTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

sun.position.set(100, 40, -110);

scene.add(sun);


//moon

const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const moon3dTexture = new THREE.TextureLoader().load('./moonSurface.jpg');
const moonGeometry = new THREE.SphereGeometry(3, 300, 300);
const moonMaterial = new THREE.MeshStandardMaterial({
  color: 0x202020,
  map: moonTexture,
  normalMap: moon3dTexture,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
var vh = window.innerHeight;
var iw = window.innerWidth;
var aspect = iw / vh;



// console.log(aspect);
console.log("vh - " + vh, "iw - " + iw);
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
const loader = new GLTFLoader();
var smartphone;
const profileTexture = new THREE.TextureLoader().load('./me.jpeg');
profileTexture.colorSpace = THREE.SRGBColorSpace;

loader.load('models/newSmartphone.glb', (gltf) => {
  smartphone = gltf.scene;
  smartphone.position.set(100, 100, -400);
  smartphoneZrotation = smartphone.rotation.z;

  // Create a plane with the profile picture and attach it to the phone screen
  const screenPlane = new THREE.PlaneGeometry(0.58, 1.25);
  const screenMaterial = new THREE.MeshBasicMaterial({
    map: profileTexture,
    toneMapped: false,
    side: THREE.DoubleSide
  });
  const screenMesh = new THREE.Mesh(screenPlane, screenMaterial);
  // Position the plane on the phone's screen area (front face)
  screenMesh.position.set(0, 0.02, 0.06);
  smartphone.add(screenMesh);
  window.debugScreenMesh = screenMesh;
  window.debugSmartphone = smartphone;
  
  scene.add(smartphone);
}, undefined, (err) => {
  console.log(err);
});
// gltf.scene.position.set(0, 0, 0);

//cursor
var amongus, amongusCollider, amongusBody;
loader.load('models/amongus.glb', (gltf) => {
  amongus = gltf.scene;
  amongus.position.set(0, 0, -2);
  scene.add(amongus);

  amongusBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.kinematicPositionBased()
      .setTranslation(amongus.position.x, amongus.position.y, amongus.position.z)
  );

  // 🧠 Create a box collider — adjust size to match your model
  amongusCollider = world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.1, 0.1, 0.1).setRestitution(1),
    amongusBody
  );

}, undefined, (err) => {
  console.log(err);
});

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
const fontLoader = new FontLoader();
fontLoader.load('./fonts/font2.json', function (font) {
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

  const textBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(center.x, center.y - 0.2, center.z).setAdditionalMass(1000000).enabledTranslations(true, true, false)
  );
  const textShape = RAPIER.ColliderDesc.cuboid(size.x / 2 - 0.17, size.y / 2 - 0.07, size.z / 2).setTranslation(0.58, 0, 0).setRestitution(1);
  world.createCollider(textShape, textBody);

  dynamicBodies.push([textMesh, textBody]);
});


const torusTexture = new THREE.TextureLoader().load('./grad.jpg');
var pivot = new THREE.Object3D();
const torusgeometry = new THREE.TorusGeometry(0.3, 0.1, 12, 48);
const torusmaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, map: torusTexture });
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
pivot.add(torus);
torus.position.set(2, 1.5, 0);
scene.add(pivot);

var rocket;
loader.load('models/rocket.glb', (gltf) => {
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

var laptop;
loader.load('models/laptop2.glb', (gltf) => {
  laptop = gltf.scene;
  laptop.position.set(0, 300, -800)
  scene.add(laptop);
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
iframe.src = 'https://momanamjad.github.io/portfolioSideMission/';
iframe.style.pointerEvents = 'auto';
div.appendChild(iframe);


const screen = new CSS3DObject(div);
scene.add(screen);
screen.position.set(0, 0, -100);
screen.visible = false;


let currentSection = 0;
const totalSections = 3;
var lastSection = 0;
var smartphoneMode = false;  //remember to turn it false
var timerStarted = false;
var laptopInitiated = false;

document.querySelectorAll(".dot").forEach((el) => {
  el.addEventListener("click", (e) => {
    lastSection = currentSection;
    document.getElementById(lastSection).classList.remove("selected");
    currentSection = el.id;
    // console.log(nextSection);
    window.scrollTo({
      top: currentSection * window.innerHeight,
      behavior: 'smooth'
    });
    document.getElementById(currentSection).classList.add("selected");
    console.log(lastSection, currentSection);


    if (currentSection != 2) {
      screen.visible = false;
    }
    else if (currentSection == 2) {
      if (laptopInitiated) {
        if (lastSection == 0) {
          setTimeout(() => {
            screen.visible = true;
          }, 800);
        } else {
          setTimeout(() => {
            screen.visible = true;
          }, 500);
        }
      } else {
        laptopInitiated = true;
        setTimeout(() => {
          screen.visible = true;
        }, 2500);
      }
    }
  });
});

document.getElementById(currentSection).classList.add("selected");

document.querySelectorAll(".body").forEach((el) => {
  el.addEventListener("wheel", (e) => {
    e.stopPropagation();
    // console.log("body scroll");
  })
})

window.addEventListener('wheel', (e) => {

  // console.log(e);
  e.preventDefault();
  if (!smartphoneMode && timerStarted == false) {
    timerStarted = true;
    lastSection = currentSection;
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
      currentSection--;
    }
    console.log(lastSection, currentSection);

    if (currentSection == 1) {
      screen.visible = false;
    }
    else if (currentSection == 2) {
      if (laptopInitiated) {
        setTimeout(() => {
          screen.visible = true;
        }, 500);
      } else {
        laptopInitiated = true;
        setTimeout(() => {
          screen.visible = true;
        }, 2500);
      }
    }
    // console.log(currentSection);
    document.getElementById(lastSection).classList.remove("selected");
    document.getElementById(currentSection).classList.add("selected");
    window.scrollTo({
      top: currentSection * window.innerHeight,
      behavior: 'smooth'
    });


    setTimeout(() => {
      timerStarted = false;
    }, 700);
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




const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const ambientLight2 = new THREE.AmbientLight(0x010101);
ambientLight2.layers.set(1);
scene.add(ambientLight2);


//sunlight
const sunlight = new THREE.DirectionalLight(0xfff0bb, 1);
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


window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth <= 450) {
      window.location.href = "https://momanamjad.github.io/portfolio-website-mobile-site/";
    }
  },
  false
);


var once = true;
var finalPhonepos;
var finalMoonpos;
var onceForLaptop = true;
const moonPos = new THREE.Vector3(100, 100, -400);
const laptopPos = new THREE.Vector3(0, 300, -800);
const phoneWidth = 500;
const phoneHeight = 800;
let wait = true;

function animate() {

  requestAnimationFrame(animate);
  if (window.innerHeight != vh && wait) {

    location.reload();
    wait = false;
    setTimeout(() => {
      wait = true;
    }, 1000);
  }
  const deltaTime = clock.getDelta();
  const lerpSpeed = 6;

  let t = document.body.getBoundingClientRect().top;
  // console.log(t);
  camera.position.z = t * 0.3;
  // camera.rotation.z = t * 0.0002;
  // console.log(camera.fov);
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
    const targetPoint = new THREE.Vector3();
    rayCaster.ray.intersectPlane(plane, targetPoint);

    // Optionally smooth the movement
    amongus.position.lerp(targetPoint, 1 - Math.exp(-1.5 * deltaTime));
    var x = amongus.position.x;
    var y = amongus.position.y;
    var z = amongus.position.z;
    amongusBody.setNextKinematicTranslation({ x, y, z });
    // amongus.rotation.x += 0.001;
    // amongus.rotation.y += 0.001;
    amongus.rotation.z += Math.sin(60) * 0.006;

    amongus.rotation.x += (mouse.x - amongus.rotation.x) * 0.1;
    amongus.rotation.y += (mouse.y - amongus.rotation.y) * 0.1;
    // amongus.rotation.z += 0.003;

  }
  if (smartphone) {
    pivot.position.copy(smartphone.position);

    pivot.rotation.y += 0.003;
    torus.rotation.x += 0.006;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.005;

    const targetPos = new THREE.Vector3(
      moon.position.x + -0.1,
      moon.position.y + 2.701,
      moon.position.z - 1.3
    );


    smartphone.position.lerp(targetPos, 1 - Math.exp(-lerpSpeed * deltaTime));

    if (currentSection == 1 && once == true) {
      //used for animation

      if ((-t < (vh + 4)) && (-t > (vh - 1))) {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        const cameraPosition = camera.position;
        moonPos.copy(cameraPosition).add(dir.multiplyScalar(6));
        moonPos.x += -2.6;
        moonPos.y += -4.2;
        moonPos.z += 4;
        once = false;
      }
      // smartphone.lookAt(camera.position);
    }
    // console.log(t, vh);
    // console.log(moonPos);

    moon.position.lerp(moonPos, 1 - Math.exp(-10 * deltaTime));

    if (smartphone && currentSection == 1) {
      if (phoneFullscreen == true) {
        smartphone.rotation.z = smartphone.rotation.z + ((-(Math.PI / 2)) - smartphone.rotation.z) * 0.04;     //magic happening here 

        //smartphone moving
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        const phonePos = new THREE.Vector3();
        phonePos.copy(camera.position).add(dir.multiplyScalar(0));
        phonePos.x += -0.7;
        phonePos.y += 1.4;
        phonePos.z += 1;
        smartphone.position.lerp(phonePos, 1 - Math.exp(-6 * deltaTime));

      }

      else if (nophonefullscreen) {
        smartphone.rotation.z = smartphone.rotation.z + (smartphoneZrotation - smartphone.rotation.z) * 0.04
        // smartphone.rotation.z = smartphoneZrotation;

        const targetPos = new THREE.Vector3(
          moon.position.x + 0.3,
          moon.position.y + 2.701,
          moon.position.z - 1.3
        );

        smartphone.position.lerp(targetPos, 1 - Math.exp(-lerpSpeed * deltaTime));
      }

    }

  }

  if (currentSection == 2 && onceForLaptop) {
    if ((-t < (vh * 2 + 2)) && (-t >= (vh * 2) - 0.7)) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const cameraPosition = camera.position;

      laptopPos.copy(cameraPosition).add(dir.multiplyScalar(0.18));
      laptop.lookAt(cameraPosition);
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


let phoneFullscreen = false;
let nophonefullscreen = false;

function PhoneFullscreenModeSwitch() {
  if ((!phoneFullscreen && !nophonefullscreen) || (!phoneFullscreen && nophonefullscreen)) {
    smartphoneMode = true;
    phoneFullscreen = true;
    nophonefullscreen = false;
    document.getElementById("moonContent").classList.add("hidden");
    document.getElementById("horizontalPhoneScreen").classList.remove("hidden");
    document.getElementById("scrollTeller").classList.add("hidden");
    setTimeout(() => {
      document.getElementById("moonContent").classList.add("displayHide");
      document.getElementById("horizontalPhoneScreen").classList.remove("displayHide");
      document.getElementById("scrollTeller").classList.add("displayHide");
    }, 500);

    //loading screen
    setTimeout(() => {
      document.getElementById("loading").classList.add("hidden");
    }, 1800);
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("screenContent").classList.remove("displayHide");
      document.querySelector(".curtains").classList.remove("displayHide");
    }, 2400);
    setTimeout(() => {
      document.querySelector(".rightHalf").classList.add("hoverRight");
      document.querySelector(".leftHalf").classList.add("hoverLeft");
    }, 2600);
    setTimeout(() => {
      document.querySelector(".curtains").style.display = "none";
      // document.querySelector(".leftHalf").classList.add("displayHide");
    }, 3600);
    //loading end here

  } else {
    smartphoneMode = false;
    phoneFullscreen = false;
    nophonefullscreen = true;
    document.getElementById("scrollTeller").classList.remove("hidden");
    document.getElementById("moonContent").classList.remove("hidden");
    // document.getElementById("horizontalPhoneScreen").classList.add("hidden");
    document.getElementById("horizontalPhoneScreen").classList.add("displayHide");
    setTimeout(() => {
      document.getElementById("scrollTeller").classList.remove("displayHide");
      document.getElementById("moonContent").classList.remove("displayHide");
    }, 500);
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
let projectSection = document.getElementById("projectSection");
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
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`)
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
  const following = document.getElementById('github-following');
  const profileLink = document.getElementById('github-profile-link');
  const reposList = document.getElementById('github-repos-list');
  const graph = document.getElementById('github-graph');
  const statsCard = document.getElementById('github-stats-card');
  const languagesCard = document.getElementById('github-languages-card');
  const timeline = document.getElementById('github-recent-activity');

  if (avatar) avatar.src = profile.avatar_url;
  if (name) name.textContent = profile.name || profile.login;
  if (bio) bio.textContent = profile.bio || 'No bio available';
  if (reposCount) reposCount.textContent = profile.public_repos;
  if (followers) followers.textContent = profile.followers;
  if (following) following.textContent = profile.following;
  if (profileLink) profileLink.href = profile.html_url;

  if (graph) {
    graph.src = `https://ghchart.rshah.org/409ba5/${profile.login}`;
  }

  if (statsCard) {
    statsCard.src = `https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff&icon_color=92fe9d`;
  }

  if (languagesCard) {
    languagesCard.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&layout=compact&theme=github_dark&hide_border=true&title_color=00c9ff&text_color=ffffff`;
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
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
            <span>${repo.language || 'JS'}</span>
          </div>
        </a>
      `;
      reposList.appendChild(repoCard);
    });
  }
}

// Initial fetch
fetchGitHubData('momanamjad');

// Handle scene changes to refresh data if needed
const originalChangeScene = window.changeScene;
window.changeScene = (to) => {
  if (to === 'githubSection') {
    fetchGitHubData('momanamjad');
  }
  if (typeof originalChangeScene === 'function') {
    originalChangeScene(to);
  } else {
    // Fallback if originalChangeScene is not available (though it should be)
    document.querySelectorAll('.fullHeight').forEach(s => s.classList.add('displayHide'));
    document.getElementById(to).classList.remove('displayHide');
  }
};