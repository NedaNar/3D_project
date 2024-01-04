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

// -------------------- OBJECT SETUP ---------------------- //
function createObject(
  geometry,
  position,
  parent,
  material = pigMaterial,
  rotation = { x: 0, y: 0, z: 0 }
) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(position.x, position.y, position.z);
  object.rotation.set(rotation.x, rotation.y, rotation.z);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

const textureLoader = new THREE.TextureLoader();

// BACKGROUND
const forestTexture = textureLoader.load("images/bg.png");
var forestGeometry = new THREE.PlaneGeometry(
  window.innerWidth * 0.36,
  window.innerHeight * 0.36,
  1,
  1
);
var forestMaterial = new THREE.MeshPhongMaterial({
  map: forestTexture,
  side: THREE.DoubleSide,
});
var forest = new THREE.Mesh(forestGeometry, forestMaterial);
forest.position.y = 15;
forest.position.z = -99;
scene.add(forest);

const lakeTexture = textureLoader.load("images/bg.png");
var lakeGeometry = new THREE.PlaneGeometry(
  window.innerWidth * 0.34,
  window.innerHeight * 0.34,
  1,
  1
);
var lakeMaterial = new THREE.MeshPhongMaterial({
  map: lakeTexture,
  side: THREE.DoubleSide,
});
lakeMaterial.receiveShadow = true;
var lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
lake.receiveShadow = true;
lake.rotation.x = (Math.PI / 2) * 3;
lake.position.y = 15;
lake.position.z = -110;
scene.add(lake);

// STARS
var starGeom = new THREE.PlaneGeometry(65, 50);
var starMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load("images/star.png"),
  side: THREE.DoubleSide,
  transparent: true,
  alphaTest: 0.5,
});
createObject(starGeom, { x: -185, y: 60, z: -65 }, scene, starMaterial);
createObject(starGeom, { x: -15, y: 65, z: -40 }, scene, starMaterial);
createObject(starGeom, { x: 200, y: 85, z: -80 }, scene, starMaterial);

// DOORS
const door1 = createObject(
  new THREE.PlaneGeometry(32, 40),
  { x: -145, y: 38, z: -98 },
  scene,
  new THREE.MeshPhongMaterial({
    map: textureLoader.load("images/door1.png"),
    side: THREE.DoubleSide,
  })
);
const door4 = createObject(
  new THREE.PlaneGeometry(32, 32),
  { x: 143, y: 35, z: -98 },
  scene,
  new THREE.MeshPhongMaterial({
    map: textureLoader.load("images/door4.png"),
    side: THREE.DoubleSide,
  })
);
const doorActions = [
  { action: "restart", door: door1 },
  { action: "run", door: door4 },
];

// PIG
const pigMaterial = new THREE.MeshPhongMaterial({
  color: "#FFC0CB",
  flatShading: true,
});
const pig = createObject(
  new THREE.BoxGeometry(7, 5, 4),
  { x: 150, y: 20, z: -105 },
  scene,
  pigMaterial,
  { x: 0, y: Math.PI / 12, z: 0 }
);

// HEAD
const head = createObject(
  new THREE.BoxGeometry(4.5, 4.5, 4.5),
  { x: -2, y: 2, z: 0 },
  pig
);
createObject(
  new THREE.PlaneGeometry(4.5, 4.5),
  { x: -2.25, y: 0, z: 0 },
  head,
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("images/face.png"),
    transparent: true,
  }),
  { x: 0, y: (Math.PI / 2) * 3, z: 0 }
);

// MOUTH
const mouth = createObject(
  new THREE.BoxGeometry(2.5, 1.5, 2),
  { x: -1.8, y: -0.5, z: 0 },
  head
);
createObject(
  new THREE.PlaneGeometry(2.5, 1.5),
  { x: -1.3, y: 0, z: 0 },
  mouth,
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("images/nose.png"),
    transparent: true,
  }),
  { x: 0, y: (Math.PI / 2) * 3, z: 0 }
);

