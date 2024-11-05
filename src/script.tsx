import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom/client';
import FluidAnimationComponent from './FluidAnimationComponent';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scenes: THREE.Scene[] = [];
let currentSceneIndex = 0;
let fluidRoot: ReactDOM.Root | null = null;
let animationPlayed = false; // Флаг для контроля отображения анимации на Home
let textElement: HTMLDivElement ;

function init(): void {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container')?.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Создаем сцены для Home, About и Contact
    scenes[0] = createScene('Home', 0x000000, true); // Home с анимацией
    scenes[1] = createScene('About', 0xe74c3c);
    scenes[2] = createScene('Contact', 0x2ecc71);

    // scenes[0].add(camera);

    animate();

    window.addEventListener('wheel', handleScroll);
    if (currentSceneIndex === 0) {
        // Добавляем кнопку для смены цвета текста только на Home
    }
}

// Функция создания сцены
function createScene(text: string, color: number, isHome: boolean = false): THREE.Scene {
    if (isHome) {
        addToggleTextColorButton(isHome);
    }
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(color);

    // Отображаем анимацию только один раз на Home
    if (isHome && !animationPlayed) {
        const container = document.getElementById('canvas-container');
        if (container && !fluidRoot) {
            const animationContainer = document.createElement('div');
            animationContainer.style.position = 'absolute';
            animationContainer.style.top = '0';
            animationContainer.style.left = '0';
            animationContainer.style.width = '100%';
            animationContainer.style.height = '100%';
            animationContainer.style.zIndex = '1';
            container.appendChild(animationContainer);

            fluidRoot = ReactDOM.createRoot(animationContainer);
            fluidRoot.render(<FluidAnimationComponent />);
            animationPlayed = true; // Отмечаем, что анимация уже показана

            // Добавляем текст на Home
            addGlassyTextLogo();
            
        }
    }

    return newScene;
}

// Функция для добавления текста
function addGlassyTextLogo(): void {
    const container = document.getElementById('canvas-container');
    if (container) {
        textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.top = '50%';
        textElement.style.left = '50%';
        textElement.style.transform = 'translate(-50%, -50%)';
        textElement.style.color = 'rgba(0, 0, 0, 1)';
        textElement.style.fontSize = '6rem';
        textElement.style.fontFamily = 'Orbitron, sans-serif'; // Стильный и современный шрифт
        textElement.style.zIndex = '2'; // Поверх анимации
        textElement.style.pointerEvents = 'none';
        textElement.style.opacity = '0';
        textElement.style.transition = 'opacity 2s ease'; // Плавное появление
        textElement.textContent = 'DEXSTUDIOAPP';
        container.appendChild(textElement);

        // Плавное появление текста
        setTimeout(() => {
            textElement.style.opacity = '1';
        }, 500);
    }
}

