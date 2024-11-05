// import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// export function initLogoAnimation(container: HTMLElement): void {
//     console.log("Initializing logo animation...");
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     camera.position.z = 10;

//     const fontLoader = new FontLoader();
//     fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
//         console.log("Font loaded successfully for logo");

//         // Создаем геометрии для скобок и текста
//         const leftBracketGeometry = new TextGeometry('{', {
//             font: font,
//             size: 1.5,
//             depth: 0.2,
//         });
//         const rightBracketGeometry = new TextGeometry('}', {
//             font: font,
//             size: 1.5,
//             depth: 0.2,
//         });
//         const textGeometry = new TextGeometry('DexStudioApp', {
//             font: font,
//             size: 1.2,
//             depth: 0.1,
//         });

//         // Настройки материала
//         const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });

//         // Создаем меши для логотипа
//         const leftBracketMesh = new THREE.Mesh(leftBracketGeometry, material);
//         const rightBracketMesh = new THREE.Mesh(rightBracketGeometry, material);
//         const textMesh = new THREE.Mesh(textGeometry, material);

//         // Позиционируем элементы логотипа
//         leftBracketMesh.position.set(-3, 0, 0);
//         rightBracketMesh.position.set(3, 0, 0);
//         textMesh.position.set(-1.6, 0, 0); // Центрируем текст между скобками

//         // Добавляем элементы на сцену
//         scene.add(leftBracketMesh);
//         scene.add(rightBracketMesh);
//         scene.add(textMesh);
//         console.log("Logo components added to the scene");

//         let animationProgress = 0;
//         const targetPositionLeft = -5;
//         const targetPositionRight = 5;

//         function animateLogo() {
//             requestAnimationFrame(animateLogo);

//             // Анимация раздвигания скобок и появления текста
//             if (animationProgress < 1) {
//                 animationProgress += 0.02;

//                 // Раздвигаем скобки
//                 leftBracketMesh.position.x = THREE.MathUtils.lerp(-3, targetPositionLeft, animationProgress);
//                 rightBracketMesh.position.x = THREE.MathUtils.lerp(3, targetPositionRight, animationProgress);

//                 // Плавно увеличиваем прозрачность текста
//                 if (animationProgress >= 0.5) {
//                     textMesh.visible = true;
//                     (textMesh.material as THREE.MeshBasicMaterial).opacity = (animationProgress - 0.5) * 2;
//                     console.log(`Text opacity: ${(textMesh.material as THREE.MeshBasicMaterial).opacity}`);
//                 }
//             }

//             renderer.render(scene, camera);
//         }

//         // Задержка перед началом анимации
//         setTimeout(() => {
//             console.log("Starting logo animation after delay");
//             animateLogo();
//         }, 1000);
//     });

//     window.addEventListener('resize', () => {
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         console.log("Window resized and renderer updated");
//     });
// }
