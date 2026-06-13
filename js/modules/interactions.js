/* ---- Mouse-following ambient orbs ---- */
function initOrbTracking() {
    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length) return;

    orbs.forEach(orb => {
        const track = document.createElement('div');
        track.className = 'orb-track';
        orb.parentNode.insertBefore(track, orb);
        track.appendChild(orb);
    });

    const tracks = document.querySelectorAll('.orb-track');
    let mouseX = 0.5, mouseY = 0.5;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    function tick() {
        tracks.forEach((track, i) => {
            const speed = 12 + i * 6;
            track.style.transform = `translate(${(mouseX - 0.5) * speed}px, ${(mouseY - 0.5) * speed}px)`;
        });
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

/* ---- 3D tilt on interest cards ---- */
function initCardTilt() {
    const cards = document.querySelectorAll('.interest-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ---- Copy email with toast ---- */
function initCopyEmail() {
    const emailLink = document.querySelector('.contact-links a[href^="mailto:"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard!');
        } catch {
            showToast('Could not copy email');
        }
    });
}

/* ---- Toast notification ---- */
function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/* ---- Scroll progress bar ---- */
function initScrollProgress() {
    let bar = document.getElementById('scrollProgress');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scrollProgress';
        document.body.appendChild(bar);
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
    }, { passive: true });
}

export function initInteractions() {
    initOrbTracking();
    initCardTilt();
    initCopyEmail();
    initScrollProgress();
}
