// import './style.css';
// import './slideshow';


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// move with the mouse
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
})

const canvas = renderer.domElement;

const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

;

 console.log(canvas.clientWidth);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);



camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xB000F5});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(5,5,5);

// helpers to set your lights and position
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

// add conttoller
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, ambientLight);

// add stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xDBC0FF});
  const star = new THREE.Mesh(geometry,material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
  
}

Array(100).fill().forEach(addStar);

// change background
const galaxyTexture = new THREE.TextureLoader().load('./galaxy.jpg');
scene.background = galaxyTexture;

// add myself to the scene
const EmmelineTexture = new THREE.TextureLoader().load('./Emmeline.jpg');

const Emmeline = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3 ),
  new THREE.MeshBasicMaterial({map:EmmelineTexture})
);

scene.add(Emmeline);

// make the moon

const purplePlanetGltf = new GLTFLoader();
var purpleplanet;

purplePlanetGltf.load('./3D_models/purpleplanet/purpleplanet.gltf', (gltf) => {
 purpleplanet = gltf.scene.children[0];


  purpleplanet.rotation.y += 0.01;
  purpleplanet.position.z = 30;
  purpleplanet.position.x = -2;
  
  
  scene.add(purpleplanet);

});


var audioContext = new AudioContext();

audioContext.resume();
if(canvas.clientWidth >= 1278){
  
  Emmeline.position.z = -5;
Emmeline.position.x = 1.25;
} else if (canvas.clientWidth >= 1){
  
  Emmeline.position.z = -10;
  Emmeline.position.x = 0.5;
}

// add audio
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio( listener );

const audio = new THREE.AudioLoader();
audio.load('audio/comet.mp3',  function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.02 );
	sound.play();
});
// scroll page
function moveCamera(){
// get top property
const t = document.body.getBoundingClientRect().top;

Emmeline.rotation.z += 0.01
Emmeline.rotation.x += 0.01

camera.position.z = t * -0.01;
camera.position.y = t * -0.0002;
camera.position.x = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// render every animation
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z +=0.01;
  renderer.render(scene,camera);
}

animate();


