import * as THREE from "three";

function iconMesh(size, image) {}

export default function Icons(size, image) {
  this.meshes = [
    new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(image),
        transparent: true,
      })
    ),
  ];
}

Icons.prototype.update = function () {};
