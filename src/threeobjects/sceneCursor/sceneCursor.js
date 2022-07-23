import * as THREE from "three";

import Cursor from "./cursor";

export default function SceneCursor(threecontainer) {
  this.threeobjects = [ new Cursor() ];
  this.scene = new THREE.Scene();

  this.threeobjects.forEach((element) => {
    element.meshes.forEach((mesh) => { this.scene.add(mesh); });
  });

  // renderer
  this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true});
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  threecontainer.appendChild(this.renderer.domElement);
  this.renderer.domElement.id = "canvas2";

  this.camera = new THREE.OrthographicCamera(-100, 100, 100, -100, -50, 50);
}

SceneCursor.prototype.update = function() {
  this.renderer.render(this.scene, this.camera);
  if (this.renderer.domElement.width !== window.innerWidth ||
      this.renderer.domElement.height !== window.innerHeight) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  this.threeobjects.forEach((element) => { element.update(); });
};
