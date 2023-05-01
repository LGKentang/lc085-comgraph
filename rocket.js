import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas:document.getElementById('rocket') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(100, 100, 100);
light.castShadow = true;
light.position.set(0, 100, 100).normalize();


const light2 = new THREE.DirectionalLight(0xffffff,1);
light2.castShadow = true;
light2.position.set(100, -30, 50);


const scene = new THREE.Scene();
scene.add(camera, light,light2);
const lightHelper = new THREE.DirectionalLightHelper(light2, 10);
// scene.add(lightHelper);

const group = new THREE.Group();

const bodyGeometry = new THREE.CylinderGeometry(8.5, 8.5, 40,1000,1000);
const bodyMaterial = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load('./images/rocket.jpg')});
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
bodyMesh.position.y = -25.5

const topGeometry = new THREE.CylinderGeometry(12, 0.2, 20, 320, 320);
topGeometry.translate(0, 3, 0);
const topMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load('./images/redmetal.jpg')
});
const topMesh = new THREE.Mesh(topGeometry, topMaterial);
topMesh.rotateX(Math.PI); // rotate by 180 degrees
topMesh.position.y = 5.5;
// new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./images/redmetal.jpg')})

const button = new THREE.CylinderGeometry(3,3,2,1000,1000);
const pressButton = new THREE.Mesh(button,topMaterial);
pressButton.position.set(20,-40,20);

const resetButton = new THREE.CylinderGeometry(3,3,2,1000,1000);
const resetButtonMesh = new THREE.Mesh(resetButton,new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load('./images/greenmetal.jpg')}) );
resetButtonMesh.position.set(-20,-40,20);
scene.add(resetButtonMesh)

const transparentMaterial = new THREE.MeshBasicMaterial({
  transparent:true,
  opacity:0.7,
  map: new THREE.TextureLoader().load('./images/redmetal.jpg')
})

const transparentButton = new THREE.Mesh(button,transparentMaterial);
transparentButton.position.y=100;
// scene.add(transparentButton);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const raycast = (event,func) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(pressButton);
  if (intersects.length > 0) {
    func()
  }
}

const raycastGreen = (event,func) => {
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(resetButtonMesh );
  if (intersects.length > 0) {
    func()
  }  
}

document.addEventListener('mousedown', function(event) {
  raycast(event,function(){
    rocketFly(group)
  })
});



const boardSmall = new THREE.CylinderGeometry(20,3,2,1000,1000);
const boardMeshSmall = new THREE.Mesh(boardSmall,bodyMaterial);
boardMeshSmall.position.y = -50;
scene.add(boardMeshSmall);

const boardSmallButton = new THREE.CylinderGeometry(5,3,2,1000,1000);
const boardMeshSmallButton = new THREE.Mesh(boardSmallButton,bodyMaterial);
boardMeshSmallButton.position.y = -42;
boardMeshSmallButton.position.z = 20;
boardMeshSmallButton.position.x = 20;
scene.add(boardMeshSmallButton);

const secondSmallBoard = new THREE.Mesh(boardSmallButton,bodyMaterial);
secondSmallBoard.position.y = -42;
secondSmallBoard.position.z = 20;
secondSmallBoard.position.x = -20;
scene.add(secondSmallBoard);

const board = new THREE.CylinderGeometry(300,3,2,1000,1000);
const boardMesh = new THREE.Mesh(board,bodyMaterial);
boardMesh.position.y = -200
scene.add(boardMesh);

let isHovered = false;
document.addEventListener('mousemove', function(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(pressButton);

  if (intersects.length > 0) {
    pressButton.material = transparentMaterial;
    isHovered = true;
  } else {
    pressButton.material = topMaterial;
    isHovered = false;
  }
});

scene.add(pressButton);

const topBiggerGeometry = new THREE.CylinderGeometry(12,0,40,320,320,);
const topBiggerMesh = new THREE.Mesh(topBiggerGeometry,topMaterial);
topBiggerMesh.rotateX(Math.PI);
topBiggerMesh.position.y = -26;
group.add(topBiggerMesh)

const bottomGeometry = new THREE.CylinderGeometry(8.5, 8.5, 10,1000,1000,true);
const bottomMaterial = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load('./images/rocket.jpg')});
const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial);
bottomMesh.position.y = -65.5

const biggerThruster = new THREE.Group();
const ring = new THREE.TorusGeometry(8,0.5,100,100);
ring.rotateX(Math.PI / 2)

const rocketRing = new THREE.TorusGeometry(9,0.5,100,100);
rocketRing.rotateX(Math.PI / 2)

