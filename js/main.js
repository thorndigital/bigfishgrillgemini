/*
 * js/main.js
 * Modern JavaScript for Big Fish Grill Website
 *
 * Features:
 * 1. Mobile Navigation (Slide-in menu with accordion sub-menus)
 * 2. Smooth Scrolling for anchor links
 * 3. Scroll-Reveal Animations for content sections
 * 4. Hero Background Cycler Initialization
 * 5. Active Navigation Link Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Initializes the mobile navigation menu.
     */
    function initMobileNav() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navOverlay = document.querySelector('.mobile-nav-overlay');
        const navClose = document.querySelector('.mobile-nav-close');
        const body = document.body;

        if (!menuToggle || !navOverlay || !navClose) return;

        // Open navigation
        menuToggle.addEventListener('click', () => {
            navOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        });

        // Close navigation
        const closeNav = () => {
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        };

        navClose.addEventListener('click', closeNav);
        navOverlay.addEventListener('click', (e) => {
            if (e.target === navOverlay) {
                closeNav();
            }
        });

        // Accordion sub-menu logic
        const subMenuToggles = document.querySelectorAll('.mobile-nav-overlay .menu-item-has-children > a');
        subMenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parentItem = toggle.parentElement;
                parentItem.classList.toggle('active');
            });
        });
    }

    /**
     * Initializes smooth scrolling for on-page anchor links.
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href*="#"]');
        const header = document.querySelector('.site-header');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initializes scroll-reveal animations using Intersection Observer.
     */
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || '0';
                    entry.target.style.transitionDelay = `${delay}ms`;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Start animation a bit sooner
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    /**
     * Initializes the hero background image cycler.
     */
    function initHeroBackground() {
        const heroContainer = document.getElementById('bg-container');
        if (heroContainer) {
            new BackgroundCycler(heroContainer, {
                imageUrls: [
                    '/images/background/bg1.jpg',
                    '/images/background/bg2.jpg',
                    '/images/background/bg3.jpg',
                    '/images/background/bg5.jpg',
                    '/images/background/bg6.jpg',
                    '/images/background/bg7.jpg',
                    '/images/background/bg8.jpg'
                ],
                fadeSpeed: 1500,
                duration: 6000
            });
        }
    }

    /**
     * Updates the navigation to highlight the link for the current page.
     */
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            const parentLi = link.closest('.menu-item');
            if (!parentLi) return;

            if (linkPage === currentPage) {
                parentLi.classList.add('current-menu-item');
                const parentMenu = parentLi.closest('.menu-item-has-children');
                if (parentMenu) {
                    parentMenu.classList.add('current-menu-item');
                }
            } else {
                parentLi.classList.remove('current-menu-item');
            }
        });
    }


    // --- Initialize all features ---
    initMobileNav();
    initSmoothScroll();
    initScrollAnimations();
    initHeroBackground();
    updateActiveNav();
});
