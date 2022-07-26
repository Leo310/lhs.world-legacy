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
  this.cursorCircleMesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5),
    new THREE.MeshBasicMaterial({
      wireframeLinewidth: 1,
      color: 0x50fa7b,
      wireframe: true,
    })
  );
  this.meshes.push(this.cursorMesh);
  this.meshes.push(this.cursorCircleMesh);

  this.cursorScale = 1.0;
}

Cursor.prototype.update = function () {
  this.meshes.forEach(mesh => {
    mesh.position.set(
      globalstateobj.mouseX * 100,
      globalstateobj.mouseY * 100
    );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  })

  if(globalstateobj.mouseToRed) {
  this.meshes.forEach(mesh => {
    mesh.material.color = new THREE.Color(0xff5555);
    if( this.cursorScale <= 1.5) {
      mesh.scale.set(this.cursorScale, this.cursorScale, this.cursorScale)
      this.cursorScale += 0.04;
    }
  });
  }
  else{
    this.meshes.forEach(mesh => {
    mesh.material.color = new THREE.Color(0x50fa7b);
      if( this.cursorScale >= 1.0) {
        mesh.scale.set(this.cursorScale, this.cursorScale, this.cursorScale)
        this.cursorScale -= 0.04;
      }
    });
  }
};
