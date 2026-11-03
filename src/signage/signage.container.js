import './signage.pres.js';

const IMG = '/assets';

// Same wording as the signage email (_scripts/email-build-2026-10-23.js), which links here
// so readers whose mail app blocks images can still see the boards. Only this page's intro
// mentions Prism, as an optional step up rather than something to avoid.
const loadSignageProps = async () => ({
  eyebrow: 'Now included with TSR',
  headline: 'Menus, specials & trivia boards',
  intro:
    'TSR receivers now show custom boards created in the new app & sent to a TV the same way you pick a channel.',
  introPrism: {
    before: 'Your receivers handle this on their own, and ',
    after: ' adds even more when you want it.',
  },
  primaryCta: { label: 'Steps to Set Up', href: '/contact', cta: 'signage_steps' },
  // /text is its own document on the server, not a page of this app, so it is a full page load.
  textCta: { label: 'Text to Get Started', href: '/text', cta: 'signage_text' },
  boards: [
    {
      img: `${IMG}/signage/menu-drinks-1.webp`,
      width: 1280,
      height: 720,
      alt: 'A drinks board on a TV, turning from draft beers to wines and N/A beers',
      // Both pages were drawn by the PWA's drawMenuPage
      // (pwa/src/location/banner-template.js) with made-up names.
      nextPage: `${IMG}/signage/menu-drinks-2.webp`,
      title: 'Menu and tap list boards',
      body: 'In your own colors. Kick a keg or change a special from a phone and the TVs update in seconds.',
    },
    {
      img: `${IMG}/prism/trivia-1.webp`,
      width: 1280,
      height: 720,
      alt: 'A trivia night scoreboard on a TV',
      // trivia-question.webp was drawn by the PWA's drawTriviaQuestion
      // (pwa/src/location/banner-template.js), a timed question with made-up details.
      cycle: {
        question: `${IMG}/signage/trivia-question.webp`,
        winner: `${IMG}/prism/winner.webp`,
        confetti: `${IMG}/prism/confetti.webp`,
      },
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
  stepUp: {
    titleBefore: 'Go prime time with ',
    sections: [
      {
        title: 'One source, many TVs',
        body: ' wirelessly shares a media source to any TV with a TSR receiver. No new wiring required.',
        cta: 'signage_step_up_sources',
      },
      {
        title: 'Guest sharing for parties, anniversaries & meetings',
        body: 'Say yes when guests ask to put up the slide show. They share from a laptop, with no cables or adapters.',
      },
    ],
    button: { label: 'See what Prism adds', cta: 'signage_step_up' },
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
