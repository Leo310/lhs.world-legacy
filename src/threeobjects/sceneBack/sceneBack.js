import * as THREE from "three";

import Magazine from "./magazine";
import Lines from "./lines"
import globalstateobj from "../../globalstate";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";

export default function SceneBack(threecontainer) {
  this.threeobjects = [new Magazine(), new Lines()];
  // this.threeobjects = [new Magazine()];

  //renderer
  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // this.renderer.outputEncoding = THREE.sRGBEncoding;
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  threecontainer.appendChild(this.renderer.domElement);
  this.renderer.domElement.id = "canvas";

  this.composer = new EffectComposer(this.renderer)

  //camera
  this.camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  this.camera.position.set(0, 0, 30);
  this.camera.lookAt(0, 0, 0);
  // camera.rotateX(20);
  // camera.rotateY(20);

  // scene
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x21222c);
  // scene.background = new THREE.Color(0x282a36);
  this.raycaster = new THREE.Raycaster();

  this.threeobjects.forEach((element) => {
    this.scene.add(element.group);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  this.scene.add(ambientLight)

  // const renderPass = new RenderPass( this.scene, this.camera );
  // this.composer.addPass( renderPass );
  // const glitchPass = new BloomPass();
  // this.composer.addPass( glitchPass );
  //
  this.lastRayCastTime = 0;
}

SceneBack.prototype.updateRaycaster = function(clicked) {
  let mousePos = new THREE.Vector2(
    globalstateobj.mouseX,
    globalstateobj.mouseY
  );
  this.raycaster.setFromCamera(mousePos, this.camera);

  let intersects = this.raycaster.intersectObjects(this.scene.children);
  if (intersects[0]) {
    this.scene.traverse((child) => {
      if (child.isMesh && intersects[0].object.uuid === child.uuid)
        if (clicked)
          globalstateobj.clickedUuid = child.uuid;
        else
          globalstateobj.hoveredUuid = child.uuid;
    });
  }
};

SceneBack.prototype.update = function() {
  this.renderer.render(this.scene, this.camera);
  this.renderer.autoClear = false;

  this.composer.render()

  let now = new Date().getTime()
  if (globalstateobj.raycasting && globalstateobj.mouseDown) {
    this.updateRaycaster(true);
    globalstateobj.raycasting = false;
  } else if (globalstateobj.raycasting && now - this.lastRayCastTime > 100) {
    this.updateRaycaster(false);
    globalstateobj.mouseToRed = false;
    globalstateobj.raycasting = false;
    this.lastRayCastTime = now;
  }

  if (
    this.renderer.domElement.width !== window.innerWidth ||
    this.renderer.domElement.height !== window.innerHeight
  ) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  this.threeobjects.forEach((element) => {
    element.update();
  });
};
