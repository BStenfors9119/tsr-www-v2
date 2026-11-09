export const routes = [
  {
    path: '/',
    tag: 'tsr-home',
    label: 'Home',
    title: 'TV Channel Control for Sports Bars',
    description:
      'The Sports Remote (TSR) — TV and channel control for sports bars. Works with DirecTV and cable boxes, one box per TV, no cable runs. Schedule games, group TVs, and change channels from your phone.',
  },
  {
    path: '/free-channel-sheets',
    tag: 'tsr-game-sheets',
    label: 'Channel Sheets',
    title: 'Free Printable Channel Sheets for Sports Bars',
    description:
      'Print a free daily channel sheet for your sports bar — every game on today with the exact channel numbers for your venue’s DirecTV or cable lineup. Pick the packages you carry so only your channels show. No hardware, no credit card; the same TSR app changes the channels when you’re ready.',
  },
  {
    path: '/products',
    tag: 'tsr-products',
    label: 'Products',
    title: 'Products — Receivers, Brackets & TV Control',
    description:
      'TSR receivers, DirecTV H24/H25 brackets, and Motorola cable box brackets. Buy hardware outright or pair with the TSR service for full channel control at your venue.',
  },
  {
    path: '/prism',
    tag: 'tsr-prism',
    label: 'Prism',
    title: 'Prism — Wirelessly Share Content to Any TV',
    description:
      'Prism wirelessly splits your set-top boxes across your TSR receivers and adds trivia scoreboards, menu boards, and split screens — no extra cable box per TV. Now in early access; book a demo for your bar or restaurant.',
  },
  {
    // Landing page for the signage email; linked from there, not from the site's nav.
    path: '/signage',
    tag: 'tsr-signage',
    label: 'Signage',
    hidden: true,
    title: 'Menus, Specials & Trivia Boards on Your TVs',
    description:
      'TSR receivers now show custom menu, specials and trivia boards created in the new TSR app and sent to a TV the same way you pick a channel.',
  },
  {
    // Linked from the voice email and listed in the sitemap, but not in the site's nav.
    path: '/voice-control',
    tag: 'tsr-voice-control',
    label: 'Voice Control',
    hidden: true,
    title: 'Voice Control for Sports Bar TVs: TSR Whisper',
    description:
      'TSR Whisper is voice control for the TVs in your sports bar or restaurant. Change channels, set schedules and book games by voice in the TSR app. Now in beta for TSR venues.',
  },
  {
    path: '/services',
    tag: 'tsr-services',
    label: 'Services',
    title: 'Services — Channel Scheduling & TV Management',
    description:
      'Game scheduling, TV grouping, and mobile channel control for sports bars and restaurants — powered by the TSR receiver on your existing cable boxes.',
  },
  {
    path: '/progress',
    tag: 'tsr-progress',
    label: 'Progress',
    title: 'Progress: What’s New at The Sports Remote',
    description:
      'Everything shipped at The Sports Remote since April 2026, month by month: the TSR PWA app, receivers, Prism, signage, voice control, energy savings and more.',
  },
  {
    path: '/about',
    tag: 'tsr-about',
    label: 'About Us',
    title: 'About The Sports Remote',
    description:
      'The Sports Remote builds TV control for sports bars — built to handle venues with DirecTV or cable boxes at every TV.',
  },
  {
    path: '/contact',
    tag: 'tsr-contact',
    label: 'Contact Us',
    title: 'Contact The Sports Remote',
    description: 'Get in touch about TSR for your bar or restaurant — demos, pricing, and support.',
  },
  { path: '/login', tag: 'tsr-login', label: 'Login' },
  {
    path: '/install',
    tag: 'tsr-install',
    label: 'Install',
    hidden: false,
    title: 'TSR Installation Guide — Set Up in Minutes',
    description:
      'Step-by-step TSR install guide with videos: bracket the cable box, plug in the receiver, done. No cable runs — everything stays at the TV.',
  },
];

export const navRoutes = routes.filter((r) => !r.hidden);

export const matchRoute = (pathname) => {
  return routes.find((r) => r.path === pathname) ?? routes[0];
};

export const navigate = (pathname) => {
  if (window.location.pathname === pathname) return;
  window.history.pushState({}, '', pathname);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const onRouteChange = (handler) => {
  window.addEventListener('popstate', handler);
  return () => window.removeEventListener('popstate', handler);
};
