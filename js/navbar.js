// js/navbar.js

/**
 * This module handles all JavaScript functionality related to the navbar.
 */

const body = document.body;
let themeToggle;
let menuToggle;
let mobileMenu;
let navElement;

/**
 * Updates the visibility of the sun and moon icons based on the current theme.
 * @param {string} theme The current theme ('light' or 'dark').
 */
function updateThemeIcons(theme) {
    const moonIcon = themeToggle.querySelector(".moon");
    const sunIcon = themeToggle.querySelector(".sun");
    if (moonIcon && sunIcon) {
        if (theme === "dark") {
            moonIcon.classList.remove("hidden");
            sunIcon.classList.add("hidden");
        } else {
            moonIcon.classList.add("hidden");
            sunIcon.classList.remove("hidden");
        }
    }
}

/**
 * Sets up the theme toggle functionality.
 */
function setupThemeToggle() {
    themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) {
        console.warn("Theme toggle button not found.");
        return;
    }

    const currentTheme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", currentTheme);
    updateThemeIcons(currentTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcons(newTheme);

        if (window.gsap) {
            window.gsap.fromTo(themeToggle, { scale: 1 }, { scale: 0.9, yoyo: true, repeat: 1, duration: 0.3, ease: "power2.inOut" });
        }
    });
}

/**
 * Sets up the mobile menu functionality.
 */
function setupMobileMenu() {
    menuToggle = document.getElementById("menuToggle");
    mobileMenu = document.getElementById("mobileMenu");
    if (!menuToggle || !mobileMenu) {
        console.warn("Mobile menu elements not found.");
        return;
    }

    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        
        // Use Tailwind's translate classes for animation.
        mobileMenu.classList.toggle("-translate-y-full");
        
        body.style.overflow = isExpanded ? "" : "hidden";
        
        // Animate the mobile menu's links
        if (window.gsap) {
            const links = mobileMenu.querySelectorAll("a");
            if (!isExpanded) {
                window.gsap.fromTo(links,
                    { opacity: 0, translateY: 20 },
                    { opacity: 1, translateY: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }
                );
            }
        }
    };

    menuToggle.addEventListener("click", toggleMenu);

    mobileMenu.addEventListener("click", (event) => {
        if (event.target.tagName === 'A') {
            toggleMenu();
        }
    });
}

/**
 * Initializes all navbar-related functionality and animations.
 */
export function initNavbar() {
    navElement = document.getElementById('main-nav');
    if (navElement && window.gsap) {
        window.gsap.fromTo(navElement,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );
    }
    setupThemeToggle();
    setupMobileMenu();
}