const thruster = new THREE.Group();
const geometry = new THREE.TorusGeometry(2, 0.5, 32, 100);
const geometrySmall = new THREE.TorusGeometry(1.2,0.25,32,100);
geometrySmall.rotateX(Math.PI / 2)
geometry.rotateX(Math.PI / 2);
const material = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load('./images/rocket.jpg')});
const cylinder = new THREE.Mesh(geometry, material);
thruster.add(cylinder);

const booster = new THREE.Mesh(geometry,material);
booster.position.x = 5;
thruster.add(booster);

const booster2 = new THREE.Mesh(geometry,material);
booster2.position.x = -5;
thruster.add(booster2);

const booster3 = new THREE.Mesh(geometry,material);
booster3.position.z = 5;
thruster.add(booster3);

const booster4 = new THREE.Mesh(geometry,material);
booster4.position.z = -5;
thruster.add(booster4);

const booster5 = new THREE.Mesh(geometrySmall,material);
booster5.position.x = 4;
booster5.position.z = 4;
thruster.add(booster5)

const booster6 = new THREE.Mesh(geometrySmall,material);
booster6.position.x = -4;
booster6.position.z = -4;
thruster.add(booster6)

const booster7 = new THREE.Mesh(geometrySmall,material);
booster7.position.x = -4;
booster7.position.z = 4;
thruster.add(booster7)

const booster8 = new THREE.Mesh(geometrySmall,material);
booster8.position.x = 4;
booster8.position.z = -4;
thruster.add(booster8)
// -46
const ring1 = new THREE.Mesh(ring,material);
ring1.position.y = -46
const ring2 = new THREE.Mesh(ring,material);
ring2.position.y = -46.5
const ring3 = new THREE.Mesh(ring,material);
ring3.position.y = -47
const ring4 = new THREE.Mesh(ring,material);
ring4.position.y = -47.5
const ring5 = new THREE.Mesh(ring,material);
ring5.position.y = -48

const numRings = 30;
const startY = -8;

for (let i = 0; i < numRings; i++) {
  const rocketRingMesh = new THREE.Mesh(rocketRing, material);
  rocketRingMesh.position.y = startY - (i * 1);
  biggerThruster.add(rocketRingMesh);
}

thruster.position.y = -48
biggerThruster.add(ring1,ring2,ring3,ring4,ring5,thruster);
group.add(bodyMesh, topMesh,biggerThruster);



scene.add(group);

let intervalId; // variable to store interval ID
let stopRocket = false; // flag to indicate whether to stop rocket

const rocketFly = (rocket) => {
  let i = 0;
  let speed = 0;
  const flyUp = () => {
    if (i < 1000 && !stopRocket) {
      rocket.position.y++;
      i++;
      speed = speed + 0.2;
    } else {
      clearInterval(intervalId);
    }
  }
  intervalId = setInterval(flyUp, 1000/speed);
  stopRocket = false;
}

document.addEventListener('mousedown', function(event) {
  raycastGreen(event,function(){
    group.position.y = 0;
    stopRocket = true;
  })
});


const controls = new OrbitControls(camera,renderer.domElement)

const textureLoader = new THREE.CubeTextureLoader();

let materialArray = [];

let texture_left = new THREE.TextureLoader().load('./images/left.png');
let texture_right = new THREE.TextureLoader().load('./images/right.png');
let texture_up = new THREE.TextureLoader().load('./images/up.png');
let texture_front = new THREE.TextureLoader().load('./images/front.png');
let texture_back = new THREE.TextureLoader().load('./images/back.png');
let texture_down = new THREE.TextureLoader().load('./images/down.png');



materialArray.push(new THREE.MeshBasicMaterial({map:texture_left}));
materialArray.push(new THREE.MeshBasicMaterial({map:texture_right}));
materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
materialArray.push(new THREE.MeshBasicMaterial({map:texture_down}));
materialArray.push(new THREE.MeshBasicMaterial({map:texture_back}));
materialArray.push(new THREE.MeshBasicMaterial({map:texture_front}));

for (let i = 0 ; i < 6 ; i++){
  materialArray[i].side = THREE.BackSide;
}

let skyboxGeo = new THREE.BoxGeometry(1000,1000,1000);
let skybox = new THREE.Mesh(skyboxGeo,materialArray);

controls.minDistance = 100;
controls.maxDistance = 200;

scene.add(skybox);



function animate() {
    requestAnimationFrame(animate);

    controls.update()
  
    renderer.render(scene, camera);
  }
  
  animate();

  