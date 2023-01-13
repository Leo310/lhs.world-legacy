import * as THREE from 'three';
import Icon from './icon';
import globalstateobj from '../../globalstate';

export default function Audio() {
    this.icons = [
        new Icon(6, require('../../resources/textures/playbutton.png'), new THREE.Vector3(0, -4.7, 0)),
        new Icon(6, require('../../resources/textures/pausebutton.png'), new THREE.Vector3(0, -4.7, 0)),
        // new Icon(10, require("../../resources/circle.png")),
        new Icon(4, require('../../resources/textures/nextbutton.png'), new THREE.Vector3(5.5, -4.7, 0)),
        new Icon(4, require('../../resources/textures/previousbutton.png'), new THREE.Vector3(-5.5, -4.7, 0)),
        new Icon(18.26, require('../../resources/textures/frame.png'), new THREE.Vector3(0.07, 0.5, -0.1)),
    ];
    this.icons[1].mesh.visible = false;
    this.group = new THREE.Group();
    this.icons.forEach((icon) => this.group.add(icon.mesh));

    this.audioElems = document.getElementsByClassName('audio');
    this.audioIndex = 0;

    this.isPlaying = false;

    this.icons[1].mesh.position.z -= 0.1; // because other needs to be in forground to be clicked

    this.covers = [];
    for (let i = 0; i < this.audioElems.length; i++) {
        let cover = new Icon(18, require('../../resources/music/cover' + (i + 1) + 'r.png'), new THREE.Vector3(0, 8, 0));
        cover.mesh.visible = false;
        this.covers.push(cover);
        this.group.add(cover.mesh);

        this.audioElems[i].addEventListener('ended', () => {
            this.audioIndex++;
            if (this.audioIndex === this.audioElems.length) this.audioIndex = 0;
            this.playAudio();
        });
    }
    this.covers[0].mesh.visible = true;
}

Audio.prototype.playAudio = function() {
    this.icons[0].mesh.visible = false;
    this.icons[1].mesh.visible = true;
    if (!this.isPlaying) this.icons[1].mesh.position.z += 0.2;
    this.audioElems[this.audioIndex].volume = 0.6;
    this.audioElems[this.audioIndex].play();
    this.isPlaying = true;
};

Audio.prototype.pauseAudio = function() {
    this.icons[1].mesh.visible = false;
    this.icons[1].mesh.position.z -= 0.2;
    this.icons[0].mesh.visible = true;
    this.audioElems[this.audioIndex].pause();
    this.isPlaying = false;
};

Audio.prototype.update = function() {
    this.icons.every((icon, index) => {
        if (icon.mesh.uuid === globalstateobj.clickedUuid) {
            globalstateobj.clickedUuid = '';
            switch (index) {
                case 0:
                    this.playAudio();
                    break;
                case 1:
                    this.pauseAudio();
                    break;
                case 2:
                    this.audioElems[this.audioIndex].pause();
                    this.covers[this.audioIndex].mesh.visible = false;
                    this.audioIndex++;
                    if (this.audioIndex === this.audioElems.length) this.audioIndex = 0;
                    this.covers[this.audioIndex].mesh.visible = true;
                    this.playAudio();
                    break;
                case 3:
                    this.audioElems[this.audioIndex].pause();
                    this.covers[this.audioIndex].mesh.visible = false;
                    this.audioIndex--;
                    if (this.audioIndex < 0) this.audioIndex = this.audioElems.length - 1;
                    this.covers[this.audioIndex].mesh.visible = true;
                    this.playAudio();
                    break;
                default:
            }
            return false; // breaks
        } else if (icon.mesh.uuid === globalstateobj.hoveredUuid) {
            globalstateobj.hoveredUuid = '';
            globalstateobj.mouseToRed = true;
            return false; // breaks
        }
        return true;
    });
};
