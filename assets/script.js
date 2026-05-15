/* =========================================================
   Minimal, dependency-free JS
   - Mobile nav toggle
   - Scroll-triggered reveals (IntersectionObserver)
   - Year auto-update in footer
   ========================================================= */
(function () {
  'use strict';

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.setAttribute('data-open', String(!open));
    });
    // Close on link click (mobile)
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 720px)').matches) {
          toggle.setAttribute('aria-expanded', 'false');
          links.setAttribute('data-open', 'false');
        }
      });
    });
  }

  // ---- Scroll reveals ----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
  }

  // ---- Footer year ----
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
