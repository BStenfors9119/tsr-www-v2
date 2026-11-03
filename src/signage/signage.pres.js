const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const renderBoard = ({ img, width, height, alt, title, body }) => `
  <article class="signage-board">
    <img src="${img}" width="${width}" height="${height}" alt="${escapeHtml(alt)}">
    <div class="signage-board__copy">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
    </div>
  </article>`;

export const renderSignage = ({ eyebrow, headline, intro, primaryCta, textCta, boards, closing, prism }) => `
  <section class="signage-hero">
    <div class="tsr-container">
      <p class="signage-hero__eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(headline)}</h1>
      <p class="signage-hero__intro">${escapeHtml(intro)}</p>
      <div class="signage-hero__actions">
        <a href="${primaryCta.href}" data-link data-cta="${primaryCta.cta}" class="tsr-button">${escapeHtml(primaryCta.label)}</a>
        <a href="${textCta.href}" data-cta="${textCta.cta}" class="signage-hero__text">${escapeHtml(textCta.label)}</a>
      </div>
    </div>
  </section>

  <section class="signage-boards">
    <div class="tsr-container">
      <div class="signage-boards__grid">
        ${boards.map(renderBoard).join('')}
      </div>
      <p class="signage-closing">${escapeHtml(closing)}</p>
      <p class="signage-closing">${escapeHtml(prism.before)}<a href="${prism.href}" data-link data-cta="${prism.cta}">${escapeHtml(prism.label)}</a>${escapeHtml(prism.after)}</p>
    </div>
  </section>

  <style>
    .signage-hero {
      padding: 3.5rem 0;
      background: linear-gradient(135deg, #042316 0%, #0c3622 60%, #1c4a33 100%);
      color: #fff;
    }
    .signage-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #86efac;
    }
    .signage-hero h1 {
      margin: 0 0 1rem;
      font-size: clamp(2rem, 4vw, 3rem);
      color: #fff;
    }
    .signage-hero__intro {
      max-width: 640px;
      margin: 0 0 1.75rem;
      font-size: 1.125rem;
      color: #dcebe2;
    }
    .signage-hero__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem 1.5rem;
    }
    .signage-hero__text {
      color: #86efac;
      font-weight: 700;
      text-decoration: underline;
    }
    .signage-boards { padding: 3rem 0; }
    .signage-boards__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 700px) {
      .signage-hero { padding: 2.5rem 0; }
      .signage-boards { padding: 2rem 0; }
      .signage-boards__grid { grid-template-columns: minmax(0, 1fr); }
    }
    .signage-board {
      overflow: hidden;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: 12px;
    }
    .signage-board img { display: block; width: 100%; height: auto; }
    .signage-board__copy { padding: 1rem 1.25rem 1.25rem; }
    .signage-board h2 { margin: 0 0 0.4rem; font-size: 1.15rem; }
    .signage-board p { margin: 0; color: var(--tsr-muted); }
    .signage-closing { margin: 0 0 0.75rem; max-width: 720px; color: var(--tsr-muted); }
  </style>
`;

export class TsrSignagePres extends HTMLElement {
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
    this.innerHTML = renderSignage(this._props);
  }
}

customElements.define('tsr-signage-pres', TsrSignagePres);
