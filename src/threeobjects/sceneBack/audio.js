import * as THREE from "three";
import Icon from "./icon";
import globalstateobj from "../../globalstate";

export default function Audio() {
  this.icons = [
    new Icon(8, require("../../resources/playbutton.png")),
    new Icon(
      8,
      require("../../resources/pausebutton.png"),
      new THREE.Vector3(-0.5, -0.2, 0)
    ),
    // new Icon(10, require("../../resources/circle.png")),
    new Icon(
      5,
      require("../../resources/nextbutton.png"),
      new THREE.Vector3(8, 0, 0)
    ),
    new Icon(
      5,
      require("../../resources/previousbutton.png"),
      new THREE.Vector3(-8, 0, 0)
    ),
  ];
  this.icons[1].mesh.visible = false;
  this.group = new THREE.Group();
  this.icons.forEach((icon) => this.group.add(icon.mesh));
  this.audioElem = document.getElementById("audio");

  this.ended = false;
  this.audioElem.addEventListener("ended", () => {
    this.icons[1].mesh.visible = false;
    this.icons[1].mesh.position.z -= 1;
    this.icons[0].mesh.visible = true;
    this.icons[0].mesh.position.z += 1;
    this.isPlaying = false;
  });

  this.isPlaying = false;

  // this.lastTime = 0;
}

Audio.prototype.update = function () {
  // let frametime = (window.performance.now() - this.lastTime) / 1000;
  this.icons.every((icon, index) => {
    if (icon.mesh.uuid === globalstateobj.clickedUuid) {
      globalstateobj.clickedUuid = "";
      switch (index) {
        case 0:
          icon.mesh.visible = false;
          icon.mesh.position.z -= 1; // because other needs to be in forground to be clicked
          this.icons[1].mesh.visible = true;
          this.icons[1].mesh.position.z += 1;
          this.audioElem.play();
          this.isPlaying = true;
          globalstateobj.scrollPositionBody = 0;
          break;
        case 1:
          icon.mesh.visible = false;
          icon.mesh.position.z -= 1;
          this.icons[0].mesh.visible = true;
          this.icons[0].mesh.position.z += 1;
          this.audioElem.pause();
          this.isPlaying = false;
          break;
        default:
      }
      return false; // breaks
    }
    return true;
  });

  if (this.isPlaying)
    this.audioElem.volume = Math.min(
      Math.max(0, (-globalstateobj.scrollPositionBody + 500) / 1000),
      1
    );
  // if (frametime >= ) {
  //   this.lastTime = window.performance.now();
  // }
};
