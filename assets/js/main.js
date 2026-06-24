(() => {
  'use strict';

  /* ============================================================
     Portfolio MYM — Main JavaScript
     ============================================================ */

  /* --- Translations --- */
  const i18n = {
    fr: {
      about: 'À propos', projects: 'Projets', stack: 'Stack', contact: 'Contact', writeups: 'Writeups',
      slogan: '"Break the system to understand it, to build the ones that are solid"',
      present: 'Étudiant en cybersécurité embarquée, Web et réseaux.',
      certIntro: 'Mes certifications en cybersécurité et réseaux.',
      stackIntro: 'Outils, langages et frameworks avec lesquels je travaille au quotidien.',
      contactIntro: 'Vous avez un projet en tête ou souhaitez collaborer ? N\'hésitez pas.',
      successAlert: 'Email copié dans le presse-papiers !',
    },
    en: {
      about: 'About', projects: 'Projects', stack: 'Stack', contact: 'Contact', writeups: 'Writeups',
      slogan: '"Break the system to understand it, to build the ones that are solid"',
      present: 'Student in embedded cybersecurity, Web and networks.',
      certIntro: 'My cybersecurity and networking certifications.',
      stackIntro: 'Tools, languages and frameworks I work with daily.',
      contactIntro: 'Got a project in mind or want to collaborate? Feel free to reach out.',
      successAlert: 'Email copied to clipboard!',
    }
  };

  let currentLang = localStorage.getItem('mym-lang') || 'fr';
  let currentTheme = localStorage.getItem('mym-theme') || 'dark';

  /* Utility */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  /* --- Theme --- */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mym-theme', theme);
    currentTheme = theme;
    // Update theme button options
    $$('.theme-opt').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
  }

  /* --- Language --- */
  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('mym-lang', lang);
    applyTranslations();
  }

  function applyTranslations() {
    // Update all elements with data-fr / data-en attributes
    $$('[data-fr][data-en]').forEach(el => {
      el.textContent = el.dataset[currentLang] || el.textContent;
    });
    // Update lang toggle button text
    const langBtn = $('#langToggle');
    if (langBtn) langBtn.querySelector('.lang-current').textContent = currentLang.toUpperCase();
    // Update html lang attribute
    document.documentElement.lang = currentLang === 'fr' ? 'fr' : 'en';
  }

  /* --- Theme Dropdown --- */
  function setupThemeDropdown() {
    const themeBtn = $('#themeToggleBtn');
    const dropdown = $('#themeDropdown');
    if (!themeBtn || !dropdown) return;

    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });

    $$('.theme-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
        dropdown.classList.remove('open');
      });
    });
  }

  /* --- Language Toggle --- */
  function setupLangToggle() {
    const langBtn = $('#langToggle');
    if (!langBtn) return;
    langBtn.addEventListener('click', () => {
      setLang(currentLang === 'fr' ? 'en' : 'fr');
    });
  }

  /* --- Mobile Menu --- */
  function setupMobileMenu() {
    const menuBtn = $('#menuToggle');
    const nav = $('.main-nav');
    if (!menuBtn || !nav) return;
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // Close menu on nav link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Reveal on Scroll --- */
  function observeReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.reveal').forEach(el => obs.observe(el));
  }

  /* --- Smooth scroll for anchor links --- */
  function setupSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          const t = $(href);
          if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* --- Contact Email Copy --- */
  function setupContact() {
    const emailLink = $('#email-link');
    if (emailLink) {
      emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const em = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(em).then(() => {
          alert(i18n[currentLang].successAlert);
        });
      });
    }
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', () => {
    setTheme(currentTheme);
    applyTranslations();
    setupThemeDropdown();
    setupLangToggle();
    setupMobileMenu();
    observeReveal();
    setupSmoothScroll();
    setupContact();
  });
})();