import * as THREE from "three";

import globalstateobj from "../../globalstate";

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
  this.meshes = [];
  // let picWidth = 528 / 150;
  // let picHeight = 595 / 150;

  let material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(require("../../resources/PB.png")),
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

  this.radiusBig = 30;
  // this.anglePerSecondBig = 45;

  this.origin = new THREE.Vector3(15, 10 + this.radiusBig, 0);
  this.updatesPerSecond = 60;

  const iconsize = 5;
  this.radius = 14;
  this.anglePerSecond = 45;

  this.iconmeshes = [
    iconMesh(iconsize, require("../../resources/skillIcons/git.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/cpp.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/js.png")),
    // iconMesh(iconsize, require(/.."../resour/skillIconsces/golang.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/sql.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/docker.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/html.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/c.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/ethereum.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/bitcoin.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/react.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/arduino.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/raspberrypi.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/php.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/blender.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/db.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/cloud.png")),
    iconMesh(iconsize, require("../../resources/skillIcons/linux.png")),
  ];

  this.meshes = this.meshes.concat(this.iconmeshes);

  this.currentAngle = 0;

  this.currentAngleBig = 0;

  this.lastTime = 0;

  this.lastScrollPosition = 0;
}

Skills.prototype.update = function () {
  let frametime = (window.performance.now() - this.lastTime) / 1000;

  // this.cube.position.z = -this.scrollPosition / 4;
  // this.wireframe.position.z = -this.scrollPosition / 4;
  // this.iconmeshes.forEach((element) => {
  //   element.position.z += (this.lastScrollPosition - this.scrollPosition) / 4;
  // });

  if (frametime >= 1 / this.updatesPerSecond) {
    this.cube.position.x =
      this.origin.x + Math.sin(this.currentAngleBig) * this.radiusBig;
    this.wireframe.position.x =
      this.origin.x + Math.sin(this.currentAngleBig) * this.radiusBig;
    this.cube.position.y =
      this.origin.y + -Math.cos(this.currentAngleBig) * this.radiusBig;
    this.wireframe.position.y =
      this.origin.y + -Math.cos(this.currentAngleBig) * this.radiusBig;
    this.cube.position.z =
      this.origin.z + Math.sin(this.currentAngleBig) * this.radiusBig;
    this.wireframe.position.z =
      this.origin.z + Math.sin(this.currentAngleBig) * this.radiusBig;

    let offset = 0;
    this.iconmeshes.forEach((element) => {
      element.position.x =
        this.cube.position.x +
        Math.cos(this.currentAngle - offset) * this.radius;
      element.position.y = this.cube.position.y;
      element.position.z =
        this.cube.position.z +
        Math.sin(this.currentAngle - offset) * this.radius;
      offset += (360 / this.iconmeshes.length / 180) * Math.PI;
    });
    this.currentAngle +=
      (this.anglePerSecond / this.updatesPerSecond / 180) * Math.PI;
    // this.currentAngleBig +=
    //   (this.anglePerSecondBig / this.updatesPerSecond / 180) * Math.PI;
    this.currentAngleBig +=
      (this.lastScrollPosition - globalstateobj.scrollPosition) /
      this.updatesPerSecond /
      10; // needs some experimenting

    this.cube.rotateY(0.002);
    this.wireframe.rotateY(0.002);

    this.lastScrollPosition = globalstateobj.scrollPosition;
    this.lastTime = window.performance.now();
  }
};
