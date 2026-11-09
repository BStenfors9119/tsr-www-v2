const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const renderStat = ({ value, label }) => `
  <div class="progress-stat"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`;

const renderTag = (tags, key) =>
  `<span class="progress-tag progress-tag--${key}">${escapeHtml(tags[key])}</span>`;

const renderItem = (tags) => ([tag, title, body]) => `
  <article class="progress-item">
    ${renderTag(tags, tag)}
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </article>`;

// Closed panel: month, theme and a ✓ pill per item header. Open panel: the full cards.
const renderMonth = (tags) => ({ id, name, subtitle, theme, items }) => `
  <section class="progress-month" id="progress-${id}">
    <details>
      <summary>
        <h2>${escapeHtml(name)} <small>${escapeHtml(subtitle)}</small><span class="progress-count">${items.length} items</span></h2>
        <p class="progress-theme">${escapeHtml(theme)}</p>
        <ul class="progress-achieved">${items.map(([, title]) => `<li>${escapeHtml(title)}</li>`).join('')}</ul>
      </summary>
      <div class="progress-items">${items.map(renderItem(tags)).join('')}</div>
    </details>
  </section>`;

export const renderProgress = ({ eyebrow, headline, intro, stats, tags, months, footnote }) => `
  <section class="progress-hero">
    <div class="tsr-container">
      <p class="progress-hero__eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(headline)}</h1>
      <p class="progress-hero__intro">${escapeHtml(intro)}</p>
      <div class="progress-stats">${stats.map(renderStat).join('')}</div>
    </div>
  </section>

  <nav class="progress-nav" aria-label="Months">
    <div class="tsr-container progress-nav__inner">
      ${months.map(({ id, name }) => `<a href="#progress-${id}" data-month="${id}">${escapeHtml(name.split(' ')[0])}</a>`).join('')}
      <span class="progress-nav__toggle">
        <button type="button" data-open="1">Expand all</button>
        <button type="button" data-open="0">Collapse all</button>
      </span>
    </div>
  </nav>

  <section class="progress-section">
    <div class="tsr-container">
      <div class="progress-legend">${Object.keys(tags).map((k) => renderTag(tags, k)).join('')}</div>
      ${months.map(renderMonth(tags)).join('')}
      <p class="progress-footnote">${escapeHtml(footnote)}</p>
    </div>
  </section>

  <style>
    .progress-hero {
      padding: 3.5rem 0;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
    }
    .progress-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #86efac;
    }
    .progress-hero h1 { margin: 0 0 1rem; font-size: clamp(2rem, 4vw, 3rem); color: #fff; }
    .progress-hero__intro { max-width: 720px; margin: 0; font-size: 1.125rem; color: #dcebe2; }
    .progress-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 0.75rem;
      margin-top: 2rem;
    }
    .progress-stat {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(134, 239, 172, 0.25);
      border-radius: 12px;
      padding: 1rem;
    }
    .progress-stat b { display: block; font-size: 1.75rem; line-height: 1.1; color: #86efac; }
    .progress-stat span { font-size: 0.875rem; color: #dcebe2; }

    .progress-nav {
      position: sticky;
      top: 0;
      z-index: 5;
      background: var(--tsr-bg);
      border-bottom: 1px solid var(--tsr-border);
      padding: 0.6rem 0;
    }
    .progress-nav__inner { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
    .progress-nav a,
    .progress-nav button {
      font: inherit;
      font-size: 0.875rem;
      color: var(--tsr-fg);
      text-decoration: none;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 999px;
      padding: 0.35rem 0.8rem;
      cursor: pointer;
    }
    .progress-nav button { background: transparent; color: var(--tsr-muted); }
    .progress-nav a:hover,
    .progress-nav button:hover { border-color: var(--tsr-accent); color: var(--tsr-accent); }
    .progress-nav__toggle { margin-left: auto; display: flex; gap: 0.5rem; }

    .progress-section { padding: 2rem 0 1rem; }
    .progress-legend { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .progress-month { margin-top: 1rem; scroll-margin-top: 4rem; }
    .progress-month details {
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 14px;
    }
    .progress-month summary {
      list-style: none;
      cursor: pointer;
      padding: 1.25rem 1.4rem;
      border-radius: 14px;
    }
    .progress-month summary::-webkit-details-marker { display: none; }
    .progress-month summary:focus-visible { outline: 2px solid var(--tsr-accent); outline-offset: 2px; }
    .progress-month details[open] > summary {
      border-bottom: 1px solid var(--tsr-border);
      border-radius: 14px 14px 0 0;
    }
    .progress-month h2 {
      margin: 0 0 0.25rem;
      font-size: 1.6rem;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .progress-month h2::before {
      content: '\\25B8';
      color: var(--tsr-accent);
      font-size: 1.2rem;
      display: inline-block;
      transition: transform 0.15s ease;
    }
    .progress-month details[open] h2::before { transform: rotate(90deg); }
    .progress-month h2 small { font-size: 0.875rem; font-weight: 400; color: var(--tsr-muted); }
    .progress-count {
      margin-left: auto;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--tsr-accent);
      border: 1px solid var(--tsr-accent);
      border-radius: 999px;
      padding: 0.1rem 0.6rem;
    }
    .progress-theme { margin: 0; color: var(--tsr-muted); }
    .progress-achieved {
      list-style: none;
      margin: 0.9rem 0 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem 0.5rem;
    }
    .progress-achieved li {
      font-size: 0.8rem;
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-radius: 999px;
      padding: 0.2rem 0.65rem 0.2rem 0.5rem;
    }
    .progress-achieved li::before { content: '\\2713'; color: var(--tsr-accent); font-weight: 700; margin-right: 0.4rem; }
    .progress-month details[open] .progress-achieved { display: none; }

    .progress-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.9rem;
      padding: 1.25rem 1.4rem 1.4rem;
    }
    .progress-item {
      background: var(--tsr-bg);
      border: 1px solid var(--tsr-border);
      border-left: 3px solid var(--tsr-accent);
      border-radius: 10px;
      padding: 1rem 1.1rem;
    }
    .progress-item h3 { margin: 0 0 0.4rem; font-size: 1.05rem; line-height: 1.3; }
    .progress-item p { margin: 0; font-size: 0.95rem; color: var(--tsr-muted); }

    .progress-tag {
      --tag: var(--tsr-muted);
      display: inline-block;
      margin-bottom: 0.5rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      color: var(--tag);
      border: 1px solid color-mix(in srgb, var(--tag) 45%, transparent);
    }
    .progress-legend .progress-tag { margin-bottom: 0; }
    .progress-tag--app { --tag: var(--tsr-accent); }
    .progress-tag--rx { --tag: #3b82f6; }
    .progress-tag--prism,
    .progress-tag--signage { --tag: #a855f7; }
    .progress-tag--cloud { --tag: #ec4899; }
    .progress-tag--web,
    .progress-tag--admin { --tag: #14b8a6; }
    .progress-tag--sp { --tag: #f59e0b; }

    .progress-footnote { margin: 2.5rem 0 0; font-size: 0.875rem; color: var(--tsr-muted); }

    @media (max-width: 900px) {
      .progress-hero { padding: 2.5rem 0; }
      .progress-nav__toggle { margin-left: 0; }
      .progress-items { padding: 1rem; }
    }
  </style>
`;

export class TsrProgressPres extends HTMLElement {
  set props(value) {
    this._props = value;
    this._render();
  }

  get props() {
    return this._props;
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (!this._props) return;
    this.innerHTML = renderProgress(this._props);
    this._wire();
  }

  openMonth(id) {
    const section = this.querySelector(`#progress-${id}`);
    if (!section) return;
    section.querySelector('details').open = true;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Month links scroll in place instead of changing the URL hash: a hash change fires
  // popstate, and the app shell re-renders on popstate, which would close every panel.
  _wire() {
    const panels = () => this.querySelectorAll('.progress-month details');
    this.querySelectorAll('.progress-nav a[data-month]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.openMonth(a.dataset.month);
      });
    });
    this.querySelectorAll('.progress-nav button[data-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.dataset.open === '1';
        panels().forEach((d) => {
          d.open = open;
        });
      });
    });
  }
}

customElements.define('tsr-progress-pres', TsrProgressPres);
