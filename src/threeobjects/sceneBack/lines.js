import * as THREE from "three";

export default function Lines() {
  this.group = new THREE.Group()
  const points = [];
  points.push(new THREE.Vector3(500, -190, -20));
  points.push(new THREE.Vector3(-50, 13, -20));
  points.push(new THREE.Vector3(-500, -190, -20));

  for(let i = 0; i<60; i++) {
    this.group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0x8be9fd, transparent: true, opacity: 1.0/(i*i/10), linewidth: 2 })
      ).translateZ(-i*6)
    );
  }
  const points2 = [];
  points2.push(new THREE.Vector3(-500, 190, -20));
  points2.push(new THREE.Vector3(50, -13, -20));
  points2.push(new THREE.Vector3(500, 190, -20));

  for(let i = 0; i<60; i++) {
    this.group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points2),
        new THREE.LineBasicMaterial({ color: 0x8be9fd, transparent: true, opacity: 1.0/(i*i/10), linewidth: 2 })
      ).translateZ(-i*6)
    );
  }
}

Lines.prototype.update = function () {};
