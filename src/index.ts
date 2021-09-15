import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./css/global.css";

const canvas: HTMLCanvasElement = document.querySelector(".scene");
const size = { width: window.innerWidth, height: window.innerHeight };

window.addEventListener("resize", function () {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
});

/////////////
//  Scene  //
/////////////

const scene = new THREE.Scene();

//////////////
//  Camera  //
//////////////

const fov = 45;
const aspectRatio = size.width / size.height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.01, 100);
camera.position.z = 3;

////////////
//  Mesh  //
////////////

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

////////////////
//  Controls  //
////////////////

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

////////////////
//  Renderer  //
////////////////

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const tick = () => {
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick();
