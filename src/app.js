import { matchRoute, onRouteChange } from './router.js';
import { trackEvent, trackPageView } from './lib/analytics.js';

const renderShell = (routeTag) => `
  <tsr-header></tsr-header>
  <main id="tsr-main">
    <${routeTag}></${routeTag}>
  </main>
  <tsr-footer></tsr-footer>
`;

const applyTheme = () => {
  const stored = localStorage.getItem('tsr-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
};

export class TsrApp extends HTMLElement {
  connectedCallback() {
    applyTheme();
    this.render();
    trackPageView(window.location.pathname);
    this._unsub = onRouteChange(() => {
      this.render();
      trackPageView(window.location.pathname);
    });

    document.addEventListener('click', (e) => {
      const cta = e.target.closest('[data-cta]');
      if (cta) {
        trackEvent('cta_click', {
          cta_id: cta.dataset.cta,
          cta_label: cta.textContent.trim(),
          destination: cta.getAttribute('href') ?? null,
        });
      }
      const footerLink = e.target.closest('.tsr-footer a[href]');
      if (footerLink) {
        trackEvent('footer_link_click', {
          href: footerLink.getAttribute('href'),
          label: footerLink.textContent.trim(),
        });
      }
      const link = e.target.closest('a[data-link]');
      if (!link) return;
      e.preventDefault();
      const href = link.getAttribute('href');
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  disconnectedCallback() {
    if (this._unsub) this._unsub();
  }

  render() {
    const route = matchRoute(window.location.pathname);
    this.innerHTML = renderShell(route.tag);
  }
}

customElements.define('tsr-app', TsrApp);
