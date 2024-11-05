// src/scenes/HomeScene.ts
import * as THREE from 'three';
import React from 'react'; // Импорт React
import ReactDOM from 'react-dom/client';
import FluidAnimationComponent from '../components/FluidAnimationComponent';
import { addTextLogo, addToggleTextColorButton } from '../utils/helpers';

export class HomeScene {
    scene: THREE.Scene;
    fluidRoot: ReactDOM.Root | null = null;
    animationPlayed: boolean = false;
    textElement: HTMLElement | null = null; // Добавляем ссылку на текстовый элемент
    buttonElement: HTMLElement | null = null; // Добавляем ссылку на кнопку

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    }

    init(container: HTMLElement, isHome: boolean = false): void {
        if (!this.animationPlayed && container && isHome) {
            // Добавляем анимацию
            const animationContainer = document.createElement('div');
            animationContainer.style.position = 'absolute';
            animationContainer.style.top = '0';
            animationContainer.style.left = '0';
            animationContainer.style.width = '100%';
            animationContainer.style.height = '100%';
            animationContainer.style.zIndex = '1';
            container.appendChild(animationContainer);

            this.fluidRoot = ReactDOM.createRoot(animationContainer);
            this.fluidRoot.render(React.createElement(FluidAnimationComponent as React.ComponentType));
            this.animationPlayed = true;

            // Добавляем текст и кнопку только на Home
            this.textElement = addTextLogo(container);
            if (this.textElement) {
                this.buttonElement = addToggleTextColorButton(container, this.textElement);
            }

            // this.textElement = addTextSlogan(container);
        }
    }

    dispose(): void {
        if (this.fluidRoot) {
            this.fluidRoot.unmount();
            this.fluidRoot = null;
        }
        
        // Удаляем текст и кнопку при уходе со страницы Home
        if (this.textElement) {
            this.textElement.remove();
            this.textElement = null;
        }
        
        if (this.buttonElement) {
            this.buttonElement.remove();
            this.buttonElement = null;
        }
    }
}