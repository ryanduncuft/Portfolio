// app.js

import { initNavbar } from './navbar.js';
import { initFooter } from './footer.js';

// --- Utility Functions ---

/**
 * Loads an HTML component from a file and injects it into a container.
 */
async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Container with ID '${containerId}' not found.`);
        }
    } catch (error) {
        console.error(`Error loading component from ${filePath}:`, error);
    }
}

/**
 * Initializes and manages the pre-loader animation.
 */
function initLoader() {
    const loader = document.querySelector(".loader");
    const loaderText = document.querySelector(".loader-text");
    const loaderProgress = document.querySelector(".loader-progress");
    
    // Check if GSAP is available before running animations
    if (!window.gsap) {
        console.warn("GSAP not loaded. Skipping loader animation.");
        if (loader) loader.style.display = "none";
        initAnimations();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const loaderTimeline = gsap.timeline({
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    loader.style.display = "none";
                    initAnimations();
                },
            });
        },
    });

    loaderTimeline
        .to(loaderText, { opacity: 1, duration: 0.7, ease: "power2.inOut" })
        .to(loaderProgress, { width: "100%", duration: 1.5, ease: "power2.inOut" }, "<")
        .to(loaderText, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ">-0.3");
}

/**
 * Defines all GSAP animations for different sections of the page using ScrollTrigger.
 */
function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        console.warn("GSAP or ScrollTrigger not loaded. Skipping section animations.");
        return;
    }

    const heroElements = [
        document.querySelector(".hero-title"),
        document.querySelector(".hero-subtitle"),
        document.querySelector(".hero-description"),
        document.querySelector(".cta-button"),
    ];
    const heroImage = document.querySelector(".hero-img-animated");
    const sectionTitles = document.querySelectorAll(".section-title");
    const aboutContent = document.querySelector(".about-section .space-y-6");
    const experienceItems = document.querySelectorAll("#experience .bg-zinc-800");
    const skillCategories = document.querySelectorAll(".skill-category");
    const projectCards = document.querySelectorAll(".project-card, .view-all-projects-card");
    const contactItems = document.querySelectorAll(".contact-item");

    // Hero Section Entrance Animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from(heroElements, { opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: "power3.out" }, "start")
        .from(heroImage, { opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" }, "start+=0.5");

    // General animation function for sections
    const animateFromBottom = (elements, trigger, start = "top 80%", stagger = 0.2) => {
        if (!elements || elements.length === 0) return;
        gsap.from(elements, {
            opacity: 0,
            y: 50,
            stagger: stagger,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: trigger,
                start: start,
                toggleActions: "play none none reverse",
            },
        });
    };

    // Animate section titles
    animateFromBottom(sectionTitles, "main", "top 85%", 0);

    // Animate other sections
    animateFromBottom(aboutContent, ".about-section");
    animateFromBottom(experienceItems, "#experience");
    animateFromBottom(skillCategories, ".skills-grid");
    animateFromBottom(projectCards, ".projects-grid");
    animateFromBottom(contactItems, ".contact-details");
}

/**
 * Main initialization function.
 */
async function initializePortfolio() {
    await Promise.all([
        loadComponent('navbar-container', 'components/navbar.html'),
        loadComponent('footer-container', 'components/footer.html')
    ]);

    // Now that components are in the DOM, safely initialize
    // their functionality and run the loader animation.
    initNavbar();
    initFooter();
    initLoader();
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initializePortfolio();
});