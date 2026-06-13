export function initScrollEffects() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* Active nav link tracking */
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-45% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => navObserver.observe(s));
    }

    /* Skills bar animation */
    const skillsSection = document.getElementById('skillsSection');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skills-visible');
                skillsObserver.unobserve(entry.target);
            }
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }

    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }

        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}
