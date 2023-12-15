import * as THREE from "three";
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const cubeImageSize = 512;

// Set the camera position and target
camera.position.set(0, 0, cubeImageSize * 2.5); // Adjust the multiplier based on your scene size
camera.lookAt(0, 0, 0); // Look at the center of your scene
let textureCube = new THREE.CubeTextureLoader()
  .setPath("images/")
  .load([
    "right.png",
    "left.png",
    "top.png",
    "bottom.png",
    "front.png",
    "back.png",
  ]);
scene.background = textureCube;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
/* 
const forestTexture = textureLoader.load("images/forest.jpg");
var forestGeometry = new THREE.PlaneGeometry(245, 90, 10, 10);
var forestMaterial = new THREE.MeshPhongMaterial({
  map: forestTexture,
  side: THREE.DoubleSide,
});
var forest = new THREE.Mesh(forestGeometry, forestMaterial);
forest.position.z = -60;
forest.position.y = 25;
scene.add(forest); */

/* const iceTexture = textureLoader.load("images/ice.jpg");
var planeGeometry = new THREE.PlaneGeometry(370, 200, 10, 10);
var iceMaterial = new THREE.MeshPhongMaterial({
  map: iceTexture,
  side: THREE.DoubleSide,
});
var groundWithIce = new THREE.Mesh(planeGeometry, iceMaterial);
groundWithIce.rotation.x = Math.PI / 2;
groundWithIce.position.y = -5;
scene.add(groundWithIce); */

const pigGeometry = new THREE.BoxGeometry(7, 5, 4);
const pigMaterial = new THREE.MeshStandardMaterial({ color: "pink" });
const pig = new THREE.Mesh(pigGeometry, pigMaterial);
pig.position.set(0, 0, 0);
pig.rotation.y = Math.PI / 8;
scene.add(pig);

const headGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
const head = new THREE.Mesh(headGeometry, pigMaterial);
head.position.set(-2, 2, 0);
pig.add(head);

const mouthGeometry = new THREE.BoxGeometry(2, 1, 2);
const mouth = new THREE.Mesh(mouthGeometry, pigMaterial);
mouth.position.set(-1.5, -0.5, 0);
head.add(mouth);

const earGeometry = new THREE.BoxGeometry(0.5, 1.5, 2);
const ear1 = new THREE.Mesh(earGeometry, pigMaterial);
ear1.position.set(-1, 2.8, -1.2);
head.add(ear1);
const ear2 = new THREE.Mesh(earGeometry, pigMaterial);
ear2.position.set(-1, 2.8, 1.2);
head.add(ear2);

const eartopGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const eartop = new THREE.Mesh(eartopGeometry, pigMaterial);
eartop.position.set(-0.25, 0.5, 0);
const eartop2 = eartop.clone();
ear1.add(eartop);
ear2.add(eartop2);

const legGeometry = new THREE.BoxGeometry(2, 2, 1.9);
const leg1 = new THREE.Mesh(legGeometry, pigMaterial);
leg1.position.set(2.2, -1.6, 2);
leg1.rotation.z = Math.PI / 8;
pig.add(leg1);
const leg2 = new THREE.Mesh(legGeometry, pigMaterial);
leg2.position.set(2.2, -1.6, -2);
leg2.rotation.z = Math.PI / 8;
pig.add(leg2);
const leg3 = new THREE.Mesh(legGeometry, pigMaterial);
leg3.position.set(-2.2, -1.6, 2);
leg3.rotation.z = -Math.PI / 8;
pig.add(leg3);
const leg4 = new THREE.Mesh(legGeometry, pigMaterial);
leg4.position.set(-2.2, -1.6, -2);
leg4.rotation.z = -Math.PI / 8;
pig.add(leg4);

