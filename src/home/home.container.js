import './home.pres.js';
import testimonials from './testimonials.json';

const humanize = (filename) =>
  filename
    .replace(/\.[^.]+$/, '')
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

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
      return { name: humanize(filename), logo: ctx(key) };
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
  ],
  clients: loadClientLogos(),
  installSpotlight: {
    title: 'Installed in minutes, not days',
    body: 'Adding TSR to your bar or restaurant is simple: snap the cable box into the TSR bracket, plug in the receiver, and you’re done. No cable runs, no rewiring — every cable stays right at the TV and cable box. Perfect for DirecTV and sports bars with a cable box at every TV.',
    points: [
      'No cable runs — all cables stay at the TV/cable box area',
      'Brackets mount the cable box on or around the TV',
      'Works with your existing DirecTV or cable boxes',
    ],
    video: '/assets/install-videos/installing-cable-box.mp4',
    videoLabel: 'Inserting a cable box into the TSR bracket',
    ctaPrimary: { label: 'See the full install guide', href: '/install' },
    ctaSecondary: { label: 'Shop hardware', href: '/products' },
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
