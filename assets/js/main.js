/**
 * Main JavaScript — Vercel-style Portfolio
 * Zero dependencies, vanilla JS only.
 */

(function () {
  'use strict';

  /* ============================================================
     Mobile Navigation
     ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav');

  // Create mobile nav dynamically
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-hidden', 'true');

  if (mainNav) {
    const links = mainNav.querySelectorAll('a');
    links.forEach(link => {
      const clone = link.cloneNode(true);
      clone.addEventListener('click', () => closeMobileMenu());
      mobileNav.appendChild(clone);
    });
    document.body.appendChild(mobileNav);
  }

  function openMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  // Close mobile menu on resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ============================================================
     Scroll Reveal (Intersection Observer)
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay;
            if (delay) {
              setTimeout(() => {
                entry.target.classList.add('is-visible');
              }, parseInt(delay));
            } else {
              entry.target.classList.add('is-visible');
            }
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     Header Scroll Effect
     ============================================================ */
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;

    // Add background opacity on scroll
    if (header) {
      if (currentScroll > 50) {
        header.style.background = 'rgba(0,0,0,0.85)';
      } else {
        header.style.background = 'rgba(0,0,0,0.6)';
      }
    }

    lastScroll = currentScroll;
  }

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ============================================================
     Smooth Scroll for Anchor Links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 64;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ============================================================
     Back to Top
     ============================================================ */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     Active Nav Link on Scroll
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight : 64) + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ============================================================
     Dynamic Year
     ============================================================ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================================
     Lang Toggle (FR / EN) — Placeholder for future i18n
     ============================================================ */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = langToggle.querySelector('.lang-current');
      const isFr = current.textContent === 'FR';
      current.textContent = isFr ? 'EN' : 'FR';

      // Update all elements with data-fr / data-en attributes
      document.querySelectorAll('[data-fr][data-en]').forEach((el) => {
        el.textContent = isFr ? el.dataset.en : el.dataset.fr;
      });
    });
  }

  /* ============================================================
     Keyboard Accessibility — Escape to close mobile menu
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
})();
