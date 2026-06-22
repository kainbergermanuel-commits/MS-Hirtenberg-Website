(() => {
  /* ── Styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #back-to-top {
      position: fixed;
      bottom: 36px;
      right: 40px;
      z-index: 999;

      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px 10px 18px;
      border-radius: 100px;
      border: 1.5px solid oklch(82% 0.06 145 / 0.45);
      background: oklch(98% 0.008 88 / 0.72);
      backdrop-filter: blur(18px) saturate(1.5);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      box-shadow:
        0 4px 24px oklch(0% 0 0 / 10%),
        inset 0 1px 0 oklch(100% 0 0 / 0.55);

      font-family: var(--font-body, 'Nunito', system-ui, sans-serif);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: oklch(38% 0.09 145);
      cursor: pointer;
      text-decoration: none;

      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition:
        opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
        background 0.2s,
        box-shadow 0.2s,
        border-color 0.2s;
    }

    #back-to-top.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    #back-to-top:hover {
      background: oklch(96% 0.018 145 / 0.85);
      border-color: oklch(72% 0.07 145 / 0.45);
      box-shadow:
        0 6px 30px oklch(52% 0.10 145 / 15%),
        inset 0 1px 0 oklch(100% 0 0 / 0.65);
      color: oklch(30% 0.09 145);
    }

    #back-to-top:active {
      transform: translateY(1px) scale(0.97);
    }

    #back-to-top svg {
      flex-shrink: 0;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #back-to-top:hover svg {
      transform: translateY(-2px);
    }

    @media (max-width: 600px) {
      #back-to-top {
        bottom: 24px;
        right: 20px;
        padding: 9px 17px 9px 14px;
        font-size: 0.78rem;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── Element ── */
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Zurück nach oben');
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 11.5V2.5M7 2.5L2.5 7M7 2.5L11.5 7"
            stroke="currentColor" stroke-width="1.9"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Nach oben
  `;
  document.body.appendChild(btn);

  /* ── Scroll-Logik ── */
  let ticking = false;
  const threshold = window.innerHeight * 0.85;

  function update() {
    const show = window.scrollY > threshold;
    btn.classList.toggle('visible', show);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  /* ── Klick ── */
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
