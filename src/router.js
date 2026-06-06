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
    path: '/products',
    tag: 'tsr-products',
    label: 'Products',
    title: 'Products — Receivers, Brackets & TV Control',
    description:
      'TSR receivers, DirecTV H24/H25 brackets, and Motorola cable box brackets. Buy hardware outright or pair with the TSR service for full channel control at your venue.',
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
    description:
      'Get in touch about TSR for your bar or restaurant — demos, pricing, and support.',
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
