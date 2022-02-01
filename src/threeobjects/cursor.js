import * as THREE from "three";

import Threeobject from "./threeobject.js";

Cursor.prototype = Object.create(Threeobject.prototype);
Cursor.prototype.constructor = Cursor;

export default function Cursor() {
  Threeobject.call(this);

  this.cursorMesh = new THREE.Mesh(
    new THREE.DodecahedronGeometry(2),
    new THREE.MeshBasicMaterial({
      color: 0x50fa7b,
      wireframe: true,
    })
  );
  this.meshes.push(this.cursorMesh);
}

Cursor.prototype.update = function () {
  this.cursorMesh.position.set(
    ((this.mouseX - window.innerWidth / 2) / (window.innerWidth / 2)) * 100,
    (-(this.mouseY - window.innerHeight / 2) / (window.innerHeight / 2)) * 100
  );
  this.cursorMesh.rotation.x += 0.01;
  this.cursorMesh.rotation.y += 0.01;
};
