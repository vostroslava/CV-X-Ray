// ===================================
// PARTICLE ANIMATION BACKGROUND
// ===================================
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: 0, y: 0 };

        this.init();
        this.createParticles();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= (dx / distance) * force * 2;
                particle.y -= (dy / distance) * force * 2;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 245, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('[data-scroll-animate]').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.mobileMenuBtn.classList.toggle('active');
                this.navLinks.classList.toggle('active');
            });

            // Close menu on link click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileMenuBtn.classList.remove('active');
                    this.navLinks.classList.remove('active');
                });
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// TYPING EFFECT
// ===================================
class TypingEffect {
    constructor(element, onComplete = null) {
        this.element = element;
        this.text = element.getAttribute('data-text') || element.textContent; // Use data-text if available
        this.element.textContent = '';
        this.charIndex = 0;
        this.typingSpeed = 50;
        this.onComplete = onComplete;

        this.type();
    }

    type() {
        if (this.charIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.type(), this.typingSpeed);
        } else {
            this.element.classList.add('typing-complete');
            if (this.onComplete) this.onComplete();
        }
    }
}

// ===================================
// DEMO TABS CONTROLLER
// ===================================
class DemoTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.demo-tab');
        this.panels = document.querySelectorAll('.demo-panel');

        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                // Remove active class from all tabs and panels
                this.tabs.forEach(t => t.classList.remove('active'));
                this.panels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.querySelector(`[data-panel="${target}"]`).classList.add('active');
            });
        });
    }
}

// ===================================
// FAQ ACCORDION
// ===================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');

        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                this.faqItems.forEach(faq => faq.classList.remove('active'));

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// ===================================
// FORM HANDLER
// ===================================
class FormHandler {
    constructor() {
        this.form = document.getElementById('upload-form');
        this.fileInput = document.getElementById('resume-file');
        this.fileLabel = document.querySelector('.file-label');
        this.successMessage = document.getElementById('success-message');

        this.init();
    }

    init() {
        if (!this.form) return;

        // File input visual feedback
        this.fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const fileText = this.fileLabel.querySelector('.file-text');
                fileText.textContent = `Выбран файл: ${fileName}`;
                this.fileLabel.style.borderColor = 'var(--accent-cyan)';
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Get form data
        const formData = new FormData(this.form);

        // Simulate API call
        this.showLoading();

        setTimeout(() => {
            this.hideLoading();
            this.showSuccess();
        }, 2000);
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Обработка...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                <path d="M10 2C5.58172 2 2 5.58172 2 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }

    hideLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <span>Получить отчёт</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');

        // Scroll to success message
        setTimeout(() => {
            this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

// ===================================
// HERO VISUAL ANIMATION
// ===================================
class HeroAnimation {
    constructor() {
        this.resumeCard = document.querySelector('.resume-card');
        this.reportCard = document.querySelector('.report-card');

        this.init();
    }

    init() {
        if (!this.resumeCard || !this.reportCard) return;

        // Parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            const resumeX = (x - 0.5) * 20;
            const resumeY = (y - 0.5) * 20;
            const reportX = (x - 0.5) * -15;
            const reportY = (y - 0.5) * -15;

            this.resumeCard.style.transform = `translateY(-50%) translate(${resumeX}px, ${resumeY}px)`;
            this.reportCard.style.transform = `translateY(-50%) translate(${reportX}px, ${reportY}px)`;
        });

        // Animate report tabs
        this.animateReportTabs();
    }

    animateReportTabs() {
        const tabs = document.querySelectorAll('.report-tab');
        if (tabs.length === 0) return;

        let currentIndex = 0;

        setInterval(() => {
            tabs.forEach(tab => tab.classList.remove('active'));
            currentIndex = (currentIndex + 1) % tabs.length;
            tabs[currentIndex].classList.add('active');
        }, 3000);
    }
}

// ===================================
// CARD TILT EFFECT
// ===================================
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.benefit-card, .audience-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ===================================
// PROGRESS COUNTER ANIMATION
// ===================================
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startValue = 0;
        this.startTime = null;
    }

    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const progress = (currentTime - this.startTime) / this.duration;

        if (progress < 1) {
            const current = Math.floor(this.startValue + (this.target - this.startValue) * this.easeOut(progress));
            this.element.textContent = current.toLocaleString();
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.element.textContent = this.target.toLocaleString();
        }
    }

    easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    start() {
        requestAnimationFrame((time) => this.animate(time));
    }
}

// ===================================
// STEPS SECTION ANIMATION
// ===================================
class StepsAnimation {
    constructor() {
        this.steps = document.querySelectorAll('.step');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        this.steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(step);
        });
    }
}

