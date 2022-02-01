import * as THREE from "three";

import Threeobject from "./threeobject.js";

Skills.prototype = Object.create(Threeobject.prototype);
Skills.prototype.constructor = Skills;

export default function Skills() {
  Threeobject.call(this);
  // face
  // let picWidth = 528 / 150;
  // let picHeight = 595 / 150;
  const faceTexture = new THREE.TextureLoader().load(
    require("../resources/PB3.png")
  );
  this.skillsMesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({ map: faceTexture, color: 0xffffff })
  );
  this.meshes.push(this.skillsMesh);

  const cppTexture = new THREE.TextureLoader().load(
    require("../resources/cpp.png")
  );
  const goTexture = new THREE.TextureLoader().load(
    require("../resources/golang.png")
  );
  const jsTexture = new THREE.TextureLoader().load(
    require("../resources/js.png")
  );
  this.cppMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
      map: cppTexture,
      transparent: true,
    })
  );
  this.meshes.push(this.cppMesh);
  this.goMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
      map: goTexture,
      transparent: true,
    })
  );
  this.meshes.push(this.goMesh);
  this.jsMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
      map: jsTexture,
      transparent: true,
    })
  );
  this.meshes.push(this.jsMesh);

  this.angle = 0;
  this.lastTime = 0;
  this.lastZCube = 0;
  this.lastZCpp = 0;
  this.lastZGo = 0;
  this.lastZJs = 0;
}

Skills.prototype.update = function () {
  let frametime = (window.performance.now() - this.lastTime) / 1000;
  this.skillsMesh.position.z = -this.scrollPosition / 0.5;

  this.cppMesh.position.z =
    this.lastZCpp + this.skillsMesh.position.z - this.lastZCube;
  this.goMesh.position.z =
    this.lastZGo + this.skillsMesh.position.z - this.lastZCube;
  this.jsMesh.position.z =
    this.lastZJs + this.skillsMesh.position.z - this.lastZCube;

  if (frametime > 1 / 2) {
    this.angle += 45;
    this.cppMesh.position.setX(
      this.skillsMesh.position.x + Math.cos((this.angle / 180) * Math.PI) * 10
    );
    this.cppMesh.position.setZ(
      this.skillsMesh.position.z + Math.sin((this.angle / 180) * Math.PI) * 10
    );
    this.goMesh.position.setX(
      this.skillsMesh.position.x +
        Math.cos(((this.angle - 45) / 180) * Math.PI) * 10
    );
    this.goMesh.position.setZ(
      this.skillsMesh.position.z +
        Math.sin(((this.angle - 45) / 180) * Math.PI) * 10
    );
    this.jsMesh.position.setX(
      this.skillsMesh.position.x +
        Math.cos(((this.angle - 90) / 180) * Math.PI) * 10
    );
    this.jsMesh.position.setZ(
      this.skillsMesh.position.z +
        Math.sin(((this.angle - 90) / 180) * Math.PI) * 10
    );
    this.lastTime = window.performance.now();
    this.lastZCube = this.skillsMesh.position.z;
    this.lastZCpp = this.cppMesh.position.z;
    this.lastZGo = this.goMesh.position.z;
    this.lastZJs = this.jsMesh.position.z;
  }
};
