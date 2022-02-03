import React from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import App from "./components/app";
import "./index.css";
import Cursor from "./threeobjects/cursor.js";
import Lines from "./threeobjects/lines.js";
import Skills from "./threeobjects/skills.js";
import Threeobject from "./threeobjects/threeobject.js";

function main() {
  // // face
  // let picWidth = 528 / 150;
  // let picHeight = 595 / 150;
  // const faceTexture = new THREE.TextureLoader().load(
  //   require("./components/PB3.png")
  // );
  // const faceGeometry = new THREE.PlaneGeometry(picWidth, picHeight);
  // const faceMaterial = new THREE.MeshBasicMaterial({
  //   map: faceTexture,
  //   transparent: true,
  //   opacity: 0.6,
  // });
  // let faceArray = [];
  // for (let i = 0; i < 12; i++) {
  //   let face = new THREE.Mesh(faceGeometry, faceMaterial);
  //   faceArray.push(face);
  //   // face.translateX(-20);
  //   // face.translateY(20);
  //   face.translateX(picWidth / 2);
  //   face.translateY(-picHeight / 2);
  //   face.translateX(i * (picWidth - 0.5));
  //   // scene.add(face);
  // }
  // // cube.translateY(10);

  //   const sphere = new THREE.Mesh(
  //     new THREE.SphereGeometry(5),
  //     new THREE.MeshBasicMaterial({ map: faceTexture, color: 0xffffff })
  //   );

  // helper
  // const gridHelper = new THREE.GridHelper(200, 200);

  let sceneThreeobjects = [new Skills()];
  let sceneCursorThreeobjects = [new Cursor(), new Lines()];

  //renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "canvas";

  //renderer
  const renderer2 = new THREE.WebGLRenderer({ alpha: true });
  renderer2.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer2.domElement);
  renderer2.domElement.id = "canvas2";

  //camera
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 30);
  camera.lookAt(0, 0, 0);
  const orthocam = new THREE.OrthographicCamera(-100, 100, 100, -100, -50, 50);
  // camera.rotateX(20);
  // camera.rotateY(20);

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x21222c);
  // scene.background = new THREE.Color(0x282a36);

  const sceneCursor = new THREE.Scene();

  sceneThreeobjects.forEach((element) => {
    element.meshes.forEach((mesh) => {
      scene.add(mesh);
    });
  });
  sceneCursorThreeobjects.forEach((element) => {
    element.meshes.forEach((mesh) => {
      sceneCursor.add(mesh);
    });
  });

  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  document.body.addEventListener("mousemove", updateMouse, false);
  document.body.addEventListener("mouseenter", updateMouse, false);
  document.body.addEventListener("mouseleave", updateMouse, false);
  document.body.addEventListener("mousedown", updateRaycaster, false);

  function updateMouse(event) {
    // normalized coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function updateRaycaster() {
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach((element) => console.log(element));
  }

  let scrollPosition = 0;
  window.addEventListener("scroll", () => {
    scrollPosition = window.scrollY;
  });

  // scene.add(gridHelper);
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer2.render(sceneCursor, orthocam);

    Threeobject.prototype.update(mouse.x, mouse.y, scrollPosition);
    sceneThreeobjects.concat(sceneCursorThreeobjects).forEach((element) => {
      element.update();
    });
  }
  render();
}
main();
ReactDOM.render(<App />, document.getElementById("root"));