// EARS
const ear1 = createObject(
  new THREE.BoxGeometry(0.5, 1.5, 2),
  { x: -1, y: 2.8, z: -1.2 },
  head
);
const ear2 = createObject(
  new THREE.BoxGeometry(0.5, 1.5, 2),
  { x: -1, y: 2.8, z: 1.2 },
  head
);
const earMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load("images/ear.png"),
  transparent: true,
});
createObject(
  new THREE.PlaneGeometry(2.5, 1.5),
  { x: -0.3, y: 0, z: 0 },
  ear1,
  earMaterial,
  { x: 0, y: (Math.PI / 2) * 3, z: 0 }
);
createObject(
  new THREE.PlaneGeometry(2.5, 1.5),
  { x: -0.3, y: 0, z: 0 },
  ear2,
  earMaterial,
  { x: 0, y: (Math.PI / 2) * 3, z: 0 }
);
const eartop = createObject(
  new THREE.BoxGeometry(1, 0.5, 2),
  { x: -0.25, y: 0.5, z: 0 },
  ear1
);
const eartop2 = createObject(
  new THREE.BoxGeometry(1, 0.5, 2),
  { x: -0.25, y: 0.5, z: 0 },
  ear2
);

// TAIL
const tail1 = createObject(
  new THREE.BoxGeometry(0.5, 3, 0.5),
  { x: 3, y: 3, z: 0 },
  pig
);
const tail2 = createObject(
  new THREE.BoxGeometry(1.5, 0.5, 0.5),
  { x: -0.5, y: 1.5, z: 0 },
  tail1
);
const tail3 = createObject(
  new THREE.BoxGeometry(0.5, 1.5, 0.5),
  { x: -0.5, y: -0.5, z: 0 },
  tail2
);

// LEGS
const legGeometry = new THREE.BoxGeometry(2, 3, 1.9);
const leg_br = createObject(legGeometry, { x: 2.2, y: -2, z: 2 }, pig);
leg_br.rotation.z = Math.PI / 8;
const leg_bl = createObject(legGeometry, { x: 2.2, y: -2, z: -2 }, pig);
leg_bl.rotation.z = Math.PI / 8;
const leg_fl = createObject(legGeometry, { x: -2.2, y: -2, z: 2 }, pig);
leg_fl.rotation.z = -Math.PI / 8;
const leg_fr = createObject(legGeometry, { x: -2.2, y: -2, z: -2 }, pig);
leg_fr.rotation.z = -Math.PI / 8;

const bottomGeometry = new THREE.BoxGeometry(2.1, 0.6, 2);
const bottomMaterial = new THREE.MeshStandardMaterial({ color: "#68411e" });
createObject(bottomGeometry, { x: 0, y: -1.5, z: 0 }, leg_br, bottomMaterial);
createObject(bottomGeometry, { x: 0, y: -1.5, z: 0 }, leg_bl, bottomMaterial);
createObject(bottomGeometry, { x: 0, y: -1.5, z: 0 }, leg_fl, bottomMaterial);
createObject(bottomGeometry, { x: 0, y: -1.5, z: 0 }, leg_fr, bottomMaterial);

// LIGHTS
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const pigLight = new THREE.DirectionalLight("orange", 0.7);
pigLight.position.set(-50, 100, 40);
pigLight.castShadow = true;
pigLight.shadow.camera.left = -20;
pigLight.shadow.camera.right = 20;
pigLight.shadow.camera.top = 20;
pigLight.shadow.camera.bottom = -20;
pigLight.target = pig;
scene.add(pigLight);

const light = new THREE.DirectionalLight("white", 0.5);
light.position.set(0, 200, 0);
light.target = lake;
scene.add(light);

const bgLight = new THREE.DirectionalLight("white", 1);
bgLight.position.set(0, 100, 100);
//bgLight.target = forest;
scene.add(bgLight);

var addlight = new THREE.DirectionalLight(0xffffff);
addlight.position.set(0, 1, 1).normalize();
scene.add(addlight);

camera.position.z = 20;
camera.position.y = 20;

// -------------------- INITIAL VALUES ---------------------- //
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

let shouldShowPig = true;
let shouldAnimatePig = false;

// -------------------- ANIMATION FUNCTIONCS ---------------------- //
var animate = function () {
  requestAnimationFrame(animate);
  shouldShowPig ? showPig() : shouldAnimatePig && animatePig();
  renderer.render(scene, camera);
};

