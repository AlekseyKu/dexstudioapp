// src/utils/renderSetup.ts
import * as THREE from 'three';

export function setupRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    return renderer;
}

export function setupCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
}
