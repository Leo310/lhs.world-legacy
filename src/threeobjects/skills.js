import * as THREE from "three";
import Threeobject from "./threeobject.js";

Skills.prototype = Object.create(Threeobject.prototype);
Skills.prototype.constructor = Skills;

function iconMesh(size, image) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(image),
      transparent: true,
    })
  );
}
export default function Skills() {
  Threeobject.call(this);

  // let picWidth = 528 / 150;
  // let picHeight = 595 / 150;

  let material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(require("../resources/PB.png")),
    // color: 0xbd93f9,
    // transparent: true,
    // side: THREE.DoubleSide,
  });
  let bottomtop = new THREE.MeshBasicMaterial({
    color: 0x2f253e,
    // side: THREE.DoubleSide,
  });
  this.cube = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 8), [
    material,
    material,
    bottomtop,
    bottomtop,
    material,
    material,
  ]);
  this.meshes.push(this.cube);
  // wireframe
  this.wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(this.cube.geometry),
    new THREE.LineBasicMaterial({ color: 0x8be9fd, linewidth: 2 })
  );
  this.wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
  this.meshes.push(this.wireframe);

  const iconsize = 5;
  this.radius = 14;
  this.updatesPerSecond = 60;
  this.iconmeshes = [
    iconMesh(iconsize, require("../resources/newcolor/git.png")),
    iconMesh(iconsize, require("../resources/newcolor/cpp.png")),
    iconMesh(iconsize, require("../resources/newcolor/js.png")),
    // iconMesh(iconsize, require("../resources/newcolor/golang.png")),
    iconMesh(iconsize, require("../resources/newcolor/sql.png")),
    iconMesh(iconsize, require("../resources/newcolor/docker.png")),
    iconMesh(iconsize, require("../resources/newcolor/html.png")),
    iconMesh(iconsize, require("../resources/newcolor/c.png")),
    iconMesh(iconsize, require("../resources/newcolor/ethereum.png")),
    iconMesh(iconsize, require("../resources/newcolor/bitcoin.png")),
    iconMesh(iconsize, require("../resources/newcolor/react.png")),
    iconMesh(iconsize, require("../resources/newcolor/arduino.png")),
    iconMesh(iconsize, require("../resources/newcolor/raspberrypi.png")),
    iconMesh(iconsize, require("../resources/newcolor/php.png")),
    iconMesh(iconsize, require("../resources/newcolor/blender.png")),
    iconMesh(iconsize, require("../resources/newcolor/db.png")),
    iconMesh(iconsize, require("../resources/newcolor/cloud.png")),
    iconMesh(iconsize, require("../resources/newcolor/linux.png")),
  ];

  this.meshes = this.meshes.concat(this.iconmeshes);
  this.meshes.forEach((element) => {
    element.position.set(18, 10);
  });

  this.currentAngle = 0;
  this.anglePerSecond = 45;

  this.lastTime = 0;

  this.lastScrollPosition = 0;
}

Skills.prototype.update = function () {
  let frametime = (window.performance.now() - this.lastTime) / 1000;

  this.cube.position.z = -this.scrollPosition / 4;
  this.wireframe.position.z = -this.scrollPosition / 4;
  this.iconmeshes.forEach((element) => {
    element.position.z += (this.lastScrollPosition - this.scrollPosition) / 4;
  });
  this.lastScrollPosition = this.scrollPosition;

  if (frametime >= 1 / this.updatesPerSecond) {
    this.currentAngle +=
      (this.anglePerSecond / this.updatesPerSecond / 180) * Math.PI;

    let offset = 0;
    this.iconmeshes.forEach((element) => {
      element.position.x =
        this.cube.position.x +
        Math.cos(this.currentAngle - offset) * this.radius;
      element.position.z =
        this.cube.position.z +
        Math.sin(this.currentAngle - offset) * this.radius;
      offset += (360 / this.iconmeshes.length / 180) * Math.PI;
    });

    this.lastTime = window.performance.now();
  }
  this.cube.rotateY(0.002);
  this.wireframe.rotateY(0.002);
};
