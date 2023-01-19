import * as THREE from 'three';

import Magazine from './magazine';
import Lines from './lines';
import globalstateobj from '../../globalstate';

import { BlendFunction, SelectiveBloomEffect, EffectComposer, EffectPass, SMAAEffect, SMAAPreset, EdgeDetectionMode, PredicationMode, RenderPass, BlendMode } from 'postprocessing';

export default function SceneBack(threecontainer) {
    this.threeobjects = [new Magazine(), new Lines()];
    // this.threeobjects = [new Magazine()];

    //renderer
    this.renderer = new THREE.WebGLRenderer({ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.LinearToneMapping;
    // this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    threecontainer.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'canvas';

    this.bloomComposer = new EffectComposer(this.renderer, { multisampling: true });

    //camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 500);
    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(0, 0, 0);

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x21222c).convertSRGBToLinear();
    // scene.background = new THREE.Color(0x282a36);
    this.raycaster = new THREE.Raycaster();

    this.threeobjects.forEach((element) => {
        this.scene.add(element.group);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    let smaaEffect = new SMAAEffect({
        preset: SMAAPreset.HIGH,
        edgeDetectionMode: EdgeDetectionMode.COLOR,
        predicationMode: PredicationMode.DEPTH,
    });
    let selectiveBloom = new SelectiveBloomEffect(this.scene, this.camera, { mipmapBlur: true, luminanceThreshold: 0.1, luminanceSmoothing: 0.3, intensity: 4.0 });
    selectiveBloom.ignoreBackground = true;
    this.bloomComposer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomComposer.addPass(new EffectPass(this.camera, smaaEffect, selectiveBloom));

    this.lastRayCastTime = 0;
}

SceneBack.prototype.updateRaycaster = function(clicked) {
    let mousePos = new THREE.Vector2(globalstateobj.mouseX, globalstateobj.mouseY);
    this.raycaster.setFromCamera(mousePos, this.camera);

    let intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects[0]) {
        this.scene.traverse((child) => {
            if (child.isMesh && intersects[0].object.uuid === child.uuid)
                if (clicked) globalstateobj.clickedUuid = child.uuid;
                else globalstateobj.hoveredUuid = child.uuid;
        });
    }
};

SceneBack.prototype.update = function() {
    this.bloomComposer.render();

    let now = new Date().getTime();
    if (globalstateobj.raycasting && globalstateobj.mouseDown) {
        this.updateRaycaster(true);
        globalstateobj.raycasting = false;
    } else if (globalstateobj.raycasting && now - this.lastRayCastTime > 100) {
        this.updateRaycaster(false);
        if (!globalstateobj.mouseToRedFromHtml) globalstateobj.mouseToRed = false;
        globalstateobj.raycasting = false;
        this.lastRayCastTime = now;
    }

    if (this.renderer.domElement.width !== window.innerWidth || this.renderer.domElement.height !== window.innerHeight) {
        this.bloomComposer.setSize(window.innerWidth, window.innerHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    this.threeobjects.forEach((element) => {
        element.update();
    });
};
