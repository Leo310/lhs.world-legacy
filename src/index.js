import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as THREE from "three";

import App from "./components/app";

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x50fa7b });
const cube = new THREE.Mesh(geometry, material);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const camera = new THREE.PerspectiveCamera(
//   45,
//   window.innerWidth / window.innerHeight,
//   1,
//   500
// );
// camera.position.set(0, 0, 30);
// camera.lookAt(0, 0, 0);
const camera = new THREE.OrthographicCamera(-20, 20, 20, -20, -50, 50);
// let canvas = renderer.domElement;
let body = document.body;
body.addEventListener("mousemove", updateDisplay, false);
let mouseX = 0;
let mouseY = 0;
function updateDisplay(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

body.addEventListener("mouseenter", updateDisplay, false);
body.addEventListener("mouseleave", updateDisplay, false);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x21222c);
//create a blue LineBasicMaterial
const material2 = new THREE.LineBasicMaterial({ color: 0x6272a4 });
const points = [];
points.push(new THREE.Vector3(-20, -1, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(20, -1, 0));

const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry2, material2);

const material3 = new THREE.LineBasicMaterial({ color: 0x6272a4 });
const points2 = [];
points2.push(new THREE.Vector3(-20, 1, 0));
points2.push(new THREE.Vector3(0, -10, 0));
points2.push(new THREE.Vector3(20, 1, 0));

const geometry3 = new THREE.BufferGeometry().setFromPoints(points2);
const line2 = new THREE.Line(geometry3, material3);
scene.add(line);
scene.add(line2);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.position.set(
    ((mouseX - window.innerWidth / 2) / (window.innerWidth / 2)) * 20,
    (-(mouseY - window.innerHeight / 2) / (window.innerHeight / 2)) * 20,
    5
  );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
animate();

ReactDOM.render(<App />, document.getElementById("root"));
