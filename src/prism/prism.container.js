import './prism.pres.js';

const loadPrismProps = async () => ({
  eyebrow: 'New — now in early access',
  headline: 'Prism — wirelessly share content to any TV',
  subhead:
    'Prism wirelessly splits your set-top boxes across your TSR receivers, then adds your own scoreboards, menu boards, and promos — no new cable box, no wiring to each screen, all run from a phone.',
  primaryCta: { label: 'Book a demo', cta: 'prism_hero_book_demo', href: '#prism-inquiry' },
  heroMock: 'night',
  showcase: {
    title: 'What’s on the beams tonight',
    intro:
      'A beam is one picture Prism shares wirelessly. Point any TV at any beam — and a beam does not have to be a set-top box.',
    rows: [
      {
        mock: 'scoreboard',
        title: 'Trivia night scoreboard',
        body: 'Your announcer keeps score from a phone and the TVs follow along. No laptop, no cable to the wall, no spreadsheet on a projector.',
        points: [
          'Enter each round on a phone — totals and standings update themselves',
          'A secure announcer-only sign-in — your host scores the night and can touch nothing else in your venue',
          'Drum roll screen to build the moment, with your own message',
          'Winner screen with falling confetti when you finalize',
          'Long team list? It pages through in slides, or scrolls',
        ],
      },
      {
        mock: 'menu',
        title: 'Menu and tap list boards',
        body: 'Turn any TV into a menu board or a tap list in your own colors. Kick a keg or change a special from a phone and the screens update — no USB sticks, no ladder.',
        points: [
          'Name, style, ABV, size, and price on every line',
          'Several pages that rotate on a timer you set',
          'Different boards in different parts of the venue',
        ],
      },
      {
        mocks: [
          { mock: 'split2', caption: 'Two-up: your banner on top, scores underneath' },
          { mock: 'split4', caption: 'Four-up' },
        ],
        title: 'Split screen',
        body: 'Put up to four sources on one TV. A big screen can carry what used to take four.',
        points: [
          'Two or four sources on a single TV',
          'Each source labeled so guests know what they are watching',
          'On a two-up, your own banner above and a score ticker below',
          'Tap which source has the sound, right from a phone',
        ],
      },
      {
        mocks: [
          {
            mock: 'ads',
            caption: 'Alongside what is on: a side panel and ticker that rotate your promos',
          },
          {
            mock: 'rotator',
            caption: 'On a beam of its own: full-screen specials, Monday to Sunday',
          },
        ],
        title: 'In-house promos',
        body: 'Promote your own specials on your own screens. Feature happy hour in the bar and brunch on the patio, and drop in a scannable QR code so guests jump straight to the offer, your menu, or an order.',
        points: [
          'Rotate your promos on a beam of their own',
          'Or run them alongside what is already on the TV',
          'A different promo for every section',
        ],
      },
    ],
  },
  features: [
    {
      title: 'One input, any screen',
      body: 'If it plugs into a TV, Prism can share it — wirelessly, to any TV with a TSR receiver.',
    },
    {
      title: 'Different content by section',
      body: 'Run several beams at once and put something different in each area of the venue, all from the same Prism unit.',
    },
    {
      title: 'Shared over your TSR network',
      body: 'Prism shares each source wirelessly across the customized TSR network we build for your venue — router and APs included — so any TV with a TSR receiver shows it, no coax and no cable box wired to the set.',
    },
    {
      title: 'Add a TV anywhere — even a roving one',
      body: 'Need another screen, or a portable TV you can roll anywhere? Just attach another TSR receiver and it joins the lineup. No cable runs.',
    },
    {
      title: 'Special Events',
      badge: 'Coming soon',
      body: 'Hosting a wedding, party, or private event? Rent Prism to put your own content on any screen, with no permanent install and no cable runs.',
      action: { label: 'Contact Us', href: '/contact', cta: 'prism_special_events_contact' },
    },
  ],
  control: {
    mock: 'now',
    title: 'Run it all from a phone',
    body: 'See what every beam is showing at a glance, move a TV from one beam to another, and change a board or a score without leaving the floor.',
  },
  earlyAccess: {
    title: 'Why early access',
    body: 'Prism has come through packed-house nights and a full trivia night at our first venue, and performed. We are rolling it out to a small number of venues at a time so every install gets a custom-built TSR network and hands-on tuning. Book a demo and we will walk your space, confirm fit, and get you in line.',
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
