const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const ctaAttrs = (cta) =>
  `href="${cta.href}" data-cta="${cta.cta}"${cta.external ? ' target="_blank" rel="noopener"' : ' data-link'}`;

export const renderGameSheets = ({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  reassurance,
  howItWorks,
  features,
  packages,
  upsell,
  closing,
}) => `
  <section class="gs-hero">
    <div class="tsr-container gs-hero__inner">
      ${eyebrow ? `<p class="gs-hero__eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
      <h1>${escapeHtml(headline)}</h1>
      <p class="gs-hero__sub">${escapeHtml(subhead)}</p>
      <div class="gs-hero__ctas">
        ${primaryCta ? `<a ${ctaAttrs(primaryCta)} class="tsr-button">${escapeHtml(primaryCta.label)}</a>` : ''}
        ${secondaryCta ? `<a ${ctaAttrs(secondaryCta)} class="gs-button-ghost">${escapeHtml(secondaryCta.label)}</a>` : ''}
      </div>
      ${reassurance ? `<p class="gs-hero__reassurance">${escapeHtml(reassurance)}</p>` : ''}
    </div>
  </section>

  ${
    howItWorks
      ? `
  <section class="gs-how" id="gs-how">
    <div class="tsr-container">
      <h2>${escapeHtml(howItWorks.title)}</h2>
      ${howItWorks.intro ? `<p class="gs-how__intro">${escapeHtml(howItWorks.intro)}</p>` : ''}
      <ol class="gs-how__steps">
        ${howItWorks.steps
          .map(
            (s, i) => `
          <li class="gs-how__step">
            <span class="gs-how__num" aria-hidden="true">${i + 1}</span>
            <div class="gs-how__copy">
              <h3>${escapeHtml(s.title)}</h3>
              <p>${escapeHtml(s.body)}</p>
            </div>
          </li>`,
          )
          .join('')}
      </ol>
      ${
        howItWorks.cta
          ? `<a ${ctaAttrs(howItWorks.cta)} class="tsr-button gs-how__cta">${escapeHtml(howItWorks.cta.label)}</a>`
          : ''
      }
    </div>
  </section>`
      : ''
  }

  ${
    features && features.length
      ? `
  <section class="gs-features">
    <div class="tsr-container">
      <h2>What you get on the sheet</h2>
      <div class="gs-features__grid">
        ${features
          .map(
            (f) => `
          <div class="gs-feature">
            <h3>${escapeHtml(f.title)}</h3>
            <p>${escapeHtml(f.body)}</p>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  ${
    packages
      ? `
  <section class="gs-packages">
    <div class="tsr-container gs-packages__inner">
      <div class="gs-packages__copy">
        <h2>${escapeHtml(packages.title)}</h2>
        <p>${escapeHtml(packages.body)}</p>
      </div>
      ${
        packages.points && packages.points.length
          ? `<ul class="gs-packages__points">${packages.points
              .map((p) => `<li>${escapeHtml(p)}</li>`)
              .join('')}</ul>`
          : ''
      }
    </div>
  </section>`
      : ''
  }

  ${
    upsell
      ? `
  <section class="gs-upsell">
    <div class="tsr-container">
      <p class="gs-upsell__eyebrow">${escapeHtml(upsell.eyebrow)}</p>
      <h2>${escapeHtml(upsell.title)}</h2>
      <p class="gs-upsell__body">${escapeHtml(upsell.body)}</p>
    </div>
  </section>`
      : ''
  }

  ${
    closing
      ? `
  <section class="gs-closing">
    <div class="tsr-container gs-closing__inner">
      <h2>${escapeHtml(closing.title)}</h2>
      <p>${escapeHtml(closing.body)}</p>
      ${closing.cta ? `<a ${ctaAttrs(closing.cta)} class="tsr-button">${escapeHtml(closing.cta.label)}</a>` : ''}
    </div>
  </section>`
      : ''
  }

  <style>
    .gs-hero {
      padding: 5rem 0;
      background: linear-gradient(90deg, #052e1a 0%, #0c3622 45%, #166534 110%);
      color: #fff;
      border-bottom: 1px solid var(--tsr-border);
    }
    .gs-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #bbf7d0;
    }
    .gs-hero h1 {
      font-size: clamp(2rem, 4vw, 3.25rem);
      margin: 0 0 1rem;
      color: #fff;
      max-width: 720px;
    }
    .gs-hero__sub {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 640px;
      margin: 0 0 1.75rem;
    }
    .gs-hero__ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    .gs-button-ghost {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: var(--tsr-radius);
      color: #fff;
      font-weight: 600;
    }
    .gs-button-ghost:hover { border-color: #fff; color: #fff; }
    .gs-hero__reassurance {
      margin: 1.1rem 0 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .gs-how { padding: 3rem 0; }
    .gs-how h2 { margin: 0 0 0.5rem; }
    .gs-how__intro { margin: 0 0 1.75rem; color: var(--tsr-muted); max-width: 640px; }
    .gs-how__steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .gs-how__step { display: flex; gap: 1rem; align-items: flex-start; }
    .gs-how__num {
      flex: 0 0 auto;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: var(--tsr-accent);
      color: #27272a;
      font-weight: 700;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .gs-how__copy h3 { margin: 0 0 0.35rem; }
    .gs-how__copy p { margin: 0; color: var(--tsr-muted); }
    .gs-how__cta { margin-top: 2rem; }

    .gs-features { padding: 3rem 0; }
    .gs-features h2 { margin: 0 0 1.5rem; }
    .gs-features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .gs-feature {
      padding: 1.25rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .gs-feature h3 { margin: 0 0 0.5rem; }
    .gs-feature p { margin: 0; color: var(--tsr-muted); }

    .gs-packages {
      padding: 3rem 0;
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      border-bottom: 1px solid var(--tsr-border);
    }
    .gs-packages__inner {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    @media (max-width: 760px) {
      .gs-packages__inner { grid-template-columns: 1fr; gap: 1.5rem; }
    }
    .gs-packages__copy h2 { margin: 0 0 0.75rem; }
    .gs-packages__copy p { margin: 0; color: var(--tsr-muted); }
    .gs-packages__points {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.6rem;
    }

    .gs-upsell { padding: 3rem 0; }
    .gs-upsell__eyebrow {
      margin: 0 0 0.4rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tsr-accent);
    }
    .gs-upsell h2 { margin: 0 0 0.75rem; max-width: 720px; }
    .gs-upsell__body { margin: 0; color: var(--tsr-muted); max-width: 720px; }

    .gs-closing {
      padding: 3.5rem 0;
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      text-align: center;
    }
    .gs-closing__inner h2 { margin: 0 0 0.75rem; }
    .gs-closing__inner p { margin: 0 0 1.5rem; color: var(--tsr-muted); }
  </style>
`;

export class TsrGameSheetsPres extends HTMLElement {
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
    this.innerHTML = renderGameSheets(this._props);
  }
}

customElements.define('tsr-game-sheets-pres', TsrGameSheetsPres);
