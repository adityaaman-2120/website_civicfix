document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initRevealAnimations();
    initFilters();
    initSearch();
    initBackToTop();
    initNewsletter();
    initHeroParallax();
});

// NAVIGATION SCROLL EFFECT
function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it has revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// CATEGORY FILTERING
function initFilters() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.blog-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// LIVE SEARCH
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.blog-card');
    const featuredCard = document.querySelector('.featured-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();

            if (title.includes(term) || excerpt.includes(term)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    if (card.style.opacity === '0') card.style.display = 'none';
                }, 300);
            }
        });

        if (featuredCard) {
            const fTitle = featuredCard.querySelector('.featured-title').textContent.toLowerCase();
            if (fTitle.includes(term)) {
                featuredCard.style.opacity = '1';
                featuredCard.style.display = 'grid';
            } else {
                featuredCard.style.opacity = '0';
                setTimeout(() => {
                    if (featuredCard.style.opacity === '0') featuredCard.style.display = 'none';
                }, 300);
            }
        }
    });
}

// BACK TO TOP
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// HERO PARALLAX
function initHeroParallax() {
    const glows = document.querySelectorAll('.hero-glow');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glows.forEach((glow, index) => {
            const speed = (index + 1) * 20;
            glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// NEWSLETTER NOTIFICATION
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input.value) {
            input.value = '';
            alert('Welcome to the future of urban intelligence. Thank you for joining us!');
        }
    });
}