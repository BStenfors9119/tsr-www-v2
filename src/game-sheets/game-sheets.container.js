import './game-sheets.pres.js';

// Self-signup funnel — www teaser (Events-List Self-Signup Funnel, §6 "Surfaces").
// www markets the free game-sheet printing tool and DEEP-LINKS into the PWA, which
// hosts the actual OAuth → venue/lineup picker → print flow. See
// _specs/EVENTS_LIST_SELF_SIGNUP_FUNNEL_PLAN.md.
//
// PWA_SIGNUP_URL is the deep-link target. The PWA is hash-routed
// (pwa/src/router/view-store.js), so the signup view will live at #signup. That
// view is a LATER funnel step; until it ships the PWA loads its default view, so
// this link is safe to deploy now. Update the hash here if the view id differs.
const PWA_SIGNUP_URL = 'https://tsr.sodapopsystems.com/#signup';

const loadGameSheetsProps = async () => ({
  eyebrow: 'Free — no credit card, no hardware',
  headline: 'Print free channel sheets for your venue',
  subhead:
    'A customized, printable sheet of the exact channels for every game on today — built specifically for YOUR venue. Tape it behind the bar so anyone can find the game fast.',
  primaryCta: {
    label: 'Start printing free',
    cta: 'game_sheets_hero_start_free',
    href: PWA_SIGNUP_URL,
    external: true,
  },
  secondaryCta: {
    label: 'See how it works',
    cta: 'game_sheets_hero_how_it_works',
    href: '#gs-how',
  },
  reassurance: 'Works with your existing DirecTV or cable lineup. No TSR receiver required.',
  howItWorks: {
    title: 'How it works',
    intro:
      'From cold open to a printed sheet in a couple of minutes — no hardware, nothing to install.',
    steps: [
      {
        title: 'Tell us your venue',
        body: 'Sign in and enter your city and TV provider once. We map your DirecTV or cable lineup to the real channel numbers you actually get.',
      },
      {
        title: 'Pick your packages',
        body: 'Check off the TV packages you carry and the sheet filters to just your channels — or show everything; it’s your call, and you can change it any time.',
      },
      {
        title: 'Choose your lineup',
        body: 'Print every event on today, or build a customized “Starting Lineup” of just the matchups you want to feature — your marquee games for the day on one focused sheet.',
      },
      {
        title: 'Print today’s sheet',
        body: 'Print straight from your browser or save a PDF. Every game on today with your exact channel numbers — re-print any day in seconds.',
      },
    ],
    cta: {
      label: 'Start printing free',
      cta: 'game_sheets_how_start_free',
      href: PWA_SIGNUP_URL,
      external: true,
    },
  },
  features: [
    {
      title: 'Every game, today',
      body: 'Pro and college games across the major leagues, grouped by start time so the whole day is on one page.',
    },
    {
      title: 'Your venue’s channel numbers',
      body: 'Pick your city and TV provider once and the sheet prints the real channel numbers for your lineup — not a generic guide.',
    },
    {
      title: 'Print or PDF',
      body: 'Print straight from your browser or save a PDF to text to staff. Re-print any day in seconds.',
    },
    {
      title: 'More than one venue',
      body: 'Add as many venues as you run, free. Each gets its own lineup and its own sheet.',
    },
  ],
  packages: {
    title: 'See only the channels you actually carry',
    body: 'Pick the TV packages your venue subscribes to and the sheet defaults to just those channels — so nobody’s hunting for a game on a channel you don’t get. Want the full picture instead? Show everything; it’s your call, and you can change your packages any time.',
    points: [
      'Select your packages once — the sheet remembers them',
      'Games on packages you don’t carry drop off by default',
      'Flip back to “show all channels” whenever you want',
      'Same package controls a paying TSR venue uses',
    ],
  },
  upsell: {
    eyebrow: 'When you’re ready',
    title: 'The same app that prints the sheet can change the channels too',
    body: 'Channel sheets are the free way in. The TSR app you just signed up for is the same one our paying venues use to group their TVs and change channels from a phone — no walking up to each set with a remote. Print free for as long as you like; flip on full channel control whenever it makes sense for your bar.',
  },
  closing: {
    title: 'Start printing in a couple of minutes',
    body: 'Sign in, tell us your venue and lineup, and print today’s sheet. Free to start, nothing to install.',
    cta: {
      label: 'Start printing free',
      cta: 'game_sheets_closing_start_free',
      href: PWA_SIGNUP_URL,
      external: true,
    },
  },
});

export class TsrGameSheets extends HTMLElement {
  async connectedCallback() {
    const props = await loadGameSheetsProps();
    const el = document.createElement('tsr-game-sheets-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-game-sheets', TsrGameSheets);
