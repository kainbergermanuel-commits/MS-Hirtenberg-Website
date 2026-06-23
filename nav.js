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

    /* ── Changelog-Popup ── */
    .nav-cl-li { position: relative; }
    .nav-cl-popup {
      position: absolute;
      top: calc(100% + 14px);
      left: 50%;
      transform: translateX(-50%) translateY(-5px);
      width: 264px;
      background: oklch(99% 0.006 88 / 0.84);
      backdrop-filter: blur(22px) saturate(1.5);
      -webkit-backdrop-filter: blur(22px) saturate(1.5);
      border: 1px solid oklch(100% 0 0 / 0.55);
      border-radius: 14px;
      box-shadow: 0 8px 26px oklch(0% 0 0 / 9%), 0 1px 4px oklch(0% 0 0 / 4%);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.17s ease, transform 0.17s cubic-bezier(.2,.8,.25,1);
      z-index: 200;
      overflow: hidden;
    }
    .nav-cl-popup.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }
    .nav-cl-popup::before {
      content: '';
      position: absolute;
      top: -5px; left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 10px; height: 10px;
      background: oklch(98% 0.008 88 / 0.84);
      border-top: 1px solid oklch(100% 0 0 / 0.5);
      border-left: 1px solid oklch(100% 0 0 / 0.5);
      border-radius: 2px 0 0 0;
    }
    .nav-cl-head {
      padding: 9px 15px 7px;
      font-size: 0.62rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-light);
      border-bottom: 1px solid oklch(93% 0.012 88 / 0.7);
    }
    .nav-cl-list { list-style: none; }
    .nav-cl-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: baseline;
      gap: 9px;
      padding: 8px 15px;
      text-decoration: none;
      color: var(--text);
    }
    .nav-cl-chip {
      width: 6px; height: 6px;
      border-radius: 50%;
      align-self: center;
      font-size: 0;
      transition: transform 0.16s ease-out;
    }
    .nav-cl-chip.artikel { background: var(--sage-mid); }
    .nav-cl-chip.termin  { background: oklch(62% 0.08 265); }
    .nav-cl-chip.info    { background: oklch(70% 0.09 70); }
    .nav-cl-title {
      font-size: 0.81rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--text);
      text-wrap: pretty;
    }
    .nav-cl-date {
      position: relative;
      font-size: 0.67rem;
      color: var(--text-light);
      font-weight: 500;
      white-space: nowrap;
      padding-bottom: 2px;
    }
    .nav-cl-date::after {
      content: '';
      position: absolute;
      left: 50%; bottom: 0;
      width: 0; height: 1px;
      background: var(--text-light);
      transform: translateX(-50%);
      transition: width 0.18s ease-out;
    }
    .nav-cl-foot {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      padding: 7px 15px 9px;
      font-size: 0.72rem !important;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.01em;
      transition: color 0.16s ease-out;
    }
    .nav-cl-foot svg { transition: transform 0.16s ease-out; }
    /* Overlay-Links von den Basis-Nav-Hovers ausnehmen (sie liegen in .nav-links).
       transform:none trifft nur das <a>-Element selbst — nicht seine Kinder;
       der SVG-Pfeil in .nav-cl-foot:hover svg bleibt davon unberührt. */
    .nav-cl-popup a,
    .nav-cl-popup a:hover {
      background: none !important;
      box-shadow: none !important;
      transform: none !important;
    }
    .nav-cl-item { color: var(--text) !important; }
    .nav-cl-item:hover .nav-cl-chip { transform: scale(1.583); }
    .nav-cl-item:hover .nav-cl-date::after { width: 50%; }
    .nav-cl-foot, .nav-cl-foot:visited { color: var(--text-light) !important; }
    .nav-cl-foot:hover { color: var(--sage-dark) !important; }
    .nav-cl-foot:hover svg { transform: translateX(3px); }
    /* Trigger-Link behält den normalen Nav-Hover */
    @media (max-width: 768px) { .nav-cl-popup { display: none; } }
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

  /* ── Changelog-Popup ── */
  (function () {
    const aktLink = [...nav.querySelectorAll('.nav-links a')]
      .find(a => a.textContent.trim() === 'Aktuelles');
    if (!aktLink) return;

    const li = aktLink.parentElement;
    li.classList.add('nav-cl-li');

    const popup = document.createElement('div');
    popup.className = 'nav-cl-popup';
    popup.setAttribute('role', 'region');
    popup.setAttribute('aria-label', 'Letzte Änderungen');
    popup.innerHTML =
      '<div class="nav-cl-head"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;opacity:0.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Zuletzt aktualisiert</div>' +
      '<ul class="nav-cl-list"><li><span class="nav-cl-item" style="grid-template-columns:1fr;color:var(--text-light);font-size:0.81rem;">Lädt …</span></li></ul>' +
      '<a href="' + R + 'alle-aktualisierungen.html" class="nav-cl-foot">' +
        'Alle Einträge ansehen ' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</a>';
    li.appendChild(popup);

    /* hover / focus with enter-delay + leave-grace */
    let t;
    function show() {
      clearTimeout(t);
      loadOnce();
      t = setTimeout(function () { popup.classList.add('open'); }, 80);
    }
    function hide() {
      clearTimeout(t);
      t = setTimeout(function () { popup.classList.remove('open'); }, 200);
    }
    aktLink.addEventListener('mouseenter', show);
    aktLink.addEventListener('mouseleave', hide);
    popup.addEventListener('mouseenter', show);
    popup.addEventListener('mouseleave', hide);
    aktLink.addEventListener('focus', show);
    aktLink.addEventListener('blur',  hide);

    /* fetch changelog.json once */
    var fetched = false;
    function loadOnce() {
      if (fetched) return;
      fetched = true;
      fetch(R + 'changelog.json')
        .then(function (r) { return r.json(); })
        .then(function (items) { render(items.slice(0, 5)); })
        .catch(function () {
          popup.querySelector('.nav-cl-list').innerHTML =
            '<li><span class="nav-cl-item" style="grid-template-columns:1fr;color:var(--text-light);font-size:0.81rem;">Keine Einträge verfügbar.</span></li>';
        });
    }

    function relDate(s) {
      var d    = new Date(s + 'T12:00:00');
      var diff = Math.floor((Date.now() - d) / 86400000);
      if (diff === 0) return 'heute';
      if (diff === 1) return 'gestern';
      if (diff <  7) return 'vor\u202f' + diff + '\u202fTagen';
      if (diff < 14) return 'vor\u202feiner Woche';
      if (diff < 21) return 'vor\u202f2\u202fWochen';
      if (diff < 28) return 'vor\u202f3\u202fWochen';
      var mn = ['Jän','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][d.getMonth()];
      return d.getDate() + '.\u202f' + mn;
    }

    var typeLabel = { artikel: 'Artikel', termin: 'Termin', info: 'Info' };
    function render(items) {
      popup.querySelector('.nav-cl-list').innerHTML = items.map(function (item) {
        return '<li>' +
          '<a class="nav-cl-item" href="' + R + item.href + '">' +
            '<span class="nav-cl-chip ' + item.type + '">' + (typeLabel[item.type] || item.type) + '</span>' +
            '<span class="nav-cl-title">' + item.title + '</span>' +
            '<span class="nav-cl-date">'  + relDate(item.date) + '</span>' +
          '</a>' +
        '</li>';
      }).join('');
    }
  })();

})();
