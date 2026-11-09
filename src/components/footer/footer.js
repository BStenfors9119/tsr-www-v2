import { routes } from '../../router.js';
import { progressMonthLinks } from '../../progress/progress.container.js';

// Footer columns mirror the header nav, grouped. Labels come from the routes so the two stay
// in sync; list paths here, not labels. Progress lists its months, each opening that panel.
const linkFor = (path) => {
  const route = routes.find((r) => r.path === path);
  return { label: route.label, href: route.path };
};

// Product pages still in beta get an "In beta" badge next to the link.
const BETA = new Set(['/prism', '/voice-control']);
// Footer-only label overrides (the header nav keeps the route's own label).
const FOOTER_LABELS = { '/products': 'Hardware' };
const productLink = (path) => ({
  ...linkFor(path),
  ...(FOOTER_LABELS[path] && { label: FOOTER_LABELS[path] }),
  beta: BETA.has(path),
});

const columns = [
  {
    title: 'Product',
    links: ['/products', '/prism', '/signage', '/voice-control', '/services'].map(productLink),
  },
  { title: 'Resources', links: ['/free-channel-sheets', '/install'].map(linkFor) },
  { title: 'Company', links: ['/', '/about', '/contact', '/login'].map(linkFor) },
  { title: 'Progress', href: '/progress', links: progressMonthLinks },
];

const renderColumn = ({ title, href, links }) => `
  <nav class="tsr-footer__col" aria-label="${title}">
    <h2 class="tsr-footer__heading">${href ? `<a href="${href}" data-link>${title}</a>` : title}</h2>
    <ul>${links
      .map(
        ({ label, href: to, beta }) =>
          `<li><a href="${to}" data-link>${label}</a>${beta ? '<span class="tsr-footer__badge">In beta</span>' : ''}</li>`,
      )
      .join('')}</ul>
  </nav>`;

const renderFooter = () => `
  <footer class="tsr-footer">
    <div class="tsr-container tsr-footer__inner">
      ${columns.map(renderColumn).join('')}
      <div class="tsr-footer__col tsr-footer__company">
        <strong>The Sports Remote</strong>
        <p class="tsr-footer__muted">TV management system for hospitality.</p>
        <p class="tsr-footer__muted">A SodaPop Systems LLC product.</p>
      </div>
    </div>
    <div class="tsr-footer__bar">
      © ${new Date().getFullYear()} SodaPop Systems LLC
    </div>
  </footer>
  <style>
    .tsr-footer {
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      margin-top: 3rem;
    }
    .tsr-footer__inner {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(0, 1.5fr);
      gap: 2rem;
      padding: 2.5rem 1.25rem;
    }
    .tsr-footer__heading {
      margin: 0 0 0.75rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tsr-fg);
    }
    .tsr-footer__heading a { color: inherit; text-decoration: none; }
    .tsr-footer__col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.45rem; }
    .tsr-footer__col li a { color: var(--tsr-muted); text-decoration: none; font-size: 0.925rem; }
    .tsr-footer__col a:hover { color: var(--tsr-accent); }
    .tsr-footer__badge {
      margin-left: 0.4rem;
      padding: 0.05rem 0.45rem;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      vertical-align: middle;
      white-space: nowrap;
      color: var(--tsr-accent);
      border: 1px solid var(--tsr-accent);
      border-radius: 999px;
    }
    .tsr-footer__muted { color: var(--tsr-muted); margin: 0.25rem 0 0; font-size: 0.925rem; }
    .tsr-footer__bar {
      text-align: center;
      padding: 1rem;
      color: var(--tsr-muted);
      border-top: 1px solid var(--tsr-border);
      font-size: 0.875rem;
    }
    @media (max-width: 900px) {
      .tsr-footer__inner { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .tsr-footer__company { grid-column: 1 / -1; }
    }
  </style>
`;

export class TsrFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = renderFooter();
  }
}

customElements.define('tsr-footer', TsrFooter);
