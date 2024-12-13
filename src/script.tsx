// src/script.ts
import * as THREE from 'three';
import { HomeScene } from './scenes/HomeScene';
import { AboutScene } from './scenes/AboutScene';
import { ContactScene } from './scenes/ContactScene';
import { setupRenderer, setupCamera } from './utils/renderSetup';
import { handleScroll } from './utils/eventHandlers';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let currentSceneIndex = 0;

const scenes = {
    home: new HomeScene(),
    about: new AboutScene(),
    contact: new ContactScene(),
};

function init(): void {
    const container = document.getElementById('canvas-container');
    if (container) {
        renderer = setupRenderer(container);
        camera = setupCamera();

        // Передаем true, чтобы указать, что это главная страница (Home)
        scenes.home.init(container, true);
        animate();

        window.addEventListener('wheel', (event) => {
            currentSceneIndex = handleScroll(event, scenes, currentSceneIndex, renderer, camera);
        });

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }
}

function animate(): void {
    requestAnimationFrame(animate);
    const activeScene = currentSceneIndex === 0 ? scenes.home.scene : currentSceneIndex === 1 ? scenes.about.scene : scenes.contact.scene;
    renderer.render(activeScene, camera);
}

init();
