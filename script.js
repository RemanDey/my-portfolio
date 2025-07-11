document.addEventListener('DOMContentLoaded', function() {

    // 1. Typewriter Effect for Hero H1
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        // The typing animation is controlled purely by CSS.
        // We only need to ensure the element exists.
    }


    // 2. Fade-in on Scroll Effect
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });


    // 4. Accordion Functionality for About Section
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
            } else {
                content.style.maxHeight = content.scrollHeight + 'px'; // Expand
            }
        });
    });


    // 5. Lightbox Functionality for Interests Images
    const interestThumbnails = document.querySelectorAll('.interest-thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    interestThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            lightbox.classList.add('open'); // Add 'open' class for CSS transition
            lightbox.style.display = 'block'; // Make sure it's block for transition to work
            lightboxContent.src = this.src;
            lightboxCaption.textContent = this.alt;
            // Prevent body scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
        // Give time for transition before hiding
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match this to your CSS transition duration
        document.body.style.overflow = ''; // Restore body scrolling
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300); // Match this to your CSS transition duration
            document.body.style.overflow = '';
        }
    });


    // 6. Mobile Navigation (Burger Menu)
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (burger && navLinks && navItems) { // Ensure elements exist
        burger.addEventListener('click', () => {
            // Toggle nav
            navLinks.classList.toggle('nav-active');

            // Animate links
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger animation
            burger.classList.toggle('toggle');
        });

        // Close nav when a link is clicked (for single-page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navItems.forEach(item => {
                    item.style.animation = ''; // Reset animation
                });
            });
        });
    }

});