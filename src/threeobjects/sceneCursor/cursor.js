import * as THREE from "three";

import globalstateobj from "../../globalstate";

export default function Cursor() {
  this.meshes = [];
  this.cursorMesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(4),
    new THREE.MeshBasicMaterial({
      wireframeLinewidth: 2,
      color: 0x50fa7b,
      wireframe: true,
    })
  );
  this.meshes.push(this.cursorMesh);
}

Cursor.prototype.update = function () {
  this.cursorMesh.position.set(
    globalstateobj.mouseX * 100,
    globalstateobj.mouseY * 100
  );
  this.cursorMesh.rotation.x += 0.01;
  this.cursorMesh.rotation.y += 0.01;
};
