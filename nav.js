/* ─── AOR Dyno Tuning - Shared Nav Component ─── */
(function () {
  const NAV_CSS = `
    aor-nav { display: block; }
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      background: rgba(10,10,10,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: background 0.3s;
    }
    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-logo { display: flex; align-items: center; text-decoration: none; }
    .nav-logo img { height: 44px; width: auto; }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a {
      color: var(--gray);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: color 0.3s;
    }
    .nav-links a:hover { color: var(--white); }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--white);
      transition: transform 0.3s, opacity 0.3s;
    }
    /* ─── Right controls ─── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    /* ─── Language Switcher ─── */
    .nav-lang {
      background: none;
      border: 1px solid rgba(255,255,255,0.15);
      color: var(--gray);
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: border-color 0.2s, color 0.2s;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .nav-lang:hover { border-color: rgba(255,255,255,0.4); color: var(--white); }
    /* ─── Herramientas Dropdown ─── */
    .nav-dropdown { position: relative; }
    .nav-dropdown-btn {
      background: var(--red);
      color: var(--white);
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s, transform 0.2s;
      white-space: nowrap;
    }
    .nav-dropdown-btn:hover { background: #c22d38; transform: translateY(-1px); }
    .nav-dropdown-btn svg {
      width: 12px; height: 12px;
      stroke: currentColor;
      fill: none;
      transition: transform 0.2s;
    }
    .nav-dropdown.open .nav-dropdown-btn svg { transform: rotate(180deg); }
    .nav-dropdown-menu {
      display: none;
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: var(--dark-surface);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 6px;
      min-width: 180px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      z-index: 200;
    }
    .nav-dropdown.open .nav-dropdown-menu { display: block; }
    .nav-dropdown-menu a,
    .nav-dropdown-menu button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 14px;
      border-radius: 7px;
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--gray);
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      letter-spacing: 0.3px;
      transition: background 0.2s, color 0.2s;
    }
    .nav-dropdown-menu a:hover,
    .nav-dropdown-menu button:hover {
      background: rgba(255,255,255,0.06);
      color: var(--white);
    }
    .nav-dropdown-menu a.active {
      color: var(--white);
      background: rgba(230,57,70,0.12);
    }
    .nav-dropdown-menu svg {
      width: 15px; height: 15px;
      stroke: currentColor;
      fill: none;
      flex-shrink: 0;
    }
    .nav-dropdown-divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 4px 0;
    }
    /* ─── Responsive ─── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-links a { display: block; padding: 10px 0; }
      .nav-links.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0; right: 0;
        background: rgba(10,10,10,0.97);
        backdrop-filter: blur(12px);
        padding: 24px;
        gap: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .hamburger { display: flex; }
      /* dropdown keeps its desktop absolute positioning and solid background;
         just ensure it never overflows off the right edge of the screen */
      .nav-dropdown-menu {
        right: 0;
        left: auto;
        min-width: 210px;
      }
    }
  `;

  // Inject CSS once
  if (!document.getElementById('aor-nav-style')) {
    const style = document.createElement('style');
    style.id = 'aor-nav-style';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  const LABELS = {
    es: {
      services: 'Servicios', dyno: 'Dinamómetro', brands: 'Marcas',
      faq: 'FAQ', social: 'Redes', contact: 'Contacto',
      tools: 'Herramientas', menu: 'Menú',
      fuel: 'Fuel Blending', vin: 'Decodificador VIN', pcm: 'Referencia P01/P59',
      langLabel: 'EN', langHref: '/en/'
    },
    en: {
      services: 'Services', dyno: 'Dynamometer', brands: 'Brands',
      faq: 'FAQ', social: 'Social', contact: 'Contact',
      tools: 'Tools', menu: 'Menu',
      fuel: 'Fuel Blending', vin: 'VIN Decoder', pcm: 'P01/P59 Reference',
      langLabel: 'ES', langHref: '/'
    }
  };

  class AorNav extends HTMLElement {
    connectedCallback() {
      const active = this.getAttribute('active') || '';
      const lang = this.getAttribute('lang') || 'es';
      const L = LABELS[lang] || LABELS.es;
      const prefix = lang === 'en' ? '/en' : '';
      const homeHref = lang === 'en' ? '/en/' : '/';

      // Build the lang switcher href for subpages
      let langHref = L.langHref;
      if (active) {
        langHref = lang === 'en' ? '/' + active : '/en/' + active;
      }

      this.innerHTML = `
        <nav>
          <div class="nav-inner">
            <a href="${homeHref}" class="nav-logo">
              <img src="/simple_logo.svg" alt="AOR Dyno Tuning">
            </a>
            <ul class="nav-links" id="navLinks">
              <li><a href="${homeHref}#servicios">${L.services}</a></li>
              <li><a href="${homeHref}#dyno">${L.dyno}</a></li>
              <li><a href="${homeHref}#marcas">${L.brands}</a></li>
              <li><a href="${homeHref}#faq">${L.faq}</a></li>
              <li><a href="${homeHref}#redes">${L.social}</a></li>
              <li><a href="${homeHref}#contacto">${L.contact}</a></li>
            </ul>
            <div class="nav-right">
              <div class="nav-dropdown" id="toolsDropdown">
                <button class="nav-dropdown-btn" id="toolsDropdownBtn">
                  ${L.tools}
                  <svg viewBox="0 0 24 24" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                  <a href="${prefix}/calculadora"${active === 'calculadora' ? ' class="active"' : ''}>
                    <svg viewBox="0 0 24 24" stroke-width="2">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <line x1="8" y1="6" x2="16" y2="6"/>
                      <line x1="8" y1="10" x2="16" y2="10"/>
                      <line x1="8" y1="14" x2="12" y2="14"/>
                    </svg>
                    ${L.fuel}
                  </a>
                  <div class="nav-dropdown-divider"></div>
                  <a href="${prefix}/vin"${active === 'vin' ? ' class="active"' : ''}>
                    <svg viewBox="0 0 24 24" stroke-width="2">
                      <rect x="2" y="6" width="20" height="13" rx="2"/>
                      <circle cx="7.5" cy="12.5" r="1.5"/>
                      <line x1="12" y1="10" x2="19" y2="10"/>
                      <line x1="12" y1="14" x2="17" y2="14"/>
                    </svg>
                    ${L.vin}
                  </a>
                  <div class="nav-dropdown-divider"></div>
                  <a href="${prefix}/pcm"${active === 'pcm' ? ' class="active"' : ''}>
                    <svg viewBox="0 0 24 24" stroke-width="2">
                      <rect x="7" y="7" width="10" height="10" rx="1"/>
                      <path d="M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3"/>
                    </svg>
                    ${L.pcm}
                  </a>
                </div>
              </div>
              <a href="${langHref}" class="nav-lang">${L.langLabel}</a>
            </div>
            <button class="hamburger" id="hamburger" aria-label="${L.menu}">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      `;

      this._initDropdown();
      this._initHamburger();
    }

    _initDropdown() {
      const dropdown = this.querySelector('#toolsDropdown');
      const btn = this.querySelector('#toolsDropdownBtn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
      });
    }

    _initHamburger() {
      const hamburger = this.querySelector('#hamburger');
      const navLinks = this.querySelector('#navLinks');

      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          const spans = hamburger.querySelectorAll('span');
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        });
      });
    }
  }

  customElements.define('aor-nav', AorNav);
})();
