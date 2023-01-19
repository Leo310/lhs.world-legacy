import * as THREE from 'three';

export default function Icon(size, image, position = 0) {
    const texture = new THREE.TextureLoader().load(image);
    texture.encoding = THREE.sRGBEncoding;
    this.mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.5,
        })
    );
    if (position) this.mesh.position.set(position.x, position.y, position.z);
}

Icon.prototype.update = function() { };
