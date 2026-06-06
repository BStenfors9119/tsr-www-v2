import './install.pres.js';

const loadInstall = async () => ({
  intro:
    'Welcome to TSR! Follow the steps below to get your receivers paired with your TVs and cable boxes. Each step has a short walkthrough video and a checklist.',
  steps: [
    {
      title: 'Unbox and inventory',
      video: null,
      instructions: [
        'Confirm you received one TSR Receiver per cable box.',
        'Verify each receiver has a power adapter.',
      ],
      note: 'Missing anything? Email support@thesportsremote.com before proceeding.',
    },
    {
      title: 'Plugging the Ubiquiti Dream Router 7 into power and internet',
      video: null,
      image: {
        src: '/assets/install-videos/ubiquiti-networks-dream-router-7.webp',
        alt: 'Ubiquiti Dream Router 7 — front view on the left shows the LCM display; back view on the right shows the network ports and power input',
        caption: 'Click the image to enlarge. The numbered squares match the steps below.',
        hotspots: [
          {
            number: 1,
            label: 'Plug in the ethernet (WAN) cable',
            x: 58,
            y: 55.5,
            width: 12,
            height: 6.5,
          },
          {
            number: 2,
            label: 'Plug in the power cord',
            x: 58,
            y: 63.5,
            width: 12,
            height: 6.5,
          },
          {
            number: 3,
            label: 'Check the screen to verify the router lit up',
            x: 23.5,
            y: 44.5,
            width: 14,
            height: 12,
          },
        ],
      },
      shortInstructions: [
        'Plug an ethernet cable into the 2.5 GbE WAN port on the back, and run the other end to your existing internet router or network switch.',
        'Plug the white power cord into the back of the router, then into a wall outlet.',
        'Check the little screen on the front of the router — within a minute or two it should light up and show a status display, which means the router is on and online.',
      ],
      instructions: [
        'Find the Ubiquiti Dream Router 7 — a tubular device about the size of a 2 litre bottle of soda, with a tiny screen on the front.',
        'Plug it in for power: take the included white power cord (one end is a small standard two-pronged wall plug; the other end has two small holes). Line those two holes up with the two small metal prongs sticking out of the back of the Dream Router and push the cable straight on until it seats. Then plug the two-pronged end into a wall outlet. The screen on the front should light up within a few seconds.',
        'Plug it in for internet: on the back of the router, find the port labeled "WAN" (sometimes "Internet", or shown with a small globe icon). It is usually the leftmost network port and may be a different color than the ones next to it.',
        'Take the ethernet cable that came with the router. It looks like a thick phone cord with a clear plastic clip on each end.',
        'Push one end of the ethernet cable firmly into the WAN port until you hear a soft click.',
        'Run the other end of the cable to your existing internet router or network switch — that is the device your internet provider gave you, or the one all the other internet cables in the building plug into. Push the cable into any open numbered port (often labeled "LAN 1", "LAN 2", etc., or just "1", "2", "3", "4") until it clicks.',
        'Wait about a minute. The screen on the Dream Router will go through a startup sequence. Once it shows a steady status display (instead of "Booting…"), the router is online and ready for the rest of the install.',
      ],
      note: 'If the screen never lights up, double-check both ends of the power cord. If the screen comes on but the router says "no internet", make sure the ethernet cable clicked into place on both ends, or try a different port on the upstream router/switch.',
    },
    {
      title: 'Inserting your cable box into the TSR bracket',
      video: '/assets/install-videos/installing-cable-box.mp4',
      instructions: [
        'Slide the front of the cable box in so it sits flush against the TSR receiver.',
        'Using your thumbs, push the back braces outward — as shown in the video — to let the cable box drop into place.',
        'If the cable box doesn\'t drop in on its own, push it in until it seats.',
        'Verify the cable box is secure by pushing the back braces back into place.',
      ],
    },
    {
      title: 'Plugging the TSR receiver into power',
      optional: true,
      video: '/assets/install-videos/PXL_20260509_191955343.TS.mp4',
      visuals: ['usb-a'],
      instructions: [
        'Turn the cable box around (or look behind it) so you can see its back panel — that\'s the side where all of its cables already plug in.',
        'On the back panel, look for a small rectangular slot about the size of a thumbnail, with the letters "USB" printed in tiny text next to it. Most cable boxes have one or two of these.',
        'The TSR receiver has a cable coming out of it with a flat, silver, rectangular metal tip on the end — that tip is called a "USB-A" connector.',
        'Slide the flat metal tip straight into the cable box\'s USB slot. It only fits one way — if it does not slide in smoothly, flip the connector over (rotate it half a turn) and try again. Do not force it.',
        'Ignore the round, oval, or many-pin connectors on the back of the cable box — those are for cable TV, audio, or HDMI, not for USB.',
        'Once it is plugged in, a small red light on the TSR receiver should come on, meaning it is now getting power from the cable box.',
      ],
      note: 'If the red light does not come on, gently wiggle the connector to make sure it is fully seated. Still nothing? Try the cable box\'s other USB slot if it has one, or call your installer.',
    },
    {
      title: 'If the Raspberry Pi receiver becomes unplugged',
      optional: true,
      video: '/assets/install-videos/PXL_20260509_192106580.TS.mp4',
      visuals: ['pi-zero-edge'],
      instructions: [
        'Find the Raspberry Pi receiver — it\'s the small green board (about the size of a stick of gum) inside the TSR case.',
        'Look at the long edge of the board where cables plug in. You\'ll see three ports along that edge.',
        'The biggest one — a wide, flat slot — is the mini-HDMI port. That one is for video, NOT for power. Do not plug your power cable into it.',
        'The other two ports are small, identical-looking rectangles called "micro USB." One is for power, the other is for accessories.',
        'Plug the power cable into the micro-USB slot that is FARTHEST from the mini-HDMI port — it\'s the one closest to the corner of the board, on the same side as the small memory-card slot. (If you look very closely you may see the letters "PWR IN" printed next to it.)',
        'If you accidentally plug into the middle micro-USB slot, the receiver will not turn on. Just unplug and move the cable to the correct slot.',
        'Plug the other end of the cable into a wall outlet (or back into the same power strip the receiver was using before).',
        'Wait a few seconds. A small red light should come on inside the case — that means the receiver is getting power. Give it about a minute to fully start up, then try the TSR app again.',
      ],
      note: 'Only needed if the receiver lost power and has to be plugged back in. If the red light does not come on after a minute, call your installer.',
    },
  ],
});

export class TsrInstall extends HTMLElement {
  async connectedCallback() {
    const props = await loadInstall();
    const el = document.createElement('tsr-install-pres');
    el.props = props;
    this.replaceChildren(el);
  }
}

customElements.define('tsr-install', TsrInstall);