// Функция для добавления кнопки переключения цвета текста
function addToggleTextColorButton(isHome: boolean): void {
    const container = document.getElementById('canvas-container');
    if (container && currentSceneIndex === 0) {
        const button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.width = '30px';
        button.style.height = '30px';
        button.style.borderRadius = '50%';
        button.style.border = 'none';
        button.style.backgroundColor = 'transparent';
        button.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 24 24'%3E%3Cpath d='M 12 0 C 11.4 0 11 0.4 11 1 L 11 2 C 11 2.6 11.4 3 12 3 C 12.6 3 13 2.6 13 2 L 13 1 C 13 0.4 12.6 0 12 0 z M 4.1992188 3.1992188 C 3.9492188 3.1992187 3.7 3.3 3.5 3.5 C 3.1 3.9 3.1 4.5003906 3.5 4.9003906 L 4.1992188 5.5996094 C 4.5992187 5.9996094 5.1996094 5.9996094 5.5996094 5.5996094 C 5.9996094 5.1996094 5.9996094 4.5992188 5.5996094 4.1992188 L 4.9003906 3.5 C 4.7003906 3.3 4.4492188 3.1992188 4.1992188 3.1992188 z M 19.800781 3.1992188 C 19.550781 3.1992188 19.299609 3.3 19.099609 3.5 L 18.400391 4.1992188 C 18.000391 4.5992187 18.000391 5.1996094 18.400391 5.5996094 C 18.800391 5.9996094 19.400781 5.9996094 19.800781 5.5996094 L 20.5 4.9003906 C 20.9 4.5003906 20.9 3.9 20.5 3.5 C 20.3 3.3 20.050781 3.1992188 19.800781 3.1992188 z M 12 5 A 7 7 0 0 0 5 12 A 7 7 0 0 0 12 19 A 7 7 0 0 0 19 12 A 7 7 0 0 0 12 5 z M 1 11 C 0.4 11 0 11.4 0 12 C 0 12.6 0.4 13 1 13 L 2 13 C 2.6 13 3 12.6 3 12 C 3 11.4 2.6 11 2 11 L 1 11 z M 22 11 C 21.4 11 21 11.4 21 12 C 21 12.6 21.4 13 22 13 L 23 13 C 23.6 13 24 12.6 24 12 C 24 11.4 23.6 11 23 11 L 22 11 z M 4.9003906 18.099609 C 4.6503906 18.099609 4.3992188 18.200391 4.1992188 18.400391 L 3.5 19.099609 C 3.1 19.499609 3.1 20.1 3.5 20.5 C 3.9 20.9 4.5003906 20.9 4.9003906 20.5 L 5.5996094 19.800781 C 5.9996094 19.400781 5.9996094 18.800391 5.5996094 18.400391 C 5.3996094 18.200391 5.1503906 18.099609 4.9003906 18.099609 z M 19.099609 18.099609 C 18.849609 18.099609 18.600391 18.200391 18.400391 18.400391 C 18.000391 18.800391 18.000391 19.400781 18.400391 19.800781 L 19.099609 20.5 C 19.499609 20.9 20.1 20.9 20.5 20.5 C 20.9 20.1 20.9 19.499609 20.5 19.099609 L 19.800781 18.400391 C 19.600781 18.200391 19.349609 18.099609 19.099609 18.099609 z M 12 21 C 11.4 21 11 21.4 11 22 L 11 23 C 11 23.6 11.4 24 12 24 C 12.6 24 13 23.6 13 23 L 13 22 C 13 21.4 12.6 21 12 21 z'%3E%3C/path%3E%3C/svg%3E")`;
        button.style.cursor = 'pointer';
        button.style.zIndex = '3'; // Поверх текста и анимации
        button.title = 'Toggle Text Color';
        container.appendChild(button);

        button.addEventListener('click', () => {
            if (textElement) {
                textElement.style.color = getComputedStyle(textElement).color === 'rgb(0, 0, 0)' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
            }
        });
    }
}

// Основной цикл анимации
function animate(): void {
    requestAnimationFrame(animate);
    renderer.render(scenes[currentSceneIndex], camera);
}

// Обработка событий прокрутки для перехода между сценами
function handleScroll(event: WheelEvent): void {
    const previousSceneIndex = currentSceneIndex;

    // Пропускаем Home после показа анимации
    if (animationPlayed && currentSceneIndex === 0 && event.deltaY > 0) {
        currentSceneIndex = 1; // Переход на About
    } else if (event.deltaY > 0 && currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
    } else if (event.deltaY < 0 && currentSceneIndex > 1) {
        currentSceneIndex--;
    }

    // Только переключаем сцену, если индекс изменился
    if (previousSceneIndex !== currentSceneIndex) {
        if (previousSceneIndex === 0 && fluidRoot) {
            fluidRoot.unmount();
            fluidRoot = null;
        }
        if (textElement) {
            textElement.remove();
        }
        renderer.render(scenes[currentSceneIndex], camera);
    }
}

// Обновление размеров при изменении окна
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
