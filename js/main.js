import { siteContent } from './content.js';
import { renderPage } from './render.js';
import { initScrollEffects } from './modules/scroll-effects.js';
import { initAccordion } from './modules/accordion.js';
import { initLightbox } from './modules/lightbox.js';
import { initNavigation } from './modules/navigation.js';
import { initInteractions } from './modules/interactions.js';

document.addEventListener('DOMContentLoaded', () => {
    document.title = siteContent.meta.title;
    document.documentElement.lang = siteContent.meta.lang;

    renderPage();

    /* Theme toggle */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        html.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    initScrollEffects();
    initAccordion();
    initLightbox();
    initNavigation();
    initInteractions();
});
