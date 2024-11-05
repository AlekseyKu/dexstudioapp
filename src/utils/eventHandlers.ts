// src/utils/eventHandlers.ts
import { HomeScene } from '../scenes/HomeScene';
import { AboutScene } from '../scenes/AboutScene';
import { ContactScene } from '../scenes/ContactScene';
import * as THREE from 'three';

export function handleScroll(
    event: WheelEvent,
    scenes: { home: HomeScene; about: AboutScene; contact: ContactScene },
    currentSceneIndex: number,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera
): number {
    let newSceneIndex = currentSceneIndex;

    if (event.deltaY > 0 && currentSceneIndex < 2) {
        newSceneIndex++;
    } else if (event.deltaY < 0 && currentSceneIndex > 1) { // Не допускаем возврат на сцену Home
        newSceneIndex--;
    }

    if (newSceneIndex !== currentSceneIndex) {
        // Удаляем элементы текущей сцены
        if (currentSceneIndex === 0) {
            scenes.home.dispose();
        }

        switch (newSceneIndex) {
            case 0:
                // Блокируем возврат на Home
                break;
            case 1:
                renderer.render(scenes.about.scene, camera);
                break;
            case 2:
                renderer.render(scenes.contact.scene, camera);
                break;
        }
    }

    return newSceneIndex;
}
