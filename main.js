import * as THREE from "three";
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const forestTexture = textureLoader.load("images/bg.png");
var forestGeometry = new THREE.PlaneGeometry(
  window.innerWidth * 0.34,
  window.innerHeight * 0.34,
  1,
  1
);
var forestMaterial = new THREE.MeshPhongMaterial({
  map: forestTexture,
  side: THREE.DoubleSide,
});
var forest = new THREE.Mesh(forestGeometry, forestMaterial);
forest.receiveShadow = true;

forest.position.z = -99;
scene.add(forest);

const lakeTexture = textureLoader.load("images/back_bg.png");
var lakeGeometry = new THREE.PlaneGeometry(
  window.innerWidth * 0.34,
  window.innerHeight * 0.34,
  1,
  1
);
const lakeMaterial = new THREE.MeshStandardMaterial({ color: "white" });
lakeMaterial.receiveShadow = true;

var lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
lake.receiveShadow = true;
lake.rotation.x = Math.PI / 2;
lake.rotation.y = Math.PI;
lake.position.y = 15;
lake.position.z = -110;
scene.add(lake);

// STARS

var starGeom = new THREE.PlaneGeometry(65, 50);
const starTexture = textureLoader.load("images/star.png");
var starMaterial = new THREE.MeshPhongMaterial({
  map: starTexture,
  side: THREE.DoubleSide,
  transparent: true,
  alphaTest: 0.5,
});
var star1 = new THREE.Mesh(starGeom, starMaterial);
star1.position.x = -150;
star1.position.z = -60;
star1.position.y = 70;
star1.castShadow = true;
scene.add(star1);

var star2 = new THREE.Mesh(starGeom, starMaterial);
star2.position.x = -40;
star2.position.z = -40;
star2.position.y = 40;
star2.castShadow = true;
scene.add(star2);

var star3 = new THREE.Mesh(starGeom, starMaterial);
star3.position.x = 130;
star3.position.z = -80;
star3.position.y = 100;
star3.castShadow = true;
scene.add(star3);

// DOORS

var door1Geom = new THREE.PlaneGeometry(24, 30);
const door1Texture = textureLoader.load("images/door1.png");
var door1Material = new THREE.MeshPhongMaterial({
  map: door1Texture,
  side: THREE.DoubleSide,
});
var door1 = new THREE.Mesh(door1Geom, door1Material);
door1.position.x = -150;
door1.position.z = -99;
door1.position.y = 30;
scene.add(door1);

var door2Geom = new THREE.PlaneGeometry(48, 35);
const door2Texture = textureLoader.load("images/door2.png");
var door2Material = new THREE.MeshPhongMaterial({
  map: door2Texture,
  side: THREE.DoubleSide,
});
var door2 = new THREE.Mesh(door2Geom, door2Material);
door2.position.x = -16;
door2.position.z = -99;
door2.position.y = 32;
scene.add(door2);

var door3Geom = new THREE.PlaneGeometry(27, 43);
const door3Texture = textureLoader.load("images/door3.png");
var door3Material = new THREE.MeshPhongMaterial({
  map: door3Texture,
  side: THREE.DoubleSide,
});
var door3 = new THREE.Mesh(door3Geom, door3Material);
door3.position.x = 80;
door3.position.z = -99;
door3.position.y = 37;
scene.add(door3);

var door4Geom = new THREE.PlaneGeometry(30, 30);
const door4Texture = textureLoader.load("images/door4.png");
var door4Material = new THREE.MeshPhongMaterial({
  map: door4Texture,
  side: THREE.DoubleSide,
});
var door4 = new THREE.Mesh(door4Geom, door4Material);
door4.position.x = 205;
door4.position.z = -99;
door4.position.y = 30;
scene.add(door4);

// PIG

const pigGeometry = new THREE.BoxGeometry(7, 5, 4);
const pigMaterial = new THREE.MeshStandardMaterial({ color: "pink" });
const pig = new THREE.Mesh(pigGeometry, pigMaterial);
pig.castShadow = true;
pig.receiveShadow = true;
pig.position.set(0, 0, 0);
pig.rotation.y = Math.PI / 8;
scene.add(pig);

/* const headGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
const head = new THREE.Mesh(headGeometry, pigMaterial);
head.castShadow = true;
head.receiveShadow = true;
head.position.set(-2, 2, 0);
pig.add(head);
const headGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
const head = new THREE.Mesh(headGeometry, pigMaterial);
head.castShadow = true;
head.receiveShadow = true;
head.position.set(-2, 2, 0);
pig.add(head);
const headGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
const head = new THREE.Mesh(headGeometry, pigMaterial);
head.castShadow = true;
head.receiveShadow = true;
head.position.set(-2, 2, 0);
pig.add(head); */

const headGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);
const head = new THREE.Mesh(headGeometry, pigMaterial);
head.castShadow = true;
head.receiveShadow = true;
head.position.set(-2, 2, 0);
pig.add(head);

const mouthGeometry = new THREE.BoxGeometry(2.5, 1.5, 2);
const mouth = new THREE.Mesh(mouthGeometry, pigMaterial);
mouth.castShadow = true;
mouth.receiveShadow = true;
mouth.position.set(-1.8, -0.5, 0);
head.add(mouth);

const earGeometry = new THREE.BoxGeometry(0.5, 1.5, 2);
const ear1 = new THREE.Mesh(earGeometry, pigMaterial);
ear1.position.set(-1, 2.8, -1.2);
ear1.castShadow = true;
ear1.receiveShadow = true;
head.add(ear1);
const ear2 = new THREE.Mesh(earGeometry, pigMaterial);
ear2.position.set(-1, 2.8, 1.2);
ear2.castShadow = true;
ear2.receiveShadow = true;
head.add(ear2);

const eartopGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const eartop = new THREE.Mesh(eartopGeometry, pigMaterial);
eartop.position.set(-0.25, 0.5, 0);
eartop.castShadow = true;
eartop.receiveShadow = true;
const eartop2 = eartop.clone();
ear1.add(eartop);
ear2.add(eartop2);

const legGeometry = new THREE.BoxGeometry(2, 3, 1.9);
const leg_br = new THREE.Mesh(legGeometry, pigMaterial);
leg_br.position.set(2.2, -2, 2);
leg_br.castShadow = true;
leg_br.receiveShadow = true;
leg_br.rotation.z = Math.PI / 8;
pig.add(leg_br);
const leg_bl = new THREE.Mesh(legGeometry, pigMaterial);
leg_bl.position.set(2.2, -2, -2);
leg_bl.castShadow = true;
leg_bl.receiveShadow = true;
leg_bl.rotation.z = Math.PI / 8;
pig.add(leg_bl);
const leg_fl = new THREE.Mesh(legGeometry, pigMaterial);
leg_fl.position.set(-2.2, -2, 2);
leg_fl.castShadow = true;
leg_fl.receiveShadow = true;
leg_fl.rotation.z = -Math.PI / 8;
pig.add(leg_fl);
const leg_fr = new THREE.Mesh(legGeometry, pigMaterial);
leg_fr.position.set(-2.2, -2, -2);
leg_fr.castShadow = true;
leg_fr.receiveShadow = true;
leg_fr.rotation.z = -Math.PI / 8;
pig.add(leg_fr);

const bottomGeometry = new THREE.BoxGeometry(2, 0.5, 1.9);
const bottomMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const legBottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
legBottom.position.set(0, -1.5, 0);
legBottom.castShadow = true;
legBottom.receiveShadow = true;
leg_br.add(legBottom);
const legBottom2 = legBottom.clone();
leg_bl.add(legBottom2);
const legBottom3 = legBottom.clone();
leg_fl.add(legBottom3);
const legBottom4 = legBottom.clone();
leg_fr.add(legBottom4);

pig.position.set(215, 20, -105);
pig.rotation.y = Math.PI / 12;

camera.position.z = 20;
camera.position.y = 20;

// LIGHTS

const ambientLight = new THREE.AmbientLight("white", 0.9);
scene.add(ambientLight);

const pigLight = new THREE.DirectionalLight(0xffffff, 0.5);
pigLight.position.set(-80, 200, -40);
pigLight.castShadow = true;
pigLight.shadow.camera.left = -20;
pigLight.shadow.camera.right = 20;
pigLight.shadow.camera.top = 20;
pigLight.shadow.camera.bottom = -20;
pigLight.target = pig;
scene.add(pigLight);

const starLight = new THREE.DirectionalLight(0xffffff, 0.2);
starLight.position.set(-5, 40, 40);
starLight.shadow.camera.left = -150;
starLight.shadow.camera.right = 200;
starLight.shadow.camera.top = 100;
starLight.shadow.camera.bottom = -100;
starLight.castShadow = true;
scene.add(starLight);
starLight.target = star2;

let initialPig = pig.position.y;
let initialHead = head.position.y;
let initialleg_br = leg_br.rotation.y;
let initialleg_bl = leg_bl.rotation.y;
let initialleg_fl = leg_fl.rotation.y;
let initialleg_fr = leg_fr.rotation.y;
let initialEar = ear1.rotation.z;
let direction = -1;
let hasSlipped = false;
let pause = false;

let rotationSpeed = 0;
let runningSpeed = 0.1;

let shouldAnimatePig = false;

var animate = function () {
  requestAnimationFrame(animate);
  if (shouldAnimatePig) {
    animatePig();
  }
  renderer.render(scene, camera);
};

