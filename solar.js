import * as THREE from './three.js/build/three.module.js';
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Cameras
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 2000);
camera.position.set(0,0,100);
//                   x, y, z 

let currCamera = camera;
// Outside camera = 0,0,100;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas:document.getElementById('solar') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Textures
const sunTexture = new THREE.TextureLoader().load('./images/sun.jpg');
const earthTexture = new THREE.TextureLoader().load('./images/earth.jpg');
const mercuryTexture = new THREE.TextureLoader().load('./images/mercury.jpg');
const venusTexture = new THREE.TextureLoader().load('./images/venus.jpg');
const marsTexture = new THREE.TextureLoader().load('./images/mars.jpg');
const jupiterTexture = new THREE.TextureLoader().load('./images/jupiter.jpg');
const saturnTexture = new THREE.TextureLoader().load('./images/saturn.jpg');
const uranusTexture = new THREE.TextureLoader().load('./images/uranus.jpg');
const neptuneTexture = new THREE.TextureLoader().load('./images/neptunus.jpg');

// Helper and controls
const controls = new OrbitControls(camera,renderer.domElement)
const gridHelper = new THREE.GridHelper(200,50);


// Objects

  // Planets 

const fixedSize = 0.2
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(109*fixedSize,1000,1000),
  new THREE.MeshBasicMaterial({map:sunTexture})
);

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.38,100,100),
  new THREE.MeshStandardMaterial({map:mercuryTexture})
);

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.95,100,100),
  new THREE.MeshStandardMaterial({map:venusTexture})
);


const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1,100,100),
  new THREE.MeshStandardMaterial({map:earthTexture})
);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.53,100,100),
  new THREE.MeshStandardMaterial({map:marsTexture})
);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(11.2,100,100),
  new THREE.MeshStandardMaterial({map:jupiterTexture})
);

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(9.45,100,100),
  new THREE.MeshStandardMaterial({map:saturnTexture})
);

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4.01,100,100),
  new THREE.MeshStandardMaterial({map:uranusTexture})
);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3.88,100,100),
  new THREE.MeshStandardMaterial({map:neptuneTexture})
);




const earthCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
earthCamera.position.set(0, 0, 2);
earth.add(earthCamera);

// Light
const sunlight = new THREE.PointLight(0xffffff,5);
sunlight.position.set(0,0,0)
sunlight.castShadow = true;
sun.add(sunlight)

// Group
const earthOrbitGroup = new THREE.Group();
const mercuryOrbitGroup = new THREE.Group();
const venusOrbitGroup = new THREE.Group();
const marsOrbitGroup = new THREE.Group();
const jupiterOrbitGroup = new THREE.Group();
const saturnOrbitGroup = new THREE.Group();
const uranusOrbitGroup = new THREE.Group();
const neptuneOrbitGroup = new THREE.Group();

// Curve
function curveMaker(rad){
  return new THREE.EllipseCurve(
    0, 0,
    rad,rad, 
    0, 2 * Math.PI, 
    false, 
    0 
  );
}

const AU = 20
const surface = 10


const earthOrbitCurve = curveMaker(surface + Math.sqrt(2) * surface+AU);
const earthOrbitLine = orbitMaker(0x808080,500,earthOrbitCurve);
earthOrbitGroup.add(earth,earthOrbitLine);

const mercuryOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*0.39)))
const mercuryOrbitLine = orbitMaker(0x808080,500,mercuryOrbitCurve)
mercuryOrbitGroup.add(mercury,mercuryOrbitLine);

const venusOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*0.62)))
const venusOrbitLine = orbitMaker(0x808080,500,venusOrbitCurve)
venusOrbitGroup.add(venus,venusOrbitLine);


const marsOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*1.52)))
const marsOrbitLine = orbitMaker(0x808080,500,marsOrbitCurve)
marsOrbitGroup.add(mars,marsOrbitLine);

const jupiterOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*5.2)))
const jupiterOrbitLine = orbitMaker(0x808080,500,jupiterOrbitCurve)
jupiterOrbitGroup.add(jupiter,jupiterOrbitLine);

const saturnOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*9.58)))
const saturnOrbitLine = orbitMaker(0x808080,500,saturnOrbitCurve)
saturnOrbitGroup.add(saturn,saturnOrbitLine);

const uranusOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*19.18)))
const uranusOrbitLine = orbitMaker(0x808080,500,uranusOrbitCurve)
uranusOrbitGroup.add(uranus,uranusOrbitLine);

const neptuneOrbitCurve = curveMaker(surface + (Math.sqrt(2) * (surface + AU*30.07)))
const neptuneOrbitLine = orbitMaker(0x808080,500,neptuneOrbitCurve)
neptuneOrbitGroup.add(neptune,neptuneOrbitLine);

scene.add(mercuryOrbitGroup,venusOrbitGroup,earthOrbitGroup,marsOrbitGroup,jupiterOrbitGroup,saturnOrbitGroup,uranusOrbitGroup,neptuneOrbitGroup);

// Positions
function setPos(x,y,planet){
  planet.position.x = x;
  planet.position.y = y;
}


// Functions
function addStars(){
  const geometry = new THREE.SphereGeometry(0.12,24,24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x,y,z);
  scene.add(star);
}

function orbitMaker(color,points,planetOrbit){
  const orbitMaterial = new THREE.LineBasicMaterial({ color: color });
  const orbitPoints = planetOrbit.getPoints(points);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
  return orbitLine;
}

function rotator(obj){
  obj.rotation.x += 0.001;
  obj.rotation.y += 0.001;
}

function changeCamera(){
  if (currCamera == camera) currCamera = earthCamera;
  else currCamera = camera;
}



// Logic
Array(2000).fill().forEach(addStars);
scene.add(sun);

const cameraChange = document.getElementById('cameraChange');
cameraChange.addEventListener('click',changeCamera);



// Animate
function animate() {
  requestAnimationFrame(animate);

  rotator(sun)
  rotator(earth)

  const earthPosition = earthOrbitCurve.getPoint((Date.now() * 0.0001) % 1);
  earth.position.x = earthPosition.x;
  earth.position.y = earthPosition.y;

  const mercuryPosition = mercuryOrbitCurve.getPoint((Date.now() * 0.0001 / 0.38) % 1);
  mercury.position.x = mercuryPosition.x;
  mercury.position.y = mercuryPosition.y;

  const venusPosition = venusOrbitCurve.getPoint((Date.now() * 0.0001 / 0.62) % 1);
  venus.position.x = venusPosition.x;
  venus.position.y = venusPosition.y;

  const marsPosition =  marsOrbitCurve.getPoint((Date.now() * 0.0001 / 1.88) % 1);
  mars.position.x =  marsPosition.x;
  mars.position.y =  marsPosition.y;

  const jupiterPosition = jupiterOrbitCurve.getPoint((Date.now() * 0.0001 /  11.86) % 1);
  jupiter.position.x = jupiterPosition.x;
  jupiter.position.y = jupiterPosition.y;

  const saturnPosition = saturnOrbitCurve.getPoint((Date.now() * 0.0001 / 29.46) % 1);
  saturn.position.x = saturnPosition.x;
  saturn.position.y =  saturnPosition.y;

  const uranusPosition = uranusOrbitCurve.getPoint((Date.now() * 0.0001 / 84.01) % 1);
  uranus.position.x = uranusPosition.x;
  uranus.position.y = uranusPosition.y;

  const neptunePosition = neptuneOrbitCurve.getPoint((Date.now() * 0.0001 / 164.79) % 1);
  neptune.position.x = neptunePosition.x;
  neptune.position.y = neptunePosition.y;


  controls.update()

  renderer.render(scene, currCamera);
}

animate();
