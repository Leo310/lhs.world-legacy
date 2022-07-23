import * as THREE from "three";

// import globalstateobj from "../../globalstate";

export default function MyRoom() {
  this.group = new THREE.Group();

  this.cursorMesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(10, 15, 15),
    new THREE.MeshBasicMaterial({
      wireframeLinewidth: 2,
      color: 0x8be9fd,
      wireframe: true,
    })
  );
  this.group.add(this.cursorMesh)
  this.group.rotateZ(23.5/180*Math.PI);
}

MyRoom.prototype.update = function () {
  this.group.rotateY(0.005);
};
