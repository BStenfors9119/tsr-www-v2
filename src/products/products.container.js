import './products.pres.js';

const loadProducts = async () => ({
  items: [
    {
      name: 'TSR Receiver',
      description: 'IR transmitter that pairs with your existing TVs and cable boxes.',
      price: '$5 / receiver / month',
      example: 'e.g. 20 cable boxes = $100 / month total',
    },
    {
      name: 'TSR Mobile',
      description: 'iOS and Android app so any staff member can change a channel from their phone.',
      price: 'Free with subscription',
    },
  ],
});

export class TsrProducts extends HTMLElement {
  async connectedCallback() {
    const props = await loadProducts();
    const el = document.createElement('tsr-products-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-products', TsrProducts);
