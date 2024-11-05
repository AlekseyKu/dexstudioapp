// export function addGlassyTextLogo(container: HTMLElement, isHome: boolean): void {
//     if (!isHome) return;

//     const textElement = document.createElement('div');
//     textElement.style.position = 'absolute';
//     textElement.style.top = '50%';
//     textElement.style.left = '50%';
//     textElement.style.transform = 'translate(-50%, -50%)';
//     textElement.style.color = 'rgba(0, 0, 0, 1)'; // Черный текст
//     textElement.style.fontSize = '6rem';
//     textElement.style.fontFamily = 'Orbitron, sans-serif'; // Стильный и современный шрифт
//     textElement.style.zIndex = '2'; // Поверх анимации
//     textElement.style.pointerEvents = 'none';
//     textElement.style.opacity = '0';
//     textElement.style.transition = 'opacity 2s ease'; // Плавное появление
//     textElement.textContent = 'DEXSTUDIOAPP';
//     container.appendChild(textElement);

//     // Плавное появление текста
//     setTimeout(() => {
//         textElement.style.opacity = '1';
//     }, 500);
// } 
