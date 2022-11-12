import * as THREE from "three";

import globalstateobj from "../../globalstate";

import Audio from "./audio";
import Immortalizer from "./immortalizer";
import MyRoom from "./myroom";
import MyWorld from "./myworld";
import Skills from "./skills";

export default function Magazine() {
  this.magazine = [
    new MyWorld(),
    new Immortalizer(),
    new Skills(),
    new MyRoom(),
    new Audio(),
  ];
  this.radius = 30;

  this.outOfWindowOffset = 50;
  if (window.innerWidth > 768) {
    this.targetOrigin = new THREE.Vector3(20, 10 + this.radius, 0);
  }
  else {
    this.targetOrigin = new THREE.Vector3(0, 15 + this.radius, 0);
  }
  this.origin = new THREE.Vector3(this.targetOrigin.x + this.outOfWindowOffset, this.targetOrigin.y + this.outOfWindowOffset, 0);
  this.moveBy = new THREE.Vector3(this.targetOrigin.x + this.outOfWindowOffset, this.targetOrigin.y + this.outOfWindowOffset, 0); // for smoother scrolling

  this.updatesPerSecond = 60;

  this.group = new THREE.Group();
  this.magazine.forEach((bullet) => { this.group.add(bullet.group); });

  this.currentAngle = 0.0;
  this.lastScrollPosition = 0;
  this.lastTime = 0;

}

Magazine.prototype.update = function() {
  let frametime = (window.performance.now() - this.lastTime) / 1000;

  if (frametime >= 1 / this.updatesPerSecond) {
    // smoother fade in of magazine
    let scrollDiff = globalstateobj.scrollPositionBody - this.lastScrollPosition;
    this.moveBy.sub({ x: (scrollDiff / 19), y: (scrollDiff / 19), z: 0 });
    this.moveBy.min({ x: this.targetOrigin.x + this.outOfWindowOffset, y: this.targetOrigin.y + this.outOfWindowOffset, z: 0 });
    this.moveBy.max(this.targetOrigin);
    let targetDiff = new THREE.Vector3();
    targetDiff.subVectors(this.moveBy, this.origin);
    this.origin.add(targetDiff.divide({ x: 3, y: 3, z: 1 }));

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
    this.magazine.forEach((bullet) => { bullet.update(); });
    this.currentAngle = ((-globalstateobj.scrollPositionLoop / 10.0) / 180) *
      Math.PI;
    this.lastTime = window.performance.now();
    this.lastScrollPosition = globalstateobj.scrollPositionBody;
  }
};
