import * as THREE from "three";

export default function Icon(size, image) {
  this.mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(image),
      transparent: true,
    })
  );
}

Icon.prototype.update = function () {};
