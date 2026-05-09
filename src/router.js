export const routes = [
  { path: '/', tag: 'tsr-home', label: 'Home' },
  { path: '/products', tag: 'tsr-products', label: 'Products' },
  { path: '/services', tag: 'tsr-services', label: 'Services' },
  { path: '/about', tag: 'tsr-about', label: 'About Us' },
  { path: '/contact', tag: 'tsr-contact', label: 'Contact Us' },
  { path: '/login', tag: 'tsr-login', label: 'Login' },
  { path: '/install', tag: 'tsr-install', label: 'Install', hidden: false },
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