function animatePig() {
  if (pig.position.z < 15) {
    if (hasSlipped) runningSpeed -= 0.0002;
    else runningSpeed += 0.0003;

    if (doorActions[1].action == "run") {
      pig.position.x -= runningSpeed * 1.4;
    } else {
      pig.position.x += runningSpeed * 1.4;
    }
    pig.position.z += runningSpeed;
  } else {
    showGift();
    resumeAnimation();
  }

  if (pig.position.z > -40) {
    hasSlipped = true;
  }

  if (pig.position.z > -35) {
    rotationSpeed += 0.0002;
    if (doorActions[1].action == "run") {
      pig.rotation.y -= rotationSpeed;
    } else {
      pig.rotation.y += rotationSpeed;
    }
  }

  if (!hasSlipped && !pause) {
    pig.position.y += 0.12 * direction;
    head.position.y += 0.05 * direction;
    eartop.rotation.z += 0.12 * -direction;
    eartop2.rotation.z += 0.12 * -direction;

    leg_br.rotation.z += 0.07 * direction;
    leg_bl.rotation.z += 0.07 * direction;
    leg_fl.rotation.z += 0.07 * -direction;
    leg_fr.rotation.z += 0.07 * -direction;

    pig.rotation.y += 0.001 * 0.5;

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

  if (hasSlipped && pig.position.y > initialPig - 1.5) pig.position.y -= 0.1;
}

function showPig() {
  pig.position.set(20, 20, 10);
  pig.rotation.y = Math.PI / 12;

  head.position.y += 0.015 * direction;
  [eartop, eartop2].forEach((ear) => (ear.rotation.z += 0.015 * -direction));

  leg_fr.rotation.z += 0.01 * direction;
  leg_fr.rotation.y += 0.006 * direction;

  if (head.position.y < 1 || head.position.y > 2) direction *= -1;
}

function resumeAnimation() {
  shouldAnimatePig = false;
  if (doorActions[1].action == "run") {
    pig.position.set(150, 20, -105);
    pig.rotation.y = Math.PI / 12;
  } else {
    pig.position.set(-150, 20, -105);
    pig.rotation.y = Math.PI / 1.2;
  }

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
  direction = -1;

  hasSlipped = false;
  pause = false;
}

function shuffle() {
  doorActions[0].action = Math.random() < 0.5 ? "restart" : "run";
  doorActions[1].action = doorActions[0].action === "run" ? "restart" : "run";
}

// -------------------- EVENT HANDLERS ---------------------- //
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
window.addEventListener("click", onMouseClick, false);

var playButton = document.getElementById("playButton");
playButton.addEventListener("click", handleClick);

function handleClick(event) {
  shouldShowPig = false;
  resumeAnimation();
  reposition("introWindow", "36%", "-70%");
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(
    doorActions.map((door) => door.door)
  );

  if (intersects.length > 0) {
    var clickedDoor = intersects[0].object;

    const selectedAction = doorActions.find(
      (door) => door.door === clickedDoor
    );

    if (selectedAction) {
      if (selectedAction.action === "restart") {
        showRestart();
      } else if (selectedAction.action === "run") {
        shouldAnimatePig = true;
      }
    }
  }
}

// -------------------- INFORMATION WINDOWS ---------------------- //
function showGift() {
  var playButton = document.getElementById("playButton");
  playButton.innerText = "RESTART";

  var introWindow = document.getElementById("introWindow");
  introWindow.style.backgroundImage = "url('./images/pig.png')";

  reposition("introWindow", "36%", "15%");
  shuffle(doorActions);
  shouldShowPig = true;
}

function showRestart() {
  var playButton = document.getElementById("playButton");
  playButton.innerText = "RESTART";

  var introWindow = document.getElementById("introWindow");
  introWindow.style.backgroundImage = "url('./images/restart.png')";

  reposition("introWindow", "36%", "15%");
  shuffle(doorActions);
  resumeAnimation();
  shouldShowPig = true;
}

function reposition(elementId, left, top) {
  const element = document.getElementById(elementId);
  element.style.left = left;
  element.style.top = top;
}

// -------------------- START ---------------------- //
animate();

setTimeout(function () {
  reposition("introWindow", "36%", "15%");
}, 200);
