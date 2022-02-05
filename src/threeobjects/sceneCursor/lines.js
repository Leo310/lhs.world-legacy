import * as THREE from "three";

export default function Lines() {
  this.meshes = [];
  const points = [];
  points.push(new THREE.Vector3(100, -50, 0));
  points.push(new THREE.Vector3(-60, 20, 0));
  points.push(new THREE.Vector3(-100, -50, 0));

  this.meshes.push(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x8be9fd, linewidth: 2 })
    )
  );
  const points2 = [];
  points2.push(new THREE.Vector3(-100, 50, 0));
  points2.push(new THREE.Vector3(60, -20, 0));
  points2.push(new THREE.Vector3(100, 50, 0));

  this.meshes.push(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points2),
      new THREE.LineBasicMaterial({ color: 0x8be9fd, linewidth: 2 })
    )
  );
}

Lines.prototype.update = function () {};
