import './home.pres.js';
import testimonials from './testimonials.json';

const humanize = (filename) =>
  filename
    .replace(/\.[^.]+$/, '')
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// Exact display/alt-text names keyed by base filename, for cases where the
// humanized filename gets the casing wrong (e.g. acronyms like "BBQ").
const CLIENT_LOGO_NAMES = {
  'jane-bond-bbq': 'Jane Bond BBQ',
};

// Optional outbound links keyed by base filename — the logo becomes a link to
// the client's website when present.
const CLIENT_LOGO_URLS = {
  'jane-bond-bbq': 'https://janebondbbq.com',
  'knotty-barrel-pq': 'https://www.knottybarrelpq.com',
  'players-in-san-marcos': 'https://sanmarcos.playerssportsbar.com',
  'players-kearny-mesa': 'https://kearnymesa.playerssportsbar.com',
  'poway-social-house': 'https://powaysocialhouse.com',
};

const loadClientLogos = () => {
  const ctx = import.meta.webpackContext('../../assets/client-logos', {
    recursive: false,
    regExp: /\.(png|jpe?g|svg|webp)$/i,
  });
  return ctx
    .keys()
    .sort()
    .map((key) => {
      const filename = key.replace(/^\.\//, '');
      const base = filename.replace(/\.[^.]+$/, '');
      return {
        name: CLIENT_LOGO_NAMES[base] ?? humanize(filename),
        logo: ctx(key),
        href: CLIENT_LOGO_URLS[base],
      };
    });
};

// Captions keyed by screenshot base filename. Any file dropped into
// assets/pwa-screenshots/ is picked up automatically (sorted by filename —
// prefix with 01-, 02-, … to control order); unknown names fall back to a
// humanized version of the filename.
const SCREENSHOT_CAPTIONS = {
  remote: 'Change channels, sources, and power from any device',
  location: 'Group every TV in the venue and control them together',
  automation: 'Schedule games ahead of time so nothing gets missed',
};

const loadPwaScreenshots = () => {
  const ctx = import.meta.webpackContext('../../assets/pwa-screenshots', {
    recursive: false,
    regExp: /\.(png|jpe?g|webp|gif)$/i,
  });
  return ctx
    .keys()
    .sort()
    .map((key) => {
      const filename = key.replace(/^\.\//, '');
      const base = filename.replace(/\.[^.]+$/, '').replace(/^\d+[-_]/, '');
      // Raw device screenshot names (Screenshot_2026..., IMG_..., etc.) make
      // useless captions, so leave them blank unless mapped above.
      const isRawCapture = /^(screenshot|img|photo|pxl)[-_ ]?\d/i.test(base);
      return {
        src: ctx(key),
        label: SCREENSHOT_CAPTIONS[base] ?? (isRawCapture ? '' : humanize(filename)),
      };
    });
};

const loadHomeProps = async () => ({
  headline: 'Change the channel. Faster.',
  subhead:
    'TSR is a TV channel control system built for sports bars and venues — it works with your existing DirecTV and cable boxes to schedule games, group TVs, and switch between events in seconds.',
  ctaLabel: 'See products',
  heroImage: '/assets/small-bar.jpg',
  testimonials,
  features: [
    {
      title: 'Group your TVs',
      body: 'Organize TVs by section or screen so the right game lands on the right wall.',
    },
    {
      title: 'Schedule games',
      body: 'Build a lineup ahead of time — TSR pulls schedules so nothing gets missed.',
    },
    {
      title: 'Mobile control',
      body: 'Your whole staff can change channels from their phones, no IR remote needed.',
    },
    {
      title: 'Printable channel guide',
      body: 'See what’s playing today on DirecTV at a glance — a printable, up-to-the-day guide you can post behind the bar or at the host stand. Available free at tsr.SodaPopSystems.com.',
    },
  ],
  clients: loadClientLogos(),
  prismTeaser: {
    eyebrow: 'New — now in early access',
    title: 'Meet Prism — wireless live sports on every TV',
    body: 'Beam live games over your venue’s network straight to your TSR receivers — no new cable box, no wiring to each screen. Put one game on every TV or a different game in every section, and add another screen — even a roving one — by attaching one more receiver. Now rolling out to select venues.',
    ctaLabel: 'Learn about Prism',
    href: '/prism',
  },
  snapTeaser: {
    eyebrow: 'New',
    title: 'Snap ’n Sync — point, shoot, sync every TV',
    body: 'See a game you want on the wall? Snap a photo of any TV in your venue and TSR recognizes the matchup, finds the exact channel for your lineup, and syncs it to your other screens in seconds — no channel numbers to look up, no remote required.',
    steps: [
      'Snap a photo of the TV showing the game you want',
      'TSR identifies the matchup and your channel automatically',
      'Sync that game to the rest of your TVs in one tap',
    ],
    ctaLabel: 'Try it in the app',
    href: 'https://tsr.sodapopsystems.com',
  },
  spotlight: {
    ariaLabel: 'What TSR can do',
    tabs: [
      {
        label: 'Easy Installs',
        title: 'Installed in minutes, not days',
        body: 'Adding TSR to your bar or restaurant is simple: snap the cable box into the TSR bracket, plug in the receiver, and you’re done. No cable runs, no rewiring — every cable stays right at the TV and cable box. Perfect for DirecTV and sports bars with a cable box at every TV.',
        points: [
          'No cable runs — all cables stay at the TV/cable box area',
          'Brackets mount the cable box on or around the TV',
          'Works with your existing DirecTV or cable boxes',
        ],
        media: {
          type: 'video',
          src: '/assets/install-videos/installing-cable-box.mp4',
          label: 'Inserting a cable box into the TSR bracket',
        },
        actions: [
          {
            label: 'See the full install guide',
            href: '/install',
            cta: 'home_install_guide',
          },
          { label: 'Shop hardware', href: '/products', cta: 'home_shop_hardware' },
        ],
      },
      {
        label: 'Powerful Control',
        title: 'Control every TV from one screen',
        body: 'Once it’s installed, the TSR app puts your whole venue at your fingertips: group TVs by section, schedule games ahead of time, and switch channels in seconds — from any phone, tablet, or browser. The same app your staff uses, ready to try right now.',
        points: [
          'Group TVs by section and control them together',
          'Schedule games ahead so nothing gets missed',
          'Change channels from any device — no IR remote needed',
        ],
        media: {
          gallery: loadPwaScreenshots(),
        },
        actions: [
          {
            label: 'Launch the TSR app',
            href: 'https://tsr.sodapopsystems.com',
            cta: 'home_spotlight_try_pwa',
            external: true,
          },
          { label: 'See products', href: '/products', cta: 'home_spotlight_products' },
        ],
      },
    ],
  },
  pwaCallout: {
    eyebrow: 'See it in action',
    title: 'Try the TSR app yourself',
    body: 'Take the same web app your staff uses for a spin — group TVs, schedule games, and change channels right from your browser. No download required.',
    ctaLabel: 'Launch the TSR app',
    href: 'https://tsr.sodapopsystems.com',
  },
});

export class TsrHome extends HTMLElement {
  async connectedCallback() {
    const props = await loadHomeProps();
    const el = document.createElement('tsr-home-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-home', TsrHome);
