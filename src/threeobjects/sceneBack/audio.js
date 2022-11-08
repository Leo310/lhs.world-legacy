import * as THREE from "three";
import Icon from "./icon";
import globalstateobj from "../../globalstate";

export default function Audio() {
  this.icons = [
    new Icon(8, require("../../resources/textures/playbutton.png")),
    new Icon(
      8,
      require("../../resources/textures/pausebutton.png"),
      new THREE.Vector3(-0.5, -0.2, 0)
    ),
    // new Icon(10, require("../../resources/circle.png")),
    new Icon(
      5,
      require("../../resources/textures/nextbutton.png"),
      new THREE.Vector3(8, 0, 0)
    ),
    new Icon(
      5,
      require("../../resources/textures/previousbutton.png"),
      new THREE.Vector3(-8, 0, 0)
    ),
  ];
  this.icons[1].mesh.visible = false;
  this.group = new THREE.Group();
  this.icons.forEach((icon) => this.group.add(icon.mesh));
  this.audioElems = document.getElementsByClassName("audio");
  this.audioIndex = 0;

  this.ended = false;
  for (let i = 0; i < this.audioElems.length; i++) {
    this.audioElems[i].addEventListener("ended", () => {
      this.icons[1].mesh.visible = false;
      this.icons[1].mesh.position.z -= 1;
      this.icons[0].mesh.visible = true;
      this.icons[0].mesh.position.z += 1;
      this.isPlaying = false;
      this.audioIndex++;
      if (this.audioIndex === this.audioElems.length)
        this.audioIndex = 0;
      this.playAudio()
    });
  }

  this.isPlaying = false;

  this.volume = 0.5;
  // this.lastTime = 0;

  this.icons[1].mesh.position.z -= 1; // because other needs to be in forground to be clicked
  this.lastScrollPosition = 0;
}

Audio.prototype.playAudio = function() {
  this.icons[0].mesh.visible = false;
  this.icons[1].mesh.visible = true;
  if (!this.isPlaying)
    this.icons[1].mesh.position.z += 2;
  this.audioElems[this.audioIndex].play();
  this.isPlaying = true;
}

Audio.prototype.pauseAudio = function() {
  this.icons[1].mesh.visible = false;
  this.icons[1].mesh.position.z -= 2;
  this.icons[0].mesh.visible = true;
  this.audioElems[this.audioIndex].pause();
  this.isPlaying = false;
}

Audio.prototype.update = function() {
  // let frametime = (window.performance.now() - this.lastTime) / 1000;
  this.icons.every((icon, index) => {
    if (icon.mesh.uuid === globalstateobj.clickedUuid) {
      globalstateobj.clickedUuid = "";
      switch (index) {
        case 0:
          this.playAudio();
          break;
        case 1:
          this.pauseAudio();
          break;
        case 2:
          this.audioElems[this.audioIndex].pause();
          this.audioIndex++;
          if (this.audioIndex === this.audioElems.length)
            this.audioIndex = 0;
          this.playAudio()
          break;
        case 3:
          this.audioElems[this.audioIndex].pause();
          this.audioIndex--;
          if (this.audioIndex < 0)
            this.audioIndex = this.audioElems.length - 1;
          this.playAudio()
          break;
        default:
      }
      return false; // breaks
    }
    return true;
  });

  if (this.isPlaying) {
    this.volume += -(globalstateobj.scrollPositionBody - this.lastScrollPosition) / 500;
    this.volume = Math.min(Math.max(0, this.volume), 1);
    this.audioElems[this.audioIndex].volume = this.volume;
  }

  this.lastScrollPosition = globalstateobj.scrollPositionBody;
  // if (frametime >= ) {
  //   this.lastTime = window.performance.now();
  // }
};
