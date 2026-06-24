/* ============================================================
   MYM Writeups — Application (Complete)
   ============================================================ */

/* -----------------------------------------------------------
   DATA
   ----------------------------------------------------------- */
const writeups = [
  {
    id: 'htb-jeeves',
    title: 'Jeeves — Windows Privilege Escalation to SYSTEM',
    date: '2026-03-15',
    lang: 'EN',
    desc: 'Enumeration via SMB and exploit of Jenkins for initial foothold. Privilege escalation using JuicyPotato to gain SYSTEM access.',
    tags: ['HackTheBox', 'Windows', 'Privilege Escalation', 'Medium'],
    url: 'https://app.hackthebox.com/machines/Jeeves',
  },
  {
    id: 'htb-legacy',
    title: 'Legacy — Exploiting EternalBlue (MS17-010)',
    date: '2026-01-10',
    lang: 'EN',
    desc: 'Rapid exploitation of SMB vulnerability on Windows XP. Full walkthrough of payload delivery using Metasploit and manual exploitation.',
    tags: ['HackTheBox', 'Windows', 'CVE', 'Easy'],
    url: 'https://app.hackthebox.com/machines/Legacy',
  },
  {
    id: 'thm-vulnversity',
    title: 'Vulnversity — Reconnaissance and Web Exploitation',
    date: '2025-11-22',
    lang: 'FR',
    desc: 'Scan avec Nmap, énumération de services et upload de reverse shell via bypass de filtre d\'extension.',
    tags: ['TryHackMe', 'Web', 'Linux', 'Easy'],
    url: 'https://tryhackme.com/room/vulnversity',
  },
  {
    id: 'htb-dog',
    title: 'Dog — Upload chaining and service abuse',
    date: '2025-09-05',
    lang: 'EN',
    desc: 'Exploitation of a vulnerable PHP upload endpoint. Chaining with service abuse to read sensitive files.',
    tags: ['HackTheBox', 'Web', 'Linux', 'Medium'],
    url: 'https://app.hackthebox.com/machines/Dog',
  },
  {
    id: 'cryptopals-set1',
    title: 'Cryptopals — Set 1 : Basics',
    date: '2025-07-18',
    lang: 'FR',
    desc: 'Implémentation manuelle de la cryptographie classique : hex, base64, XOR, détection d\'AES ECB et scoring de texte.',
    tags: ['Cryptography', 'Python', 'Beginner'],
    url: 'https://cryptopals.com/sets/1',
  },
];

const i18n = {
  fr: {
    projectsPage: 'Projets',
    writeupsPage: 'Writeups',
    badge: 'Writeups & Analyses',
    heroTitle: 'My Writeups',
    heroDesc: 'Rétro-ingénierie, pwn, web exploitation, et plus encore. Documentés avec rigueur.',
    sectionTitle: 'Tous les Writeups',
    sectionDesc: 'Archives complètes de mes analyses et résolutions.',
    empty: 'Il n\'y a pas encore de writeups. Revenez bientôt…',
    readMore: 'Lire le writeup →',
    footer: '— Documente ton trajet, partage ta perspective. —',
    langLabel: 'FR',
    themeAuto: 'Système',
    themeDark: 'Sombre',
    themeLight: 'Clair',
    themeLabel: 'Thème',
    pubDate: 'Publié le',
  },
  en: {
    projectsPage: 'Projects',
    writeupsPage: 'Writeups',
    badge: 'Writeups & Analysis',
    heroTitle: 'My Writeups',
    heroDesc: 'Reverse engineering, pwn, web exploitation, and more. Rigorously documented.',
    sectionTitle: 'All Writeups',
    sectionDesc: 'Complete archives of my analyses and resolutions.',
    empty: 'No writeups yet. Check back soon…',
    readMore: 'Read writeup →',
    footer: '— Document your journey, share your perspective. —',
    langLabel: 'EN',
    themeAuto: 'System',
    themeDark: 'Dark',
    themeLight: 'Light',
    themeLabel: 'Theme',
    pubDate: 'Published on',
  },
};

/* -----------------------------------------------------------
   THEME / LANG STATE
   ----------------------------------------------------------- */
let currentLang = localStorage.getItem('mym-lang') || 'fr';
let currentTheme = localStorage.getItem('mym-theme') || 'dark';

/* -----------------------------------------------------------
   THEME / LANG LOGIC
   ----------------------------------------------------------- */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  currentTheme = theme;
}
applyTheme(currentTheme);

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('mym-lang', lang);
  document.getElementById('langToggle').textContent = i18n[lang].langLabel;
  render();
}

function switchTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('mym-theme', theme);
  applyTheme(theme);
  document.querySelectorAll('.theme-opt').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
}

/* -----------------------------------------------------------
   RENDER
   ----------------------------------------------------------- */
function render() {
  const t = i18n[currentLang];
  // Page texts
  document.getElementById('projectsPageLink').textContent = t.projectsPage;
  document.getElementById('writeupsPageLink').textContent = t.writeupsPage;
  document.getElementById('writeupsPageLink').setAttribute('aria-current', 'page');
  document.querySelector('.hero-badge span').textContent = t.badge;
  document.querySelector('.hero-title').textContent = t.heroTitle;
  document.querySelector('.hero-desc').textContent = t.heroDesc;
  document.querySelector('section.writeups > .section-header h2').textContent = t.sectionTitle;
  document.querySelector('section.writeups > .section-header p').textContent = t.sectionDesc;
  document.getElementById('footer-text').textContent = t.footer;
  // theme label removed — button shows icon only

  // Render writeups list
  const list = document.getElementById('writeupsList');
  if (!writeups.length) {
    list.innerHTML = '<p class="empty-state">' + t.empty + '</p>';
    return;
  }

  list.innerHTML = '';
  writeups.forEach((w, i) => {
    const card = document.createElement('article');
    card.className = 'writeup-card reveal';
    card.style.transitionDelay = (i * 100) + 'ms';
    card.onclick = () => window.open(w.url, '_blank');
    card.innerHTML = `
      <div class="writeup-date">${w.date}</div>
      <div class="writeup-content">
        <div class="writeup-meta">
          <span class="writeup-lang">${w.lang}</span>
        </div>
        <h3 class="writeup-title">${w.title}</h3>
        <p class="writeup-desc">${w.desc}</p>
        <div class="writeup-tags">
          ${w.tags.map(tag => `<span class="writeup-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  // IntersectionObserver for reveal
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
      }, { threshold: 0.1 });
      observer.observe(el);
    });
  }, 50);
}

/* -----------------------------------------------------------
   INIT
   ----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  render();

  // Theme dropdown
  const themeBtn = document.getElementById('themeBtn');
  const dropdown = document.getElementById('themeDropdown');
  themeBtn.addEventListener('click', () => dropdown.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && e.target !== themeBtn) dropdown.classList.remove('open');
  });

  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => switchTheme(btn.dataset.theme));
  });

  // Lang toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    switchLang(newLang);
  });

  // Theme active
  document.querySelectorAll('.theme-opt').forEach(el => el.classList.toggle('active', el.dataset.theme === currentTheme));
});
