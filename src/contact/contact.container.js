import './contact.pres.js';

export class TsrContact extends HTMLElement {
  connectedCallback() {
    const el = document.createElement('tsr-contact-pres');
    el.props = {};
    this.replaceChildren(el);
  }
}

customElements.define('tsr-contact', TsrContact);
