(() => {
  'use strict';

  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  const writeupsData = [
    { id: 1, title: 'SQL Injection — PortSwigger Lab', category: 'web', platform: 'PortSwigger', date: '2026-01-15', difficulty: 'Intermédiaire', fr: 'Exploitation d\'une faille SQL injection pour extraire des données de la base.', en: 'Exploiting SQL injection vulnerability to extract database data.', tags: ['SQL', 'Web', 'Auth'] },
    { id: 2, title: 'Buffer Overflow — Protostar Stack 0', category: 'pwn', platform: 'Exploit-Exercises', date: '2026-01-20', difficulty: 'Débutant', fr: 'Première exploitation d\'un buffer overflow sur la pile.', en: 'First stack-based buffer overflow exploitation.', tags: ['Pwn', 'Binary', 'Stack'] },
    { id: 3, title: 'XSS Stockée — DVWA Medium', category: 'web', platform: 'DVWA', date: '2026-02-01', difficulty: 'Intermédiaire', fr: 'Injection XSS stockée pour voler les cookies de session.', en: 'Stored XSS injection to steal session cookies.', tags: ['XSS', 'Web', 'Session'] },
    { id: 4, title: 'RSA Factorisation — Root-Me', category: 'crypto', platform: 'Root-Me', date: '2026-02-10', difficulty: 'Facile', fr: 'Factorisation d\'une clé RSA faible pour déchiffrer un message.', en: 'Factoring weak RSA key to decrypt a message.', tags: ['RSA', 'Crypto', 'Factor'] },
    { id: 5, title: 'Énumération OSINT — Find the Agent', category: 'osint', platform: 'TryHackMe', date: '2026-02-15', difficulty: 'Facile', fr: 'Localisation d\'un agent à travers les traces numériques laissées.', en: 'Locating an agent through digital traces left behind.', tags: ['OSINT', 'Geo', 'Social'] },
    { id: 6, title: 'Forensic — PCAP Traffic Analysis', category: 'forensics', platform: 'CyberDefenders', date: '2026-03-01', difficulty: 'Intermédiaire', fr: 'Analyse de captures PCAP pour identifier une intrusion.', en: 'Analyzing PCAP captures to identify an intrusion.', tags: ['Forensics', 'PCAP', 'Network'] },
  ];

  let currentLang = localStorage.getItem('mym-lang') || 'fr';
  let currentFilter = 'all';

  function buildCard(w) {
    const desc = currentLang === 'fr' ? w.fr : w.en;
    const readLabel = currentLang === 'fr' ? 'Lire →' : 'Read →';
    return `
      <article class="writeup-card">
        <div class="card-header">
          <div class="card-meta">
            <span class="card-category ${w.category}">${w.category.toUpperCase()}</span>
            <span class="card-date">${w.date}</span>
          </div>
          <h3 class="card-title">${w.title}</h3>
        </div>
        <p class="card-desc">${desc}</p>
        <div class="card-footer">
          <div class="card-tags">${w.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <a href="#" class="read-more">${readLabel}</a>
        </div>
      </article>
    `;
  }

  function renderWriteups(filter) {
    const list = $('#writeupsList');
    const empty = $('#emptyState, #writeupsList');
    if (!list) return;
    const filtered = filter === 'all' ? writeupsData : writeupsData.filter(w => w.category === filter);
    list.innerHTML = filtered.length === 0 ? '' : filtered.map(buildCard).join('');
    if (empty) empty.style.display = filtered.length === 0 ? 'block' : 'none';
    $('#writeupCount').textContent = writeupsData.length;
    const catCount = document.querySelector('.cat-count');
    if (catCount) catCount.textContent = [...new Set(writeupsData.map(w => w.category))].length;
  }

  function setupFilters() {
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderWriteups(currentFilter);
      });
    });
  }

  // Language toggle
  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('mym-lang', lang);
    const langBtn = $('#langToggle');
    if (langBtn) langBtn.querySelector('.lang-current')?.textContent = lang.toUpperCase();
    document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
    renderWriteups(currentFilter);
  }

  function setupLang() {
    const btn = $('#langToggle');
    if (btn) btn.addEventListener('click', () => setLang(currentLang === 'fr' ? 'en' : 'fr'));
  }

  // Theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mym-theme', theme);
    $$('.theme-opt').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
  }

  function setupTheme() {
    const dd = $('#themeDropdown');
    if (!dd) return;
    $('#themeBtn').addEventListener('click', e => {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
    $$('.theme-opt').forEach(btn => btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
      dd.classList.remove('open');
    }));
    // initial
    const saved = localStorage.getItem('mym-theme') || 'dark';
    setTheme(saved);
  }

  // Matrix rain
  function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    let running = false;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const chars = 'ABCDEF0123456789';
    const fontSize = 14;
    let columns, drops;
    function initDrops() {
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    }
    function draw() {
      ctx.fillStyle = 'rgba(5,5,5,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    let frameId;
    function start() {
      if (running) return;
      running = true;
      (function loop() {
        if (!running) return;
        draw();
        frameId = requestAnimationFrame(loop);
      })();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }
    window.addEventListener('resize', () => {
      resize();
      initDrops();
    });
    resize();
    initDrops();
    start();
    // Pause when not visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) start();
        else stop();
      });
    });
    if (canvas) observer.observe(canvas);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupLang();
    setupFilters();
    initMatrix();
    renderWriteups('all');
  });
})();
