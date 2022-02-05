import * as THREE from "three";

import Skills from "./skills";

export default function SceneBack(threecontainer) {
  this.threeobjects = [new Skills()];

  //renderer
  this.renderer = new THREE.WebGLRenderer({ alpha: true });
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  threecontainer.appendChild(this.renderer.domElement);
  this.renderer.domElement.id = "canvas";

  //camera
  this.camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  this.camera.position.set(0, 0, 30);
  this.camera.lookAt(0, 0, 0);
  // camera.rotateX(20);
  // camera.rotateY(20);

  // scene
  this.scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x21222c);
  // scene.background = new THREE.Color(0x282a36);

  this.threeobjects.forEach((element) => {
    element.meshes.forEach((mesh) => {
      this.scene.add(mesh);
    });
  });
}

SceneBack.prototype.update = function () {
  this.renderer.render(this.scene, this.camera);
  this.renderer.autoClear = false;

  this.threeobjects.forEach((element) => {
    element.update();
  });
};
