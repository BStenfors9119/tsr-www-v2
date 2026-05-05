import { navRoutes } from '../../router.js';

const renderHeader = ({ activePath, theme, menuOpen }) => `
  <header class="tsr-header">
    <div class="tsr-container tsr-header__inner">
      <a href="/" data-link class="tsr-header__brand">
        <strong>The Sports Remote</strong>
      </a>

      <button class="tsr-header__toggle" type="button"
              aria-label="Toggle navigation"
              aria-expanded="${menuOpen ? 'true' : 'false'}">
        <span></span><span></span><span></span>
      </button>

      <nav class="tsr-header__nav${menuOpen ? ' is-open' : ''}">
        ${navRoutes
          .map(
            (r) => `
          <a href="${r.path}" data-link
             class="tsr-header__link${activePath === r.path ? ' is-active' : ''}">
            ${r.label}
          </a>`,
          )
          .join('')}
      </nav>

      <button class="tsr-header__theme" type="button" aria-label="Toggle theme">
        ${theme === 'dark' ? '☀' : '☾'}
      </button>
    </div>
  </header>
  <style>
    .tsr-header {
      background: var(--tsr-surface);
      border-bottom: 1px solid var(--tsr-border);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .tsr-header__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      height: 64px;
    }
    .tsr-header__brand { color: var(--tsr-fg); font-size: 1.1rem; }
    .tsr-header__nav {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .tsr-header__link { color: var(--tsr-fg); font-weight: 500; }
    .tsr-header__link.is-active { color: var(--tsr-accent); }
    .tsr-header__theme,
    .tsr-header__toggle {
      background: transparent;
      border: 1px solid var(--tsr-border);
      color: var(--tsr-fg);
      cursor: pointer;
    }
    .tsr-header__theme {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .tsr-header__toggle {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: 6px;
      padding: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .tsr-header__toggle span {
      display: block;
      width: 18px;
      height: 2px;
      background: var(--tsr-fg);
      border-radius: 1px;
    }

    @media (max-width: 720px) {
      .tsr-header__toggle { display: inline-flex; order: 2; }
      .tsr-header__theme { order: 3; }
      .tsr-header__nav {
        order: 4;
        flex-basis: 100%;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.75rem 0 1rem;
        border-top: 1px solid var(--tsr-border);
        display: none;
      }
      .tsr-header__nav.is-open { display: flex; }
      .tsr-header__inner { flex-wrap: wrap; height: auto; padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .tsr-header__brand { order: 1; }
    }
  </style>
`;

export class TsrHeader extends HTMLElement {
  connectedCallback() {
    this._menuOpen = false;
    this.render();
    window.addEventListener('popstate', this._onNav);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onNav);
  }

  _onNav = () => {
    this._menuOpen = false;
    this.render();
  };

  _onClick = (e) => {
    if (e.target.closest('.tsr-header__theme')) {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      root.classList.add('is-theme-transitioning');
      root.setAttribute('data-theme', next);
      localStorage.setItem('tsr-theme', next);

      clearTimeout(this._themeTimer);
      this._themeTimer = setTimeout(() => {
        root.classList.remove('is-theme-transitioning');
      }, 3000);

      this.render();
      return;
    }

    if (e.target.closest('.tsr-header__toggle')) {
      this._menuOpen = !this._menuOpen;
      this.render();
      return;
    }

    if (e.target.closest('.tsr-header__link')) {
      this._menuOpen = false;
    }
  };

  render() {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
    this.innerHTML = renderHeader({
      activePath: window.location.pathname,
      theme,
      menuOpen: this._menuOpen,
    });
  }
}

customElements.define('tsr-header', TsrHeader);
