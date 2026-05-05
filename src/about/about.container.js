import './about.pres.js';

const loadAbout = async () => ({
  mission:
    'Make controlling TVs in sports venues effortless, so staff can focus on guests instead of remotes.',
});

export class TsrAbout extends HTMLElement {
  async connectedCallback() {
    const props = await loadAbout();
    const el = document.createElement('tsr-about-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-about', TsrAbout);
