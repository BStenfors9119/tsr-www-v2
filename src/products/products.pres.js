export const renderProducts = ({ items }) => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem;">
    <h1>Products</h1>
    <p>Hardware and software that powers TV control at your venue.</p>
    <div class="products__grid">
      ${items
        .map(
          (p) => `
        <article class="product">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <strong>${p.price}</strong>
          ${p.example ? `<p class="product__example">${p.example}</p>` : ''}
        </article>`,
        )
        .join('')}
    </div>

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
    }
    .product__example {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
      color: var(--tsr-muted);
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