function animatePig() {
  if (pig.position.z < 15) {
    if (hasSlipped) runningSpeed -= 0.0005;
    else runningSpeed += 0.0003;

    pig.position.x -= runningSpeed * 1.9;
    pig.position.z += runningSpeed;
  } else {
    showGift();
    resumeAnimation();
  }

  if (pig.position.z > -25) {
    hasSlipped = true;
  }

  if (pig.position.z > -23) {
    rotationSpeed += 0.0002;
    pig.rotation.y -= rotationSpeed;
  }

  if (!hasSlipped && !pause) {
    // Move the pig up and down
    pig.position.y += 0.12 * direction;
    head.position.y += 0.05 * direction;
    eartop.rotation.z += 0.12 * -direction;
    eartop2.rotation.z += 0.12 * -direction;

    leg_br.rotation.z += 0.07 * direction;
    leg_bl.rotation.z += 0.07 * direction;
    leg_fl.rotation.z += 0.07 * -direction;
    leg_fr.rotation.z += 0.07 * -direction;

    pig.rotation.y += 0.001 * 0.5;

    // Reverse direction when reaching a certain height
    if (Math.abs(pig.position.y - initialPig) > 2) {
      direction *= -1;
    }
  } else if (hasSlipped && !pause) {
    head.position.y -= 0.005;
    eartop.rotation.z += 0.0005;
    eartop2.rotation.z += 0.0005;

    leg_br.rotation.z += 0.02;
    leg_bl.rotation.z += 0.02;
    leg_fl.rotation.z += -0.02;
    leg_fr.rotation.z += -0.02;
    leg_br.rotation.y += 0.01 * direction;
    leg_bl.rotation.y += 0.01 * -direction;
    leg_fl.rotation.y += 0.01 * -direction;
    leg_fr.rotation.y += 0.01 * direction;

    if (leg_br.rotation.z > 1.5) {
      pause = true;
    }
  }

  if (hasSlipped) {
    if (pig.position.y > initialPig - 1.5) {
      pig.position.y -= 0.1;
    }
  }
}

function resumeAnimation() {
  shouldAnimatePig = false;
  pig.position.set(215, 20, -105);
  pig.rotation.y = Math.PI / 12;

  leg_br.rotation.z = Math.PI / 8;
  leg_bl.rotation.z = Math.PI / 8;
  leg_fl.rotation.z = -Math.PI / 8;
  leg_fr.rotation.z = -Math.PI / 8;
  leg_br.rotation.y = initialleg_br;
  leg_bl.rotation.y = initialleg_bl;
  leg_fl.rotation.y = initialleg_fl;
  eartop.rotation.z = initialEar;
  eartop2.rotation.z = initialEar;
  leg_fr.rotation.y = initialleg_fr;

  pig.position.y = initialPig;
  head.position.y = initialHead;

  rotationSpeed = 0;
  runningSpeed = 0.1;

  hasSlipped = false;
  pause = false;
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var doors = [door1, door2, door3, door4];

  var intersects = raycaster.intersectObjects(doors);

  if (intersects.length > 0) {
    var clickedDoor = intersects[0].object;

    if (clickedDoor === door1) {
      showStars();
    } else if (clickedDoor === door2) {
      playSong();
    } else if (clickedDoor === door3) {
      shouldAnimatePig = false;
      showRestart();
    } else if (clickedDoor === door4) {
      shouldAnimatePig = true;
    }
  }
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
window.addEventListener("click", onMouseClick, false);

animate();

var playButton = document.getElementById("playButton");
function handleClick(event) {}
playButton.addEventListener("click", handleClick);

function animateStarFalling(star, targetY) {
  const tween = new TWEEN.Tween(star.position)
    .to({ y: targetY }, 1000) // Adjust the duration as needed
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}

function showStars() {
  animateStarFalling(star1, 0);
  animateStarFalling(star2, 0);
  animateStarFalling(star3, 0);
}

function playSong() {
  var song = document.getElementById("song");
  song.play();
}

function showGift() {
  var playButton = document.getElementById("playButton");
  playButton.innerText = "RESTART";

  var introWindow = document.getElementById("introWindow");
  introWindow.style.backgroundImage = "url('./images/pig.png')";

  reposition("introWindow", "36%", "15%");
}

function showRestart() {
  var playButton = document.getElementById("playButton");
  playButton.innerText = "RESTART";

  var introWindow = document.getElementById("introWindow");
  introWindow.style.backgroundImage = "url('./images/restart.png')";

  reposition("introWindow", "36%", "15%");
}

function reposition(elementId, left, top) {
  const element = document.getElementById(elementId);
  element.style.left = left;
  element.style.top = top;
}
