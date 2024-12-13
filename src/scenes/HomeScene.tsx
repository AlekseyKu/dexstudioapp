// src/scenes/HomeScene.ts
import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom/client';
import FluidAnimationComponent from '../components/homeFluidAnimation';
import TextLogo from '../components/homeTextLogo';
import IconMouse from '../components/homeIconMouse';
import ButtonSwitch from '../components/homeButtonSwitch';

export class HomeScene {
    scene: THREE.Scene;
    mainRoot: ReactDOM.Root | null = null;
    animationPlayed: boolean = false;   
    currentColor: string = 'rgba(255, 255, 255, 0.8)';

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    }

    init(container: HTMLElement, isHome: boolean = false): void {
        if (!this.animationPlayed && container && isHome) {
            // Создаем контейнер для всего интерфейса
            const mainContainer = document.createElement('div');
            mainContainer.style.position = 'absolute';
            mainContainer.style.top = '0';
            mainContainer.style.left = '0';
            mainContainer.style.width = '100%';
            mainContainer.style.height = '100%';
            mainContainer.style.zIndex = '1';
            container.appendChild(mainContainer);

            this.mainRoot = ReactDOM.createRoot(mainContainer);
            this.renderUI();

            this.animationPlayed = true;
        }
    }

    private renderUI(): void {
        if (!this.mainRoot) return;

        // Здесь рендерим все компоненты
        this.mainRoot.render(
            <>
                {/* Анимация жидкости */}
                <FluidAnimationComponent />

                {/* Лого-текст */}
                <TextLogo color={this.currentColor} />

                {/* Кнопка переключения цвета */}
                <ButtonSwitch onColorToggle={(newColor: string) => {
                    this.updateComponentsColor(newColor);
                }} />

                {/* Индикатор мыши */}
                <IconMouse color={this.currentColor} />
            </>
        );
    }

    // Метод для обновления цвета всех компонентов
    updateComponentsColor(newColor: string): void {
        this.currentColor = newColor;
        this.renderUI();
    }

    dispose(): void {
        if (this.mainRoot) {
            this.mainRoot.unmount();
            this.mainRoot = null;
        }
    }
}
