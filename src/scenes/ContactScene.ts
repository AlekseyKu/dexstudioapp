// src/scenes/ContactScene.ts
import * as THREE from 'three';

export class ContactScene {
    scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2ecc71);
    }
}