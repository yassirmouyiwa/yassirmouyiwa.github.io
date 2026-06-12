/* yassir mouyiwa — portfolio · build dusk · v4 */

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
  try {
    const stored = localStorage.getItem("yp-lang");
    if (stored === "fr" || stored === "en") initialLang = stored;
  } catch (_) {}
  setLang(initialLang);
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLang((html.getAttribute("lang") || "fr") === "fr" ? "en" : "fr");
    });
  }

  /* — theme — */
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const setTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☼" : "☾";
    try { localStorage.setItem("yp-theme", theme); } catch (_) {}
  };
  let initialTheme = "dark";
  try {
    const stored = localStorage.getItem("yp-theme");
    if (stored === "dark" || stored === "light") initialTheme = stored;
  } catch (_) {}
  setTheme(initialTheme);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTheme((html.getAttribute("data-theme") || "dark") === "dark" ? "light" : "dark");
    });
  }

  /* — year — */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* — project cards: whole card clickable, but inner links/buttons take priority — */
  document.querySelectorAll(".project-card[data-href]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      window.location.href = card.dataset.href;
    });
  });
})();
