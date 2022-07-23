import * as THREE from "three";

import globalstateobj from "../../globalstate";

export default function Immortalizer() {
  this.group = new THREE.Group();
  this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(27, 27),
      new THREE.MeshBasicMaterial({transparent : true, alphaTest : 0.5}));
  this.group.add(this.mesh);
  this.loader_t = new THREE.TextureLoader();
}

Immortalizer.prototype.update = function() {
  if (globalstateobj.wordcloudchanged) {
    // instantiate a loader
    this.loader_t.load(
        // resource URL
        globalstateobj.wordcloudurl,
        // Function when resource is loaded
        function(texture) {
          this.mesh.material.map = texture;
          this.mesh.material.needsUpdate = true;
        }.bind(this));
    globalstateobj.wordcloudchanged = false;
  }
};
