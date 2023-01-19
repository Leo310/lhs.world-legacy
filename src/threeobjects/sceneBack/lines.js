import globalstateobj from '../../globalstate';
import * as THREE from 'three';

export default function Lines() {
    this.group = new THREE.Group();
    let pointsDown = [];
    pointsDown.push(new THREE.Vector3(500, -175, 0));
    pointsDown.push(new THREE.Vector3(-45, 13, 0));
    pointsDown.push(new THREE.Vector3(-500, -175, 0));

    let pointsUp = [];
    pointsUp.push(new THREE.Vector3(-500, 175, 0));
    pointsUp.push(new THREE.Vector3(45, -13, 0));
    pointsUp.push(new THREE.Vector3(500, 175, 0));
    this.points = [pointsDown, pointsUp];

    this.lastScrollPosition = 0;
    this.lastWheelPosition = 0;

    this.group.translateZ(-8);
    this.lines = [];
    this.lineRate = 8;
    this.accurateScrollPosition = 0;

    this.farestZIndex = 0;

    this.addLine(0, false);
    this.addLine(1, false);
    this.lines = [];

    this.movedBy = 0;
}

Lines.prototype.addLine = function(back) {
    for (let i = 0; i < 2; i++) {
        let line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(this.points[i]),
            new THREE.LineBasicMaterial({
                color: new THREE.Color(0x8be9fd).convertSRGBToLinear(),
                transparent: true,
                linewidth: 2,
            })
        );
        if (back) {
            line.translateZ(this.farestZIndex);
        }
        this.group.add(line);
        this.lines.push(line);
    }
};

Lines.prototype.translateLines = function(speed) {
    this.lines.forEach((line, index, lines) => {
        if (line.isLine) {
            line.translateZ(speed);
            if (speed > 0 && this.farestZIndex > line.position.z) this.farestZIndex = line.position.z;
            line.material.opacity = 1 / ((line.position.z * line.position.z) / 1000);
            if (line.position.z <= -300 || line.position.z > 0) {
                this.group.remove(this.lines[index]);
                lines.splice(index, 1);
            }
        }
    });
};

Lines.prototype.update = function() {
    // let scrollDiff = globalstateobj.scrollPositionBody - this.lastScrollPosition || globalstateobj.wheelPosition - this.lastWheelPosition;
    // if (scrollDiff) {
    //     this.movedBy += scrollDiff;
    //     const addLines = Math.floor(Math.abs(this.movedBy) / 100);
    //     // console.log('Addlines: ', addLines, '  movedBy: ', this.movedBy, '  lines: ', this.lines.length);
    //     for (let i = 0; i < addLines; i++) {
    //         this.addLine(scrollDiff < 0);
    //         this.translateLines(addLines);
    //     }
    //     if (addLines > 0) this.movedBy = 0;
    // }
    // this.lastWheelPosition = globalstateobj.wheelPosition;
    // this.lastScrollPosition = globalstateobj.scrollPositionBody;

    // scroll if scroll wheel is spinned.Even if already on bottom of page
    let scrollDiff = globalstateobj.scrollPositionBody - this.lastScrollPosition || globalstateobj.wheelPosition - this.lastWheelPosition;
    if (scrollDiff) {
        if (this.accurateScrollPosition % this.lineRate == 0) {
            this.addLine(0, scrollDiff < 0);
            this.addLine(1, scrollDiff < 0);
        }
        this.accurateScrollPosition += scrollDiff < 0 ? -1 : 1;
        this.translateLines(scrollDiff < 0 ? 1 : -1);
    }
    this.lastWheelPosition = globalstateobj.wheelPosition;
    this.lastScrollPosition = globalstateobj.scrollPositionBody;
};
