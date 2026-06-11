import { siteContent } from './content.js';
import { renderPage } from './render.js';
import { initScrollEffects } from './modules/scroll-effects.js';
import { initAccordion } from './modules/accordion.js';
import { initLightbox } from './modules/lightbox.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    document.title = siteContent.meta.title;
    document.documentElement.lang = siteContent.meta.lang;

    renderPage();

    initScrollEffects();
    initAccordion();
    initLightbox();
    initNavigation();
});
