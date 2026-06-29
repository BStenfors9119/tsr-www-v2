const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

export const renderPrism = ({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  features,
  earlyAccess,
  inquiryPrompt,
}) => `
  <section class="prism-hero">
    <div class="tsr-container prism-hero__inner">
      ${eyebrow ? `<p class="prism-hero__eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
      <h1>${escapeHtml(headline)}</h1>
      <p class="prism-hero__sub">${escapeHtml(subhead)}</p>
      ${
        primaryCta
          ? `<a href="${primaryCta.href}" data-cta="${primaryCta.cta}" class="tsr-button">${escapeHtml(primaryCta.label)}</a>`
          : ''
      }
    </div>
  </section>

  ${
    features && features.length
      ? `
  <section class="prism-features">
    <div class="tsr-container">
      <h2>What Prism does</h2>
      <div class="prism-features__grid">
        ${features
          .map(
            (f) => `
          <div class="prism-feature">
            <h3>${escapeHtml(f.title)}</h3>
            <p>${escapeHtml(f.body)}</p>
            ${
              f.action
                ? `<a href="${f.action.href}" data-link data-cta="${f.action.cta}" class="tsr-button prism-feature__cta">${escapeHtml(f.action.label)}</a>`
                : ''
            }
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  ${
    earlyAccess
      ? `
  <section class="prism-early">
    <div class="tsr-container prism-early__inner">
      <div class="prism-early__copy">
        <h2>${escapeHtml(earlyAccess.title)}</h2>
        <p>${escapeHtml(earlyAccess.body)}</p>
      </div>
      ${
        earlyAccess.points && earlyAccess.points.length
          ? `<ul class="prism-early__points">${earlyAccess.points
              .map((p) => `<li>${escapeHtml(p)}</li>`)
              .join('')}</ul>`
          : ''
      }
    </div>
  </section>`
      : ''
  }

  <section class="prism-inquiry" id="prism-inquiry">
    <div class="tsr-container">
      <h2>Book a Prism demo</h2>
      <p>Tell us about your venue and we will reach out to schedule a walkthrough. In-person demos are currently available in the San Diego and Los Angeles areas only — if you are outside that range, contact us and we will explore options for your venue.</p>
      <tsr-inquiry-form prompt="${escapeHtml(inquiryPrompt)}" submit-label="Request a demo"></tsr-inquiry-form>
    </div>
  </section>

  <style>
    .prism-hero {
      padding: 5rem 0;
      background: linear-gradient(90deg, #042316 0%, #0c3622 48%, #3f3f46 80%, #71717a 140%);
      color: #fff;
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-hero__eyebrow {
      margin: 0 0 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #d4d4d8;
    }
    .prism-hero h1 {
      font-size: clamp(2rem, 4vw, 3.25rem);
      margin: 0 0 1rem;
      color: #fff;
    }
    .prism-hero__sub {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 640px;
      margin: 0 0 1.75rem;
    }
    .prism-features { padding: 3rem 0; }
    .prism-features h2 { margin: 0 0 1.5rem; }
    .prism-features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .prism-feature {
      padding: 1.25rem;
      background: var(--tsr-surface);
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
    }
    .prism-feature h3 { margin: 0 0 0.5rem; }
    .prism-feature p { margin: 0; color: var(--tsr-muted); }
    .prism-feature__cta { margin-top: 1rem; }
    .prism-early {
      padding: 3rem 0;
      background: var(--tsr-surface);
      border-top: 1px solid var(--tsr-border);
      border-bottom: 1px solid var(--tsr-border);
    }
    .prism-early__inner {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    @media (max-width: 760px) {
      .prism-early__inner { grid-template-columns: 1fr; gap: 1.5rem; }
    }
    .prism-early__copy h2 { margin: 0 0 0.75rem; }
    .prism-early__copy p { margin: 0; color: var(--tsr-muted); }
    .prism-early__points {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.6rem;
    }
    .prism-inquiry { padding: 3rem 0; }
    .prism-inquiry h2 { margin: 0 0 0.5rem; }
    .prism-inquiry > .tsr-container > p { color: var(--tsr-muted); margin: 0 0 1.5rem; }
  </style>
`;

export class TsrPrismPres extends HTMLElement {
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
    this.innerHTML = renderPrism(this._props);
  }
}

customElements.define('tsr-prism-pres', TsrPrismPres);
