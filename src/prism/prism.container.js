import './prism.pres.js';

const loadPrismProps = async () => ({
  eyebrow: 'New — now in early access',
  headline: 'Prism — wireless live sports on every TV',
  subhead:
    'Prism beams live games over your venue’s network straight to your TSR receivers — no new cable box, no wiring to each screen. Put the same game on every TV, or give every section its own.',
  primaryCta: { label: 'Book a demo', cta: 'prism_hero_book_demo', href: '#prism-inquiry' },
  features: [
    {
      title: 'In-house ads on every beam',
      body: 'Promote your own specials right alongside the game — feature a happy-hour deal on one beam and a different one on another, and drop in a scannable QR code so patrons can jump straight to the offer, your menu, or an order.',
    },
    {
      title: 'Different games by section',
      body: 'Run several beams at once and place a different game in each area of the venue, all from the same Prism unit.',
    },
    {
      title: 'Beams over your TSR network',
      body: 'Prism beams each game wirelessly across the customized TSR network we build for your venue — router and APs included — so any TV with a TSR receiver shows it, no coax and no cable box wired to the set.',
    },
    {
      title: 'Add a TV anywhere — even a roving one',
      body: 'Need another screen, or a portable TV you can roll anywhere? Just attach another TSR receiver and it joins the lineup. No cable runs.',
    },
    {
      title: 'Special Events',
      badge: 'Coming soon',
      body: 'Hosting a wedding, party, or private event? Rent Prism to put the big game — or your own custom content — on every screen, with no permanent install and no cable runs. Beam it wirelessly to as many TVs as your space needs.',
      action: { label: 'Contact Us', href: '/contact', cta: 'prism_special_events_contact' },
    },
  ],
  earlyAccess: {
    title: 'Why early access',
    body: 'Prism just came through its first packed-house game night and performed. We are rolling it out to a small number of venues at a time so every install gets a custom-built TSR network and hands-on tuning. Book a demo and we will walk your space, confirm fit, and get you in line.',
    points: [
      'We pre-check your venue to customize the TSR network — router and APs included',
      'Hands-on setup and tuning for your layout',
      'Early venues help shape the product as it grows',
    ],
  },
  inquiryPrompt:
    'Tell us about your venue — how many TVs, your TV provider (DirecTV, cable, etc.), how many provider boxes, and what you want to show on them.',
});

export class TsrPrism extends HTMLElement {
  async connectedCallback() {
    const props = await loadPrismProps();
    const el = document.createElement('tsr-prism-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-prism', TsrPrism);
