import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import globalstateobj from "../../globalstate";

export default function MyRoom() {
  this.group = new THREE.Group();

	const loader = new GLTFLoader();

  this.lastScrollPos = 0;

  this.dirLight = new THREE.DirectionalLight( 0xff8800, 0.6);
  this.helper = new THREE.DirectionalLightHelper(this.dirLight)
  this.dirLight.position.set(0,0,0)

  this.cursorMesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(4),
    new THREE.MeshBasicMaterial({
      wireframeLinewidth: 2,
      color: 0x50fa7b,
      wireframe: true,
    })
  );

  this.myroomgroup = new THREE.Group();
	loader.load( require('../../resources/myroom.glb'), function ( gltf ) {
		// gltf.scene.position.set(0,0,0)
		this.myroomgroup.add( gltf.scene );
    const neonPosition = this.myroomgroup.children[0].children.find(child => child.name === "Neon").position;
    // this.dirLight.position.set(this.myroomgroup.position.x + neonPosition.x, neonPosition.y, neonPosition.z);
    // const pos = this.myroomgroup.position;
    // this.dirLight.position.set(pos.x,pos.y,pos.z);
    // console.log(this.dirLight.position)
	}.bind(this), undefined, function ( error ) {
		console.error( error );
	});
  this.group.rotateX(20/180*Math.PI)
  this.group.rotateY(-70/180*Math.PI)
  this.group.scale.set(1,1,1)
  this.group.add(this.myroomgroup);
	this.group.add( this.helper);
	this.group.add( this.dirLight );
  // this.group.add(this.cursorMesh)
  //
  this.clicked = false;
  this.lastMouseXPos = 0;
}

MyRoom.prototype.update = function () {
	// this.dirLight.position.set(this.group.position.x, this.group.position.y+1, this.group.position.z);
  // this.group.rotateY((this.lastScrollPos - globalstateobj.scrollPositionBody)/100);
  // this.lastScrollPos = globalstateobj.scrollPositionBody;


  this.group.traverse((child) => {
    if (child.isMesh && globalstateobj.clickedUuid === child.uuid) {
      globalstateobj.clickedUuid = "";
      this.clicked = true;
    }
  });
  if(this.clicked && globalstateobj.mouseDown) {
    this.group.rotateY((globalstateobj.mouseX - this.lastMouseXPos)*2)
  } else {
    this.group.rotateY(0.01)
    this.clicked = false;
  }

  this.lastMouseXPos = globalstateobj.mouseX;
};
