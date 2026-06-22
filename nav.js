/* ─────────────────────────────────────────────────────────────────
   nav.js  –  Gemeinsame Navigation MS Hirtenberg

   Einbindung (erstes Element nach <body>):
     Root-Seiten:   <script src="nav.js"></script>
     news/-Seiten:  <script src="../nav.js"></script>

   Rückgängig machen:
     <script>-Tag entfernen → original <nav>…</nav> + CSS-Block
     aus dem Git-Verlauf wiederherstellen.
   ───────────────────────────────────────────────────────────────── */
(() => {
  const path     = location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  const inNews   = path.includes('/news/');
  const R        = inNews ? '../' : '';

  /* ── Aktiven Link ermitteln ── */
  function isActive(base) {
    if (filename === 'aktuelles.html'   && base === 'aktuelles.html')  return true;
    if (filename === 'termine.html'     && base === 'termine.html')     return true;
    if (filename === 'lehrer.html'      && base === 'index.html#team')  return true;
    if (filename === 'galerie.html'     && base === 'galerie.html')     return true;
    if (filename === 'neu-bei-uns.html' && base === 'neu-bei-uns.html') return true;
    if (inNews                          && base === 'aktuelles.html')   return true;
    return false;
  }

  /* ── CSS ── */
  const css = document.createElement('style');
  css.textContent = `
    nav {
      position: sticky; top: 0; z-index: 100;
      background: oklch(98% 0.008 88 / 0.78);
      backdrop-filter: blur(18px) saturate(1.4);
      -webkit-backdrop-filter: blur(18px) saturate(1.4);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px; height: 68px;
      border-bottom: 1.5px solid oklch(100% 0 0 / 0.55);
      box-shadow: 0 2px 20px oklch(0% 0 0 / 6%);
      transition: height .35s cubic-bezier(.4,0,.2,1),
                  box-shadow .35s cubic-bezier(.4,0,.2,1),
                  background .35s;
    }
    nav.scrolled { height: 50px; box-shadow: 0 2px 28px oklch(0% 0 0 / 10%); }
    .nav-logo {
      font-family: var(--font-heading);
      color: var(--sage-dark); font-size: 1.2rem; font-weight: 700;
      letter-spacing: -.02em; text-decoration: none;
      display: flex; align-items: center; gap: 10px;
    }
    .nav-pill {
      display: inline-flex; align-items: center;
      background: var(--white); color: var(--sage);
      font-size: .7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .13em; padding: 5px 14px; border-radius: 30px;
      border: 1.5px solid var(--sage-pale); white-space: nowrap;
    }
    .nav-links { display: flex; gap: 4px; list-style: none; }
    .nav-links a {
      color: var(--text-light); text-decoration: none;
      font-size: .88rem; font-weight: 600;
      padding: 7px 15px; border-radius: 30px;
      transition: background .2s, color .2s, transform .15s, box-shadow .15s;
      letter-spacing: .01em;
    }
    .nav-links a:hover,
    .nav-links a.active {
      background: linear-gradient(135deg, var(--sage-pale), oklch(90% 0.055 145));
      color: var(--sage-dark); transform: translateY(-1px);
      box-shadow: 0 3px 10px oklch(0% 0 0 / 8%);
    }
    .nav-links a.nav-cta { color: var(--sage-dark); font-weight: 800; white-space: nowrap; }
    .nav-links a.nav-cta:hover,
    .nav-links a.nav-cta.active {
      background: linear-gradient(135deg, var(--sage), var(--sage-mid));
      color: var(--white); transform: translateY(-1px);
      box-shadow: 0 3px 10px oklch(52% 0.10 145 / 25%);
    }
    @media (max-width: 768px) { nav { padding: 0 20px; } }
  `;
  document.head.appendChild(css);

  /* ── Links ── */
  const isIndex = (filename === 'index.html' || filename === '');
  const links = isIndex
    ? [
        { href: 'neu-bei-uns.html',  label: 'Neu bei uns?', cls: 'nav-cta' },
        { href: '#news',             label: 'Aktuelles' },
        { href: 'termine.html',      label: 'Termine' },
        { href: '#team',             label: 'Lehrpersonal' },
        { href: '#galerie',          label: 'Galerie' },
        { href: '#kontakt',          label: 'Kontakt' },
      ]
    : [
        { href: R + 'neu-bei-uns.html',   label: 'Neu bei uns?', cls: 'nav-cta' },
        { href: R + 'aktuelles.html',     label: 'Aktuelles' },
        { href: R + 'termine.html',       label: 'Termine' },
        { href: R + 'index.html#team',    label: 'Lehrpersonal' },
        { href: R + 'galerie.html',       label: 'Galerie' },
        { href: R + 'index.html#kontakt', label: 'Kontakt' },
      ];

  /* ── Nav-Element bauen ── */
  const logoHref = isIndex ? '#home' : R + 'index.html';
  const nav = document.createElement('nav');

  const liItems = links.map(({ href, label, cls }) => {
    const base    = href.replace(/^\.\.\//, '');
    const classes = [cls || '', isActive(base) ? 'active' : ''].filter(Boolean).join(' ');
    return `<li><a href="${href}"${classes ? ` class="${classes}"` : ''}>${label}</a></li>`;
  }).join('');

  nav.innerHTML = `
    <a href="${logoHref}" class="nav-logo">
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="19" cy="19" r="17" fill="none" stroke="oklch(52% 0.10 145)" stroke-width="1.3"/>
        <circle cx="19" cy="19" r="13.5" fill="none" stroke="oklch(52% 0.10 145)" stroke-width="0.4" opacity="0.4"/>
        <line x1="19" y1="27" x2="19" y2="22" stroke="oklch(52% 0.10 145)" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M19 22 C22 18 22 12 19 11 C16 12 16 18 19 22Z" fill="oklch(52% 0.10 145)"/>
        <path d="M19 22 C15 19 12 15 13 13 C15 13 18 18 19 22Z" fill="oklch(68% 0.09 145)"/>
        <path d="M19 22 C23 19 26 15 25 13 C23 13 20 18 19 22Z" fill="oklch(68% 0.09 145)"/>
        <circle cx="19" cy="2" r="1.8" fill="oklch(60% 0.11 68)"/>
      </svg>
      <span class="nav-pill">Mittelschule Hirtenberg</span>
    </a>
    <ul class="nav-links">${liItems}</ul>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  /* ── Scroll-Shrink ── */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 45);
  }, { passive: true });
})();
