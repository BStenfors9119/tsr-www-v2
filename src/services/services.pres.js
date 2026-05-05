export const renderServices = ({ items }) => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem;">
    <h1>Services</h1>
    <p>Installation, training, and support to get your venue running smoothly.</p>
    <ul class="services__list">
      ${items
        .map(
          (s) => `
        <li class="service">
          <h3>${s.name}</h3>
          <p>${s.description}</p>
          <strong>${s.price}</strong>
        </li>`,
        )
        .join('')}
    </ul>

    <h2>Inquire about a service</h2>
    <tsr-inquiry-form prompt="Tell us about your venue" submit-label="Send inquiry"></tsr-inquiry-form>
  </section>
  <style>
    .services__list { list-style: none; padding: 0; display: grid; gap: 1rem; }
    .service { padding: 1rem; border: 1px solid var(--tsr-border); border-radius: var(--tsr-radius); background: var(--tsr-surface); }
  </style>
`;

export class TsrServicesPres extends HTMLElement {
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
    this.innerHTML = renderServices(this._props);
  }
}

customElements.define('tsr-services-pres', TsrServicesPres);
