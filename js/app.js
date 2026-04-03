// app.js - Modern portfolio logic with optimized loader and smooth UI behavior

const LOADER_MAX_DURATION_MS = 4500;

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initSmoothScrolling();
  setCurrentYear();
  initScrollAnimations();

  window.setTimeout(() => {
    hideLoader();
  }, LOADER_MAX_DURATION_MS);
});

function initLoader() {
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');

  if (!loader || !loaderProgress) return;

  requestAnimationFrame(() => {
    loaderProgress.style.width = '100%';
  });

  window.setTimeout(hideLoader, 1200);
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader || loader.classList.contains('hide')) return;

  loader.classList.add('hide');
  window.setTimeout(() => {
    loader.style.display = 'none';
  }, 320);
}

function initNavbar() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const scrollFn = () => {
    if (window.scrollY > 56) {
      nav.classList.add('navbar-scrolled');
    } else {
      nav.classList.remove('navbar-scrolled');
    }
  };

  scrollFn();
  window.addEventListener('scroll', scrollFn, { passive: true });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = Math.max(0, target.offsetTop - 70);

      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

function setCurrentYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('#currentYear').forEach((el) => {
    el.textContent = String(year);
  });
}

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-on-scroll').forEach((element) => {
    observer.observe(element);
  });
}
