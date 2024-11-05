// src/scenes/AboutScene.ts
import * as THREE from 'three';

export class AboutScene {
    scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe74c3c);
    }
}