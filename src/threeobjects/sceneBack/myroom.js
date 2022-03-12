import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import globalstateobj from "../../globalstate";

export default function MyRoom() {
  this.updatesPerSecond = 60;

  this.group = new THREE.Group();

	const loader = new GLTFLoader();

  this.lastScrollPos = 0;

  this.dirLight = new THREE.DirectionalLight( 0xff8800, 0.1);
  this.helper = new THREE.DirectionalLightHelper(this.dirLight)
	// this.group.add( this.helper);
	this.group.add( this.dirLight );
  this.dirLight.position.set(0,5,0)

  this.myroomgroup = new THREE.Group();
  this.myroomgroup.rotateX(30/180*Math.PI)
  this.myroomgroup.rotateY(-70/180*Math.PI)
  this.myroomgroup.scale.set(1,1,1)
	loader.load( require('../../resources/myroom.glb'), function ( gltf ) {
		// gltf.scene.position.set(0,0,0)
		this.myroomgroup.add( gltf.scene );
	}.bind(this), undefined, function ( error ) {
		console.error( error );
	});
  this.group.add(this.myroomgroup);
}

MyRoom.prototype.update = function () {
	// this.dirLight.position.set(this.group.position.x, this.group.position.y+1, this.group.position.z);
  this.dirLight.lookAt(this.group.position)
  this.myroomgroup.rotateY((this.lastScrollPos - globalstateobj.scrollPositionBody)/100);
  this.lastScrollPos = globalstateobj.scrollPositionBody;
};
