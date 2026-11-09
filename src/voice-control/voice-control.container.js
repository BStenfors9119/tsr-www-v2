import './voice-control.pres.js';

const IMG = '/assets/voice-control';

// The voice email (_scripts/email-build-2026-10-23.js) links here, and this page is in the
// sitemap, so it also has to make sense to someone who is not a TSR client yet.
// App labels below (Voice, Voice Control, Siri & Apple Watch) must match the PWA's
// (pwa/src/voice/siri-setup.card.js, android-voice.card.js).
const loadVoiceControlProps = async () => ({
  eyebrow: 'New at TSR · now in beta testing',
  headline: 'TSR Whisper: voice control for your TVs',
  intro:
    'Tap the voice button in the TSR app and say what you want. No scrolling through channels or hunting for the right TV in the middle of a rush.',
  primaryCta: { label: 'Request activation', href: '/contact', cta: 'voice_request' },
  setupLink: { label: 'See the setup steps', href: '#setup', cta: 'voice_setup' },
  examples: [
    {
      img: `${IMG}/tsr-voice-command.jpg`,
      alt: 'Saying ESPN on Bar 3 in the TSR app',
      title: 'Change TVs now',
      says: ['ESPN on Bar 3', 'Channel 206 on the patio', 'Turn off all TVs'],
      body: 'You see what it heard before anything changes.',
    },
    {
      img: `${IMG}/tsr-voice-schedule.jpg`,
      alt: 'A schedule created by voice',
      title: 'Schedule it out loud',
      says: ['Every Saturday at 11 turn on the patio', 'At 2 AM turn off all TVs'],
      body: 'Check the summary, then tap Schedule.',
    },
    {
      img: `${IMG}/tsr-voice-game.jpg`,
      alt: 'A game booked by team name',
      title: 'Book games by team name',
      says: ['Put the Lakers game on Bar 3'],
      body: 'TSR finds the game and your channel. Schedule it, or tap Change Now if it’s on.',
    },
  ],
  control:
    'Staff stay in control. A command for one named TV goes through after a two-second pause, and anything bigger, like all TVs, a group or a schedule, waits for a tap. Power and schedules are limited to managers.',
  activation: {
    title: 'Activating TSR Whisper',
    // "BETA feature" and the last sentence are drawn bold and green (see the pres).
    notice: {
      before: 'TSR Whisper is a ',
      strong: 'BETA feature',
      after: ', available to current TSR venues and provided as is. It may not perform as intended, and commands may produce unexpected results, including changes to your TVs, channels or schedules. ',
      end: 'Use during the BETA is at your own discretion.',
    },
    steps: [
      { title: 'Ask us to turn it on.', text: 'Tell us who at your venue should have it.' },
      {
        title: 'Open the TSR app.',
        bullets: [
          'Find it under Remote › TSR Actions › Voice.',
          'Or add a floating button in Profile › Voice Control.',
        ],
      },
    ],
  },
  // Quick steps: one action per numbered step. A step is a list of parts: plain text,
  // { ui } (something to tap, shown bold) or { say } (words to speak, shown as a quote).
  setup: {
    title: 'Setup by device',
    devices: [
      {
        title: 'iPhone or iPad',
        lead: 'At your venue, on its Wi-Fi.',
        start: 'In your Profile',
        steps: [
          ['Open', { ui: 'Voice Control' }],
          ['Tap', { ui: 'Siri & Apple Watch' }],
          ['Tap', { ui: 'Get the TSR shortcut' }],
          ['Paste your voice key when the shortcut asks.'],
          ['Say', { say: 'Hey Siri, TSR' }, 'then', { say: 'Set up TVs' }],
          ['Tap', { ui: 'Always Allow' }, 'for each TV.'],
        ],
        note: 'Your voice key is shown only once. Lost it? Make a new one in the same place.',
      },
      {
        // NOT yet confirmed on a real watch: check these steps, and whether the iPhone must be
        // nearby or on venue Wi-Fi (_specs/VOICE_SHORTCUT_SPEC.md "capabilities to verify").
        title: 'Apple Watch',
        lead: 'Set up the iPhone first.',
        steps: [
          ['Open the Shortcuts app on your iPhone.'],
          ['Turn on', { ui: 'Show on Apple Watch' }, 'for TSR.'],
          ['On your watch, say', { say: 'Hey Siri, TSR' }],
        ],
        // Apple's standard way to put a shortcut on a face (watchOS 7+); faces with no
        // complication spots can't hold it.
        extra: {
          title: 'Add it to your watch face',
          steps: [
            ['Touch and hold the face.'],
            ['Tap', { ui: 'Edit' }],
            ['Swipe to', { ui: 'Complications' }],
            ['Tap a spot.'],
            ['Tap', { ui: 'Shortcuts' }],
            ['Tap', { ui: 'TSR' }],
          ],
          note: 'Then one tap on the face starts TSR, no Siri needed.',
        },
      },
      {
        title: 'Android',
        lead: 'In Chrome.',
        steps: [
          ['Open TSR.'],
          ['Tap', { ui: '⋮' }, '(menu).'],
          ['Tap', { ui: 'Install app' }],
          ['Touch and hold the TSR icon.'],
          ['Tap', { ui: 'Voice' }],
          ['Tap', { ui: 'Allow' }, 'for the microphone.'],
        ],
        note: 'Tip: drag Voice to your home screen for a one-tap mic. “Hey Google” can’t start TSR, because Google doesn’t let web apps take voice commands.',
      },
    ],
  },
  newToTsr: {
    title: 'New to TSR?',
    body: 'TSR Whisper runs on a full TSR system, even during the beta. TSR gives your venue TV and channel control from a phone, with a receiver at each TV and no cable runs.',
    link: { label: 'See what TSR includes', href: '/products', cta: 'voice_new_products' },
  },
});

export class TsrVoiceControl extends HTMLElement {
  async connectedCallback() {
    const props = await loadVoiceControlProps();
    const el = document.createElement('tsr-voice-control-pres');
    el.props = props;
    this.replaceChildren(el);
    // The page draws after load, so the browser can't jump to /voice-control#setup by itself.
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }
}

customElements.define('tsr-voice-control', TsrVoiceControl);
