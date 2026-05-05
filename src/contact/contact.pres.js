export const renderContact = () => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem;">
    <h1>Contact us</h1>
    <tsr-inquiry-form prompt="How can we help?" submit-label="Send message"></tsr-inquiry-form>
  </section>
`;

export class TsrContactPres extends HTMLElement {
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
    this.innerHTML = renderContact();
  }
}

customElements.define('tsr-contact-pres', TsrContactPres);
