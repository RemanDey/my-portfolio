import { siteContent } from './content.js';

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderHeader() {
    const { logo, navLinks } = siteContent.header;

    const navItemsHtml = navLinks.map(({ href, label, icon, active }) => `
                <li><a href="${href}"${active ? ' class="active"' : ''}><i class="${icon}"></i> ${label}</a></li>`).join('');

    return `
    <header>
        <nav>
            <a href="#" class="logo">${logo}</a>
            <ul class="nav-links" id="site-nav">${navItemsHtml}
            </ul>
            <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme">
                <i class="fas fa-moon"></i>
                <i class="fas fa-sun"></i>
            </button>
            <button class="burger" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </button>
        </nav>
    </header>
    <div class="nav-overlay" id="navOverlay" aria-hidden="true"></div>`;
}

function renderHero() {
    const { heading, tagline, cta } = siteContent.hero;

    return `
    <section id="hero" class="fade-in-section">
        <div class="hero-content">
            <h1 class="typewriter">${heading}</h1>
            <p>${tagline}</p>
            <a href="${cta.href}" class="btn primary-btn"><i class="${cta.icon}"></i> ${cta.label}</a>
        </div>
    </section>`;
}

function renderAbout() {
    const { title, profileImage, introParagraphs, accordions, skills } = siteContent.about;

    const introHtml = introParagraphs.map(text => `<p>${text}</p>`).join('\n            ');

    const accordionsHtml = accordions.map(({ title: accordionTitle, content }) => `
            <div class="accordion-item">
                <button class="accordion-header">
                    ${accordionTitle}
                </button>
                <div class="accordion-content">${content}
                </div>
            </div>`).join('');

    return `
    <section id="about" class="fade-in-section">
        <h2>${title}</h2>
        <div class="about-content">
            <img src="${profileImage.src}" alt="${profileImage.alt}" class="profile-pic" loading="lazy">
            ${introHtml}

            ${accordionsHtml}

            <div class="skills-section" id="skillsSection">
                <h3>Skills</h3>
                <div class="skills-grid">
                    ${skills.map(s => `
                    <div class="skill-item">
                        <div class="skill-info">
                            <span class="skill-name">${s.name}</span>
                            <span class="skill-level">${s.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-fill" style="--skill-level: ${s.level}%"></div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>

        </div>
    </section>`;
}

function renderInterests() {
    const { title, items } = siteContent.interests;
    const shuffledItems = shuffleArray(items);

    const cardsHtml = shuffledItems.map(({ image, alt, title: cardTitle, description }) => `
            <div class="interest-card">
                <img src="${image}" alt="${alt}" class="interest-thumbnail" loading="lazy" decoding="async">
                <div class="interest-card-content">
                    <h3>${cardTitle}</h3>
                    <p>${description}</p>
                </div>
            </div>`).join('');

    return `
    <section id="interests" class="fade-in-section">
        <h2>${title}</h2>
        <div class="interests-grid">${cardsHtml}


        </div>
    </section>`;
}

function renderContact() {
    const { title, description, links } = siteContent.contact;

    const linksHtml = links.map(({ href, label, icon, target }) => {
        const targetAttr = target ? ` target="${target}"` : '';
        return `
            <a href="${href}"${targetAttr} class="btn primary-btn"><i class="${icon}"></i> ${label}</a>`;
    }).join('');

    return `
    <section id="contact" class="fade-in-section">
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="contact-links">${linksHtml}
        </div>
    </section>`;
}

function renderFooter() {
    return `
    <footer>
        <p>${siteContent.footer.copyright}</p>
    </footer>`;
}

function renderOverlays() {
    return `
    <button id="backToTopBtn" title="Go to top"><i class="fas fa-arrow-up"></i></button>

    <div id="lightbox" class="lightbox">
        <span class="close-btn">&times;</span>
        <img class="lightbox-content" id="lightbox-content" src="">
        <div id="lightbox-caption" class="lightbox-caption"></div>
    </div>`;
}

export function renderPage() {
    const main = document.getElementById('app');
    if (!main) return;

    main.innerHTML = [
        renderHeader(),
        renderHero(),
        renderAbout(),
        renderInterests(),
        renderContact(),
        renderFooter(),
        renderOverlays(),
    ].join('\n');
}
