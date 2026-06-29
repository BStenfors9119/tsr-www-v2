const renderBuyAction = (p) =>
  p.buyUrl
    ? `<a class="tsr-button product__buy"
         href="${p.buyUrl}"
         target="_blank"
         rel="noopener"
         data-cta="buy_${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}">Buy now — ${p.price}</a>`
    : `<p class="product__example">Available soon — use the inquiry form below to order.</p>`;

export const renderProducts = ({ prism, package: pkg, hardware }) => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem;">
    <h1>Products</h1>
    <p>Hardware and software that powers TV control at your venue.</p>
    ${
      prism
        ? `
    <article class="product product--prism">
      ${prism.eyebrow ? `<p class="product__eyebrow">${prism.eyebrow}</p>` : ''}
      <h3>${prism.name}</h3>
      <p>${prism.description}</p>
      <div class="product__action">
        <a class="tsr-button" href="${prism.href}" data-link data-cta="${prism.cta}">${prism.ctaLabel}</a>
      </div>
    </article>`
        : ''
    }
    ${
      pkg
        ? `
    <article class="product product--package">
      <h3>${pkg.name}</h3>
      <p>${pkg.description}</p>
      <ul class="package__includes">
        ${pkg.includes
          .map(
            (line) => `
          <li>
            <strong>${line.item}</strong> — ${line.price}
            ${line.detail ? `<span class="product__example">${line.detail}</span>` : ''}
          </li>`,
          )
          .join('')}
      </ul>
      <div class="product__action package__action">
        <tsr-venue-request label="Request The Starting Lineup"></tsr-venue-request>
      </div>
    </article>`
        : ''
    }

    ${
      hardware && hardware.length
        ? `
    <h2 style="margin-top:2.5rem;">Buy hardware outright</h2>
    <p>Need a replacement part, or want the gear without the service? Order directly below.</p>
    <div class="products__grid">
      ${hardware
        .map(
          (p) => `
        <article class="product">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="product__action">${renderBuyAction(p)}</div>
        </article>`,
        )
        .join('')}
    </div>`
        : ''
    }

    <h2 style="margin-top:2.5rem;">Interested in a product?</h2>
    <tsr-inquiry-form prompt="Which product are you interested in?" submit-label="Send inquiry"></tsr-inquiry-form>
  </section>
  <style>
    .products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;
    }
    .product {
      padding: 1.25rem;
      border: 1px solid var(--tsr-border);
      border-radius: var(--tsr-radius);
      background: var(--tsr-surface);
      display: flex;
      flex-direction: column;
    }
    .product__example {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
      color: var(--tsr-muted);
    }
    .product__action {
      margin-top: auto;
      padding-top: 0.75rem;
    }
    .product__buy {
      display: block;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
    }
    .product--prism {
      margin-top: 1.5rem;
      border-color: var(--tsr-accent, #2563eb);
      border-width: 2px;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--tsr-accent, #2563eb) 8%, var(--tsr-surface)),
        var(--tsr-surface)
      );
    }
    .product--prism h3 { font-size: 1.35rem; }
    .product__eyebrow {
      margin: 0 0 0.35rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tsr-accent, #2563eb);
    }
    .product--package {
      margin-top: 1.5rem;
      border-color: var(--tsr-accent, #2563eb);
    }
    .product--package h3 { font-size: 1.35rem; }
    .package__includes {
      margin: 1rem 0 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.75rem;
    }
    .package__includes .product__example {
      display: block;
      margin-top: 0.15rem;
    }
    .package__action {
      margin-top: 1.5rem;
    }
  </style>
`;

export class TsrProductsPres extends HTMLElement {
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
    this.innerHTML = renderProducts(this._props);
  }
}

customElements.define('tsr-products-pres', TsrProductsPres);
