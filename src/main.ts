import { initHome } from './home';
import { initAbout } from './about';
import { initContact } from './contact';

const container = document.getElementById('canvas-container');

function showPage(page: string) {
    if (!container) return;

    container.innerHTML = ''; // Очистка контейнера
    switch (page) {
        case 'home':
            initHome(container);
            break;
        case 'about':
            initAbout(container);
            break;
        case 'contact':
            initContact(container);
            break;
        default:
            initHome(container);
    }
}

// Пример навигации (можно улучшить позже)
document.getElementById('nav-home')?.addEventListener('click', () => showPage('home'));
document.getElementById('nav-about')?.addEventListener('click', () => showPage('about'));
document.getElementById('nav-contact')?.addEventListener('click', () => showPage('contact'));

// Загрузка по умолчанию страницы Home
showPage('home');
