import * as THREE from "three";

export default function Icon(size, image, position = 0) {
  this.mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(image),
      transparent: true,
      alphaTest: 0.5,
    })
  );
  if (position) this.mesh.position.set(position.x, position.y, position.z);
}

Icon.prototype.update = function () {};