const bottomGeometry = new THREE.BoxGeometry(2, 0.5, 1.9);
const bottomMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const legBottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
legBottom.position.set(0, -1.2, 0);
leg1.add(legBottom);
const legBottom2 = legBottom.clone();
leg2.add(legBottom2);
const legBottom3 = legBottom.clone();
leg3.add(legBottom3);
const legBottom4 = legBottom.clone();
leg4.add(legBottom4);

pig.position.x = 150;
pig.position.z = -100;
pig.position.y = -0.2;
pig.rotation.y = Math.PI / 6;

camera.position.z = 15;
camera.position.y = 2;

const ambientLight = new THREE.AmbientLight("white", 0.5); // Choose a color for ambient light
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-40, 40, -40);
light.castShadow = true; // Enable shadow casting for the light
scene.add(light);

let initialPig = pig.position.y;
let initialHead = head.position.y;
let initialLeg1 = leg1.rotation.y;
let initialLeg2 = leg2.rotation.y;
let initialLeg3 = leg3.rotation.y;
let initialLeg4 = leg4.rotation.y;
let initialEar = ear1.rotation.z;
let direction = -1;
let hasSlipped = false;
let pause = false;

let rotationSpeed = 0;
let runningSpeed = 0.1;

var animate = function () {
  requestAnimationFrame(animate);

  if (pig.position.z < 15) {
    if (hasSlipped) runningSpeed -= 0.0004;
    else runningSpeed += 0.0003;

    pig.position.x -= runningSpeed * 1.5;
    pig.position.z += runningSpeed;
  } else {
    resumeAnimation();
  }

  if (pig.position.z > -25) {
    hasSlipped = true;
  }

  if (pig.position.z > -23) {
    rotationSpeed += 0.0003;
    pig.rotation.y -= rotationSpeed;
  }

  if (!hasSlipped && !pause) {
    // Move the pig up and down
    pig.position.y += 0.07 * direction;
    head.position.y += 0.03 * direction;
    eartop.rotation.z += 0.03 * -direction;
    eartop2.rotation.z += 0.03 * -direction;

    leg1.rotation.z += 0.02 * direction;
    leg2.rotation.z += 0.02 * direction;
    leg3.rotation.z += 0.02 * -direction;
    leg4.rotation.z += 0.02 * -direction;

    pig.rotation.y += 0.001 * 0.5;

    // Reverse direction when reaching a certain height
    if (Math.abs(pig.position.y - initialPig) > 2) {
      direction *= -1;
    }
  } else if (hasSlipped && !pause) {
    head.position.y -= 0.005;
    eartop.rotation.z += 0.0005;
    eartop2.rotation.z += 0.0005;

    leg1.rotation.z += 0.02;
    leg2.rotation.z += 0.02;
    leg3.rotation.z += -0.02;
    leg4.rotation.z += -0.02;
    leg1.rotation.y += 0.01 * direction;
    leg2.rotation.y += 0.01 * -direction;
    leg3.rotation.y += 0.01 * -direction;
    leg4.rotation.y += 0.01 * direction;

    if (leg1.rotation.z > 1.5) {
      pause = true;
    }
  }

  if (hasSlipped) {
    if (pig.position.y > initialPig - 1.5) {
      pig.position.y -= 0.1;
    }
  }
  renderer.render(scene, camera);
};

function resumeAnimation() {
  pig.position.x = 150;
  pig.position.z = -100;
  pig.rotation.y = Math.PI / 6;

  leg1.rotation.z = Math.PI / 8;
  leg2.rotation.z = Math.PI / 8;
  leg3.rotation.z = -Math.PI / 8;
  leg4.rotation.z = -Math.PI / 8;
  leg1.rotation.y = initialLeg1;
  leg2.rotation.y = initialLeg2;
  leg3.rotation.y = initialLeg3;
  eartop.rotation.z = initialEar;
  eartop2.rotation.z = initialEar;
  leg4.rotation.y = initialLeg4;

  pig.position.y = initialPig;
  head.position.y = initialHead;

  rotationSpeed = 0;
  runningSpeed = 0.1;

  hasSlipped = false;
  pause = false;
}

animate();
