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
        'Verify each receiver has a power adapter and IR emitter cable.',
      ],
      note: 'Missing anything? Email support@thesportsremote.com before proceeding.',
    },
    {
      title: 'Mount and power the receiver',
      video: null,
      instructions: [
        'Mount the receiver near the cable box (within 3 ft).',
        'Connect the IR emitter cable to the front of the cable box, aligned with its IR sensor.',
        'Plug the receiver into power.',
      ],
    },
    {
      title: 'Connect to Wi-Fi',
      video: null,
      instructions: [
        'Open the TSR mobile app and create an account or log in.',
        'Tap "Add receiver" and follow the on-screen pairing flow.',
        'Choose your venue Wi-Fi network and enter the password.',
      ],
    },
    {
      title: 'Pair to a TV',
      video: null,
      instructions: [
        'In the app, tap the new receiver and choose "Pair TV".',
        'Select the cable box model from the list.',
        'Test by changing the channel from the app.',
      ],
      note: 'Repeat this step for each TV / cable box you want to control.',
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
