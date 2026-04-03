// js/footer.js

/**
 * This module handles all JavaScript functionality related to the footer.
 */

/**
 * Initializes all footer-related functionality and animations.
 */
export function initFooter() {
    console.log("Footer script initialized.");

    // Select the footer element after the HTML has been loaded.
    const footerElement = document.getElementById('main-footer');
    if (footerElement && window.gsap && window.ScrollTrigger) {
        window.gsap.from(footerElement, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: footerElement,
                start: "top 95%",
                toggleActions: "play none none reverse",
            },
        });
    }

    // Dynamically set the current year in the footer.
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}