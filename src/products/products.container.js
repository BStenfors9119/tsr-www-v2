import './products.pres.js';

// Stripe Payment Links — create each link in the Stripe dashboard
// (Products → Payment Links) and paste the URL here.
const STRIPE_PAYMENT_LINKS = {
  bracketH24: 'https://buy.stripe.com/cNi8wP0gCeImchP0gC6Zy04',
  bracketH25: 'https://buy.stripe.com/9B6bJ13sOfMqa9H4wS6Zy03',
  bracketMotorola: 'https://buy.stripe.com/5kQaEX0gC1VA4Pn1kG6Zy05',
  tsrReceiver: 'https://buy.stripe.com/dRm28re7s2ZEbdLbZk6Zy02',
};

const loadProducts = async () => ({
  prism: {
    eyebrow: 'New — now in early access',
    name: 'Prism',
    description:
      'Beam live games wirelessly over your venue’s network to your TSR receivers — the same game on every screen or a different game per section, with no new cable box wired to each TV. Add a screen, even a roving one, by attaching another receiver. Now rolling out to select venues.',
    ctaLabel: 'Learn about Prism',
    href: '/prism',
    cta: 'products_prism_learn',
  },
  package: {
    name: 'The Starting Lineup',
    description:
      'Everything you need to put TSR in your venue — receivers on your existing cable boxes, a dedicated router, and the mobile app for your whole staff.',
    includes: [
      {
        item: 'TSR Receivers',
        price: '$5 / receiver / month',
        detail: 'e.g. 20 cable boxes = $100 / month total',
      },
      {
        item: 'Router',
        price: 'one-time $500 fee',
        detail: 'dedicated network for your receivers',
      },
      {
        item: 'TSR Mobile app',
        price: 'free',
        detail: 'iOS and Android — any staff member can change a channel from their phone',
      },
    ],
  },
  hardware: [
    {
      name: 'H24 Bracket',
      description:
        'Mounting bracket for the DirecTV H24 receiver — installs on or around the TV so the box stays right where the TV is. No cable runs needed.',
      price: '$34.99',
      buyUrl: STRIPE_PAYMENT_LINKS.bracketH24,
    },
    {
      name: 'H25 Bracket',
      description:
        'Mounting bracket for the DirecTV H25 receiver — installs on or around the TV so the box stays right where the TV is. No cable runs needed.',
      price: '$27.99',
      buyUrl: STRIPE_PAYMENT_LINKS.bracketH25,
    },
    {
      name: 'Motorola Arris Bracket',
      description:
        'Mounting bracket for Motorola Arris cable boxes — easy installation on or around the TV, keeping every cable contained to the TV area.',
      price: '$19.99',
      buyUrl: STRIPE_PAYMENT_LINKS.bracketMotorola,
    },
    {
      name: 'TSR Receiver (hardware)',
      description:
        'A replacement or standalone TSR receiver. Includes the receiver with IR emitter, power cable, and HDMI cable.',
      price: '$75',
      buyUrl: STRIPE_PAYMENT_LINKS.tsrReceiver,
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
