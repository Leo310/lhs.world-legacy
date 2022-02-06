import * as THREE from "three";

import globalstateobj from "../../globalstate";
import Skills from "./skills";

export default function Magazine() {
  this.magazine = [
    new Skills(),
    new Skills(),
    new Skills(),
    new Skills(),
    new Skills(),
  ];
  this.radius = 30;

  this.origin = new THREE.Vector3(15, 10 + this.radius, 0);
  this.updatesPerSecond = 60;

  this.group = new THREE.Group();
  this.magazine.forEach((bullet) => {
    this.group.add(bullet.group);
  });

  this.currentAngle = 0;

  this.lastTime = 0;

  this.lastScrollPosition = 0;
}

Magazine.prototype.update = function () {
  let frametime = (window.performance.now() - this.lastTime) / 1000;

  if (frametime >= 1 / this.updatesPerSecond) {
    let offset = 0;
    this.group.children.forEach((bullet) => {
      bullet.position.x =
        this.origin.x + Math.sin(this.currentAngle - offset) * this.radius;
      bullet.position.y =
        this.origin.y + -Math.cos(this.currentAngle - offset) * this.radius;
      bullet.position.z =
        this.origin.z + Math.sin(this.currentAngle - offset) * this.radius;
      offset += (360 / this.magazine.length / 180) * Math.PI;
    });
    this.magazine.forEach((bullet) => {
      bullet.update();
    });

    this.currentAngle +=
      (this.lastScrollPosition - globalstateobj.scrollPosition) /
      this.updatesPerSecond /
      10; // needs some experimenting

    this.lastScrollPosition = globalstateobj.scrollPosition;
    this.lastTime = window.performance.now();
  }
};
