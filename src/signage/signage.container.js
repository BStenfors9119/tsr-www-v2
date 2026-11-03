import './signage.pres.js';

const IMG = '/assets';

// Same wording as the signage email (_scripts/email-build-2026-10-23.js), which links here
// so readers whose mail app blocks images can still see the boards.
const loadSignageProps = async () => ({
  eyebrow: 'Now included with TSR',
  headline: 'Menus, specials & trivia boards',
  intro:
    'TSR receivers now show custom boards created in the new app & sent to a TV the same way you pick a channel.',
  primaryCta: { label: 'Steps to Set Up', href: '/contact', cta: 'signage_steps' },
  // /text is its own document on the server, not a page of this app, so it is a full page load.
  textCta: { label: 'Text to Get Started', href: '/text', cta: 'signage_text' },
  boards: [
    {
      img: `${IMG}/prism/menu-1.webp`,
      width: 1280,
      height: 720,
      alt: 'A tap list board on a TV',
      title: 'Menu and tap list boards',
      body: 'In your own colors. Kick a keg or change a special from a phone and the TVs update in seconds.',
    },
    {
      img: `${IMG}/prism/trivia-1.webp`,
      width: 1280,
      height: 720,
      alt: 'A trivia night scoreboard on a TV',
      title: 'Trivia scoreboard',
      body: 'Your host keeps score from a phone, with an on-screen countdown for timed questions.',
    },
    {
      img: `${IMG}/signage/tsr-signage-specials.gif`,
      width: 480,
      height: 270,
      alt: 'Daily specials rotating on a TV with a score ticker below',
      title: 'Your own specials',
      body: 'Rotate your daily specials on a TV of their own, with a score ticker below.',
    },
    {
      img: `${IMG}/signage/tsr-signage-remote.jpg`,
      width: 1280,
      height: 720,
      alt: 'Choosing a board in the TSR app Remote',
      title: 'Picked from the Remote',
      body: 'Remote › Signage lists your boards. Choose one, choose the TVs, done. When a scheduled game comes on, the schedule takes the TV back.',
    },
  ],
  closing: 'Any board can also carry a live scores ticker along the bottom. Boards come with your TSR receivers.',
  prism: {
    before: 'Want a board and the game on the same screen, or one source shared across many TVs? That’s what ',
    label: 'Prism',
    href: '/prism',
    cta: 'signage_prism',
    after: ' is for.',
  },
});

export class TsrSignage extends HTMLElement {
  async connectedCallback() {
    const props = await loadSignageProps();
    const el = document.createElement('tsr-signage-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-signage', TsrSignage);
