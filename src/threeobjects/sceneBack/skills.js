import * as THREE from "three";

import Icon from "./icon";
import globalstateobj from "../../globalstate";

export default function Skills() {
  this.updatesPerSecond = 60;

  this.radius = 14;
  this.anglePerSecond = 45;

  const iconsize = 5;
  this.icons = [
    // iconMesh(iconsize, require(/.."../resour/skillIconsces/golang.png")),
    new Icon(iconsize, require("../../resources/skillIcons/git.png")),
    new Icon(iconsize, require("../../resources/skillIcons/cpp.png")),
    new Icon(iconsize, require("../../resources/skillIcons/js.png")),
    new Icon(iconsize, require("../../resources/skillIcons/sql.png")),
    new Icon(iconsize, require("../../resources/skillIcons/docker.png")),
    new Icon(iconsize, require("../../resources/skillIcons/html.png")),
    new Icon(iconsize, require("../../resources/skillIcons/c.png")),
    new Icon(iconsize, require("../../resources/skillIcons/ethereum.png")),
    new Icon(iconsize, require("../../resources/skillIcons/bitcoin.png")),
    new Icon(iconsize, require("../../resources/skillIcons/react.png")),
    new Icon(iconsize, require("../../resources/skillIcons/arduino.png")),
    new Icon(iconsize, require("../../resources/skillIcons/raspberrypi.png")),
    new Icon(iconsize, require("../../resources/skillIcons/php.png")),
    new Icon(iconsize, require("../../resources/skillIcons/blender.png")),
    new Icon(iconsize, require("../../resources/skillIcons/db.png")),
    new Icon(iconsize, require("../../resources/skillIcons/cloud.png")),
    new Icon(iconsize, require("../../resources/skillIcons/linux.png")),
  ];
  this.icongroup = new THREE.Group();
  this.icons.forEach((icon) => {
    this.icongroup.add(icon.mesh);
  });

  this.group = new THREE.Group();
  let material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(require("../../resources/textures/PB.png")),
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
  this.group.add(this.cube);
  // wireframe
  this.wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(this.cube.geometry),
    new THREE.LineBasicMaterial({ color: 0x8be9fd, linewidth: 2 })
  );
  this.wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
  this.group.add(this.wireframe);
  this.group.add(this.icongroup);

  this.currentAngle = 0;

  this.lastTime = 0;

  this.clicked = false;
  this.lastMouseXPos = 0;
}

Skills.prototype.rotateIcons = function(angle) {
  let offset = 0;
  this.icongroup.children.forEach((icon) => {
    icon.position.x = Math.cos(angle - offset) * this.radius;
    icon.position.z = Math.sin(angle - offset) * this.radius;
    offset += (360 / this.icons.length / 180) * Math.PI;
  });
}
Skills.prototype.update = function() {
  let frametime = (window.performance.now() - this.lastTime) / 1000;

  if (frametime >= 1 / this.updatesPerSecond) {
    // check if skills is clicked
    this.group.traverse((child) => {
      if (child.isMesh && globalstateobj.clickedUuid === child.uuid) {
        globalstateobj.clickedUuid = "";
        this.clicked = true;
      }
    });

    if (this.clicked && globalstateobj.mouseDown) {
      this.rotateIcons(this.currentAngle)
      const mouseXDiff = (globalstateobj.mouseX - this.lastMouseXPos) * 2;
      this.currentAngle += mouseXDiff;

      this.cube.rotateY(mouseXDiff);
      this.wireframe.rotateY(mouseXDiff);
    } else {
      this.rotateIcons(this.currentAngle)
      this.currentAngle +=
        (this.anglePerSecond / this.updatesPerSecond / 180) * Math.PI;

      this.cube.rotateY(0.002);
      this.wireframe.rotateY(0.002);
      this.clicked = false;
    }

    this.lastTime = window.performance.now();
    this.lastMouseXPos = globalstateobj.mouseX;
  }

};