// ===================================
// CURSOR TRAIL EFFECT
// ===================================
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailDot(e.clientX, e.clientY);
        });
    }

    addTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(0, 245, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(dot);
        this.trail.push(dot);

        setTimeout(() => {
            dot.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            dot.remove();
        }, 500);

        if (this.trail.length > this.maxTrail) {
            const old = this.trail.shift();
            old.remove();
        }
    }
}

// ===================================
// GRADIENT ANIMATION
// ===================================
class GradientAnimation {
    constructor() {
        this.gradients = document.querySelectorAll('.gradient-text');
        this.init();
    }

    init() {
        this.gradients.forEach(el => {
            let angle = 0;

            setInterval(() => {
                angle = (angle + 1) % 360;
                const gradient = `linear-gradient(${angle}deg, #00f5ff 0%, #b045ff 100%)`;
                el.style.background = gradient;
                el.style.webkitBackgroundClip = 'text';
                el.style.backgroundClip = 'text';
            }, 50);
        });
    }
}

// ===================================
// PRICING CARD HOVER EFFECT
// ===================================
class PricingCardEffect {
    constructor() {
        this.cards = document.querySelectorAll('.pricing-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Dim other cards
                this.cards.forEach(c => {
                    if (c !== card) {
                        c.style.opacity = '0.6';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                // Restore all cards
                this.cards.forEach(c => {
                    c.style.opacity = '1';
                });
            });
        });
    }
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
class ButtonRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: translate(-50%, -50%);
                    animation: ripple-animation 0.6s ease-out;
                `;

                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation to stylesheet dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// MODAL CONTROLLER
// ===================================
class ModalController {
    constructor(triggerSelector, modalId) {
        this.modal = document.getElementById(modalId);
        this.trigger = document.querySelector(triggerSelector);
        this.closeBtn = this.modal?.querySelector('.modal-close');

        this.init();
    }

    init() {
        if (!this.modal) return;

        if (this.trigger) {
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===================================
// MOBILE STICKY CTA CONTROLLER
// ===================================
class MobileStickyCTA {
    constructor() {
        this.cta = document.getElementById('mobile-sticky-cta');
        this.lastScrollY = window.scrollY;
        this.ticking = false;

        if (this.cta) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.update();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    update() {
        const currentScrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight || 500;

        // Logic: Show if scrolled past hero AND (scrolling up OR at very bottom)
        // Hide if at very top or scrolling down

        // Simple version: Show after user scrolls past 300px
        if (currentScrollY > 300) {
            // Optional: Hide on scroll down, show on scroll up
            if (currentScrollY > this.lastScrollY && currentScrollY < (document.body.scrollHeight - window.innerHeight - 100)) {
                // Scrolling down & not at bottom -> hide
                this.cta.classList.remove('visible');
            } else {
                // Scrolling up -> show
                this.cta.classList.add('visible');
            }
        } else {
            // At top -> hide
            this.cta.classList.remove('visible');
        }

        this.lastScrollY = currentScrollY;
    }
}

// ===================================
// INITIALIZE ALL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    new ParticleBackground();
    new ScrollAnimations();
    new NavbarController();

    // Interactive components
    new DemoTabs();
    new FAQAccordion();
    new FormHandler();

    // Visual effects
    new HeroAnimation();
    new CardTilt();
    new StepsAnimation();

    new ButtonRipple();
    new GradientAnimation();

    // Initialize Modals
    new ModalController('a[href="privacy-policy.html"]', 'privacy-modal');
    new ModalController('#contacts-trigger', 'contacts-modal');
    new ModalController('#contacts-trigger', 'contacts-modal');
    new ModalController('#about-trigger', 'about-modal');

    // Mobile Sticky CTA
    new MobileStickyCTA();

    // Typing effect: Chain Title -> Subtext
    const titleElement = document.querySelector('.hero-title .typing-effect');
    const subtextElement = document.querySelector('.hero-description.typing-effect');

    if (titleElement) {
        // Start Title (with small initial delay)
        setTimeout(() => {
            new TypingEffect(titleElement, () => {
                // When Title finishes, start Subtext
                if (subtextElement) {
                    new TypingEffect(subtextElement);
                }
            });
        }, 500);
    } else if (subtextElement) {
        // Fallback if no title
        new TypingEffect(subtextElement);
    }

    // Optional cursor trail (comment out if too much)
    // new CursorTrail();

    console.log('🚀 ИИ Собеседование - Loaded!');
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.body.classList.add('reduced-motion');

    // Disable heavy animations
    const style = document.createElement('style');
    style.textContent = `
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Add smooth scrolling polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Console styling
console.log('%c🤖 ИИ Собеседование',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00f5ff, #b045ff); -webkit-background-clip: text; color: transparent;'
);
console.log('%cAI-Powered Resume Analysis Platform',
    'font-size: 14px; color: #00f5ff;'
);
