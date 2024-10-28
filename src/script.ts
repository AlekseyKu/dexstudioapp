import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import FluidAnimationComponent from './homeFluidAnimation'; // Импортируем компонент анимации жидкости
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scenes: THREE.Scene[] = [];
let currentScene = 0;
let targetScene = 0;
let transitionProgress = 0;

function init(): void {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container')?.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    scenes[0] = createScene('Home', 0x3498db, true); // Передаём true, чтобы добавить анимацию на Home страницу
    scenes[1] = createScene('About', 0xe74c3c);
    scenes[2] = createScene('Contact', 0x2ecc71);

    animate();

    window.addEventListener('wheel', handleScroll);
}

// Создание сцены с текстом и анимацией
function createScene(text: string, color: number, isHome: boolean = false): THREE.Scene {
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(color);

    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font: any) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.2,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.set(-2, 0, 0);
        newScene.add(mesh);
    });

    // Добавляем анимацию на Home страницу
    if (isHome) {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        document.body.appendChild(container);

        // Встра