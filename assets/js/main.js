/* YASSIR MOUYIWA — PORTFOLIO · CYBER NEON THEME */
(function () {
  "use strict";
  const html = document.documentElement;

  /* — language — */
  const langBtn = document.querySelector("[data-lang-toggle]");
  const setLang = (lang) => {
    html.setAttribute("lang", lang);
    if (langBtn) langBtn.textContent = lang === "fr" ? "EN" : "FR";
    const titleAttr = html.dataset["title" + (lang === "fr" ? "Fr" : "En")];
    if (titleAttr) document.title = titleAttr;
    try { localStorage.setItem("yp-lang", lang); } catch (_) {}
  };
  let initialLang = "fr";
  try { const s = localStorage.getItem("yp-lang"); if (s === "fr" || s === "en") initialLang = s; } catch (_) {}
  setLang(initialLang);
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLang((html.getAttribute("lang") || "fr") === "fr" ? "en" : "fr");
    });
  }

  /* — year — */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* — project cards clickable — */
  document.querySelectorAll(".project-card[data-href]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      window.location.href = card.dataset.href;
    });
  });

  /* ============================================
     PRELOADER
     ============================================ */
  const preloader = document.getElementById("preloader");
  const loaderFill = document.getElementById("loader-bar-fill");
  const loaderWord = document.getElementById("loader-word");

  if (preloader) {
    const loadWords = [
      'INITIALIZING','LOADING MODULES','INJECTING PAYLOADS',
      'SCANNING PORTS','DECRYPTING','ESTABLISHING SHELL',
      'BYPASSING FIREWALL','ACCESS GRANTED'
    ];
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      if (loaderFill) loaderFill.style.width = progress + '%';
      if (loaderWord) loaderWord.textContent = loadWords[Math.floor(Math.random() * loadWords.length)];
      if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
          preloader.classList.add("hidden");
          document.body.style.overflow = "auto";
          initAll();
        }, 400);
      }
    }, 200);
    document.body.style.overflow = "hidden";
  } else {
    initAll();
  }

  function initAll() {
    initParticles();
    initNavigation();
    initTypedEffect();
    initTerminal();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initActiveNav();
  }

  /* ============================================
     PARTICLE BACKGROUND
     ============================================ */
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        if (mouse.x !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { this.x -= dx * 0.01; this.y -= dy * 0.01; }
        }
      }
      draw() {
        ctx.fillStyle = `rgba(0,255,136,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const numP = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < numP; i++) particles.push(new Particle());

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });
  }

  /* ============================================
     NAVIGATION
     ============================================ */
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navbar) {
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      });
    }

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("open");
      });
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          navToggle.classList.remove("active");
          navMenu.classList.remove("open");
        });
      });
      document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navToggle.classList.remove("active");
          navMenu.classList.remove("open");
        }
      });
    }
  }

  /* ============================================
     ACTIVE NAVIGATION LINK
     ============================================ */
  function initActiveNav() {
    const sections = document.querySelectorAll(".section, .hero-section");
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) current = section.getAttribute("id");
      });
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === current) link.classList.add("active");
      });
    });
  }

  /* ============================================
     TYPING EFFECT
     ============================================ */
  function initTypedEffect() {
    const typedElement = document.getElementById("typed-text");
    if (!typedElement) return;
    const phrases = [
      'au niveau silicium et réseau',
      'at the silicon and network layer',
      'des topologies réseau à la main',
      'hand-built network topologies',
      'des firmwares embarqués bas niveau',
      'low-level embedded firmware',
      "des dashboards d'audit",
      'audit dashboards'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 50;
    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }
      if (!isDeleting && charIndex === currentPhrase.length) { typingSpeed = 2000; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typingSpeed = 400; }
      setTimeout(type, typingSpeed);
    }
    setTimeout(type, 1000);
  }

  /* ============================================
     HERO TERMINAL
     ============================================ */
  function initTerminal() {
    const terminalBody = document.getElementById("terminal-body");
    if (!terminalBody) return;
    const commands = [
      { cmd: 'whoami', output: 'yassir-mouyiwa | Security Researcher & Embedded Engineer' },
      { cmd: 'cat /etc/passwd | grep root', output: 'root:x:0:0:root:/root:/bin/bash' },
      { cmd: 'nmap -sV 192.168.1.1', output: 'PORT    STATE SERVICE  VERSION\n22/tcp  open  ssh      OpenSSH 8.9\n80/tcp  open  http     nginx 1.18\n443/tcp open  https    nginx 1.18' },
      { cmd: 'uname -a', output: 'Linux kali 6.1.0-amd64 #1 SMP PREEMPT x86_64 GNU/Linux' },
      { cmd: 'python3 -c "import pwn; print(pwn.version)"', output: 'pwntools 4.11.0' },
      { cmd: 'echo $MOTD', output: 'Welcome back, Yassir. 3 new CVEs to review.' }
    ];
    let cmdIndex = 0, charIdx = 0;
    function typeCommand() {
      if (cmdIndex >= commands.length) {
        setTimeout(() => {
          terminalBody.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">yassir@kali:~$</span><span class="terminal-command" id="terminal-cmd"></span></div>';
          cmdIndex = 0; typeCommand();
        }, 3000);
        return;
      }
      const current = commands[cmdIndex];
      const cmdEl = document.getElementById("terminal-cmd");
      if (!cmdEl) return;
      if (charIdx < current.cmd.length) {
        cmdEl.textContent += current.cmd.charAt(charIdx);
        charIdx++;
        setTimeout(typeCommand, 40 + Math.random() * 60);
      } else {
        setTimeout(() => {
          const outputLines = current.output.split('\n');
          let outputHtml = '';
          outputLines.forEach(line => {
            outputHtml += '<div class="terminal-line response"><span class="terminal-output accent">' + line + '</span></div>';
          });
          const newLine = document.createElement('div');
          newLine.className = 'terminal-line';
          newLine.innerHTML = '<span class="terminal-prompt">yassir@kali:~$</span><span class="terminal-command" id="terminal-cmd"></span>';
          terminalBody.innerHTML += outputHtml;
          terminalBody.appendChild(newLine);
          terminalBody.scrollTop = terminalBody.scrollHeight;
          cmdIndex++; charIdx = 0;
          setTimeout(typeCommand, 1500);
        }, 500);
      }
    }
    setTimeout(typeCommand, 2000);
  }

  /* ============================================
     SCROLL ANIMATIONS
     ============================================ */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .focus-card').forEach(el => observer.observe(el));

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.section-title').forEach(title => {
      title.style.opacity = '0';
      title.style.transform = 'translateY(20px)';
      title.style.transition = 'all 0.6s ease';
      titleObserver.observe(title);
    });
  }

  /* ============================================
     SKILL BARS
     ============================================ */
  function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => { bar.style.width = progress + '%'; }, 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-category').forEach(c => observer.observe(c));
  }

  /* ============================================
     CONTACT FORM
     ============================================ */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector(".submit-btn");
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = '#00cc6a';
        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          form.reset();
        }, 2000);
      }, 1500);
    });
  }

  /* ============================================
     BACK TO TOP
     ============================================ */
  function initBackToTop() {
    const backToTop = document.getElementById("back-to-top");
    if (!backToTop) return;
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
  }

  /* ============================================
     SMOOTH SCROLL
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

})();