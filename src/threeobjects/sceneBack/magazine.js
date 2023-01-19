import * as THREE from 'three';

import globalstateobj from '../../globalstate';

import Audio from './audio';
import Wordcloud from './wordcloud';
import Workspace from './workspace';
import MyWorld from './myworld';
import Skills from './skills';

export default function Magazine() {
    this.magazine = [new MyWorld(), new Wordcloud(), new Skills(), new Workspace(), new Audio()];
    this.radius = 30;

    this.outOfWindowOffset = 60;
    if (window.innerWidth > 768) {
        this.targetOrigin = new THREE.Vector3(20, 8 + this.radius, 0);
    } else {
        this.targetOrigin = new THREE.Vector3(0, 15 + this.radius, 0);
    }
    this.origin = new THREE.Vector3(this.targetOrigin.x + this.outOfWindowOffset, this.targetOrigin.y + this.outOfWindowOffset, 0);
    this.moveTo = new THREE.Vector3(this.targetOrigin.x + this.outOfWindowOffset, this.targetOrigin.y + this.outOfWindowOffset, 0); // for smoother scrolling

    this.updatesPerSecond = 60;

    this.group = new THREE.Group();
    this.magazine.forEach((bullet) => {
        this.group.add(bullet.group);
    });

    this.currentAngle = 0.0;
    this.lastScrollPosition = 0;
    this.lastTime = 0;
}

Magazine.prototype.update = function() {
    let frametime = (window.performance.now() - this.lastTime) / 1000;

    if (frametime >= 1 / this.updatesPerSecond) {
        // smoother fade in of magazine
        let scrollDiff = globalstateobj.scrollPositionBody - this.lastScrollPosition;
        this.moveTo.sub({ x: scrollDiff / 19, y: scrollDiff / 19, z: 0 });
        this.moveTo.min({ x: this.targetOrigin.x + this.outOfWindowOffset, y: this.targetOrigin.y + this.outOfWindowOffset, z: 0 });
        this.moveTo.max(this.targetOrigin);
        let targetDiff = new THREE.Vector3();
        targetDiff.subVectors(this.moveTo, this.origin);
        this.origin.add(targetDiff.divide({ x: 5, y: 5, z: 1 }));

        let offset = 0;
        this.group.children.forEach((bullet) => {
            bullet.position.x = this.origin.x + Math.sin(this.currentAngle - offset) * this.radius;
            bullet.position.y = this.origin.y + -Math.cos(this.currentAngle - offset) * this.radius;
            bullet.position.z = this.origin.z + Math.sin(this.currentAngle - offset) * this.radius;
            offset -= (360 / this.magazine.length / 180) * Math.PI;
        });
        this.magazine.forEach((bullet) => {
            bullet.update();
        });
        this.currentAngle = (globalstateobj.scrollPositionLoop / 10.0 / 180) * Math.PI;
        this.lastTime = window.performance.now();
        this.lastScrollPosition = globalstateobj.scrollPositionBody;
    }
};
