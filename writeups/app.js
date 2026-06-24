(() => {
'use strict';
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const writeupsData = [
  { id: 1, title: 'SQL Injection — PortSwigger Lab', category: 'web', platform: 'PortSwigger', date: '2026-01-15', difficulty: 'Intermédiaire', fr: 'Exploitation d\'une faille SQL injection pour extraire des données de la base.', en: 'Exploiting SQL injection vulnerability to extract database data.', tags: ['SQL', 'Web', 'Auth'] },
  { id: 2, title: 'Buffer Overflow — Protostar Stack 0', category: 'pwn', platform: 'Exploit-Exercises', date: '2026-01-20', difficulty: 'Débutant', fr: 'Première exploitation d\'un buffer overflow sur la pile.', en: 'First stack-based buffer overflow exploitation.', tags: ['Pwn', 'Binary', 'Stack'] },
  { id: 3, title: 'XSS Stockée — DVWA Medium', category: 'web', platform: 'DVWA', date: '2026-02-01', difficulty: 'Intermédiaire', fr: 'Injection XSS stockée pour voler les cookies de session.', en: 'Stored XSS injection to steal session cookies.', tags: ['XSS', 'Web', 'Session'] },
  { id: 4, title: 'RSA Factorisation — Factor Challenge', category: 'crypto', platform: 'Root-Me', date: '2026-02-10', difficulty: 'Facile', fr: 'Factorisation d\'une clé RSA faible pour déchiffrer un message.', en: 'Factoring weak RSA key to decrypt a message.', tags: ['RSA', 'Crypto', 'Factor'] },
  { id: 5, title: 'Énumération OSINT — Find the Agent', category: 'osint', platform: 'TryHackMe', date: '2026-02-15', difficulty: 'Facile', fr: 'Localisation d\'un agent à travers les traces numériques laissées.', en: 'Locating an agent through digital traces left behind.', tags: ['OSINT', 'Geo', 'Social'] },
  { id: 6, title: 'Forensic — HTTP Traffic Analysis', category: 'forensics', platform: 'CyberDefenders', date: '2026-03-01', difficulty: 'Intermédiaire', fr: 'Analyse de captures PCAP pour identifier une intrusion.', en: 'Analyzing PCAP captures to identify an intrusion.', tags: ['Forensics', 'PCAP', 'Network'] },
];

let currentLang = localStorage.getItem('mym-lang') || 'fr';
let currentTheme = localStorage.getItem('mym-theme') || 'dark';
let currentFilter = 'all';

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mym-theme', theme);
  currentTheme = theme;
  $$('.theme-opt').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mym-lang', lang);
  applyTranslations();
  renderWriteups(currentFilter);
}

function applyTranslations() {
  $$('[data-fr][data-en]').forEach(el => el.textContent = el.dataset[currentLang] || el.textContent);
  const langBtn = $('#langToggle');
  if (langBtn) langBtn.querySelector('.lang-current').textContent = currentLang.toUpperCase();
  document.documentElement.lang = currentLang === 'fr' ? 'fr' : 'en';
}

function buildCard(w) {
  const desc = currentLang === 'fr' ? w.fr : w.en;
  const readLabel = currentLang === 'fr' ? 'Lire →' : 'Read →';
  return `<article class="writeup-card"><div class="writeup-header"><h3 class="writeup-title">${w.title}</h3><span class="writeup-badge">${w.category.toUpperCase()}</span></div><div class="writeup-meta"><span class="writeup-date">${w.date}</span><span class="writeup-platform">${w.platform}</span></div><p class="writeup-desc">${desc}</p><div class="writeup-tags">${w.tags.map(t => `<span class="writeup-tag">${t}</span>`).join('')}</div><a href="#" class="writeup-link">${readLabel}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></article>`;
}

function renderWriteups(filter) {
  const list = $('#writeupsList');
  const empty = $('#emptyState');
  if (!list) return;
  const filtered = filter === 'all' ? writeupsData : writeupsData.filter(w => w.category === filter);
  list.innerHTML = filtered.length === 0 ? '' : filtered.map(buildCard).join('');
  if (empty) empty.style.display = filtered.length === 0 ? 'block' : 'none';
  $('#writeupCount').textContent = writeupsData.length;
  document.querySelector('.cat-count').textContent = [...new Set(writeupsData.map(w => w.category))].length;
}

function setupThemeDropdown() {
  const dd = $('#themeDropdown');
  if (!dd) return;
  $('#themeBtn').addEventListener('click', e => { e.stopPropagation(); dd.classList.toggle('open'); });
  document.addEventListener('click', e => { if (!dd.contains(e.target)) dd.classList.remove('open'); });
  $$('.theme-opt').forEach(btn => btn.addEventListener('click', () => { setTheme(btn.dataset.theme); dd.classList.remove('open'); }));
}

function setupLangToggle() {
  const btn = $('#langToggle');
  if (btn) btn.addEventListener('click', () => setLang(currentLang === 'fr' ? 'en' : 'fr'));
}

function setupFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderWriteups(currentFilter);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  applyTranslations();
  setupThemeDropdown();
  setupLangToggle();
  setupFilters();
  renderWriteups('all');
});
})();