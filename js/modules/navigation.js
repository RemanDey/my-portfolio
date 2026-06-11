function setMenuOpen(navLinks, burger, navOverlay, isOpen) {
    navLinks.classList.toggle('nav-active', isOpen);
    burger.classList.toggle('toggle', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));

    if (navOverlay) {
        navOverlay.classList.toggle('active', isOpen);
        navOverlay.setAttribute('aria-hidden', String(!isOpen));
    }

    document.body.classList.toggle('nav-open', isOpen);
}

export function initNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');

    if (!burger || !navLinks) return;

    const closeMenu = () => setMenuOpen(navLinks, burger, navOverlay, false);

    burger.addEventListener('click', () => {
        const isOpen = !navLinks.classList.contains('nav-active');
        setMenuOpen(navLinks, burger, navOverlay, isOpen);
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}
