const LIGHTBOX_CLOSE_DELAY_MS = 300;

function closeLightbox(lightbox) {
    lightbox.classList.remove('open');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, LIGHTBOX_CLOSE_DELAY_MS);
    document.body.style.overflow = '';
}

export function initLightbox() {
    const interestThumbnails = document.querySelectorAll('.interest-thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    if (!lightbox || !lightboxContent || !lightboxCaption || !closeBtn) return;

    interestThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            lightbox.classList.add('open');
            lightbox.style.display = 'block';
            lightboxContent.src = this.src;
            lightboxCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => closeLightbox(lightbox));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
}
