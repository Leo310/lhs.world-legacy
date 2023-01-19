import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import globalstateobj from '../../globalstate';

export default function Workspace() {
    this.group = new THREE.Group();

    const loader = new GLTFLoader();

    this.lastScrollPos = 0;

    // this.dirLight = new THREE.DirectionalLight(0xff8800, 0.6);
    // this.helper = new THREE.DirectionalLightHelper(this.dirLight);
    // this.dirLight.position.set(0, 0, 0);

    let video = document.createElement('video');
    video.src = require('../../resources/textures/monitorvideo.mp4');
    video.playsInline = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.play();
    let videoTexture = new THREE.VideoTexture(video);
    videoTexture.encoding = THREE.sRGBEncoding;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    loader.load(
        require('../../resources/models/myroom.glb'),
        (gltf) => {
            gltf.scene.position.set(0, 0, 0);
            this.group.add(gltf.scene);
            this.group.traverse((child) => {
                if (child.name === 'screen1' || child.name === 'screen2') {
                    child.material = new THREE.MeshBasicMaterial({ map: videoTexture });
                }
                if (child.name.includes('Neon')) {
                    child.layers.enable(11); // 11: Bloom layer
                }
            });
            // this.dirLight.position.set(this.myroomgroup.position.x + neonPosition.x, neonPosition.y, neonPosition.z);
            // const pos = this.myroomgroup.position;
            // this.dirLight.position.set(pos.x,pos.y,pos.z);
            // console.log(this.dirLight.position)
        },
        undefined,
        function(error) {
            console.error(error);
        }
    );
    this.group.rotateX((20 / 180) * Math.PI);
    this.group.rotateY((-70 / 180) * Math.PI);
    this.group.scale.set(1, 1, 1);
    // this.group.add(this.myroomgroup);
    // this.group.add( this.helper);
    // this.group.add(this.dirLight);
    // this.group.add(this.cursorMesh)
    //
    this.clicked = false;
    this.lastMouseXPos = 0;
}

Workspace.prototype.update = function() {
    // this.dirLight.position.set(this.group.position.x, this.group.position.y+1, this.group.position.z);
    // this.group.rotateY((this.lastScrollPos - globalstateobj.scrollPositionBody)/100);
    // this.lastScrollPos = globalstateobj.scrollPositionBody;

    this.group.traverse((child) => {
        if (child.isMesh && globalstateobj.clickedUuid === child.uuid) {
            globalstateobj.clickedUuid = '';
            this.clicked = true;
        } else if (child.uuid === globalstateobj.hoveredUuid) {
            globalstateobj.hoveredUuid = '';
            globalstateobj.mouseToRed = true;
            return false; // breaks
        }
    });
    if (this.clicked && globalstateobj.mouseDown) {
        this.group.rotateY((globalstateobj.mouseX - this.lastMouseXPos) * 2);
    } else {
        this.group.rotateY(0.01);
        this.clicked = false;
    }

    this.lastMouseXPos = globalstateobj.mouseX;
};
