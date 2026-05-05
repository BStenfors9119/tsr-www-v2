import './services.pres.js';

const loadServices = async () => ({
  items: [
    {
      name: 'On-site installation',
      description: 'A TSR technician installs and configures your hub and TVs in person.',
      price: 'Quoted per venue',
    },
    {
      name: 'Staff training',
      description: 'Hands-on session covering channel changes, scheduling, and TV groups.',
      price: 'From $250',
    },
    {
      name: 'Priority support',
      description: '24/7 support coverage for game-day issues.',
      price: 'From $50/mo',
    },
  ],
});

export class TsrServices extends HTMLElement {
  async connectedCallback() {
    const props = await loadServices();
    const el = document.createElement('tsr-services-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-services', TsrServices);
