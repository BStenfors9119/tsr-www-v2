export const renderAbout = ({ mission }) => `
  <section class="tsr-container" style="padding:2.5rem 1.25rem;">
    <h1>About TSR</h1>

    <h2>Our mission</h2>
    <p>${mission}</p>
  </section>
`;

export class TsrAboutPres extends HTMLElement {
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
    this.innerHTML = renderAbout(this._props);
  }
}

customElements.define('tsr-about-pres', TsrAboutPres);
