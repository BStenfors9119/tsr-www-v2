const config = {
  apiKey: 'AIzaSyD-L0GwMa3C3PtpnAMneWp5fPMaNZwsrdE',
  authDomain: 'tsr-fb303.firebaseapp.com',
  projectId: 'tsr-fb303',
  storageBucket: 'tsr-fb303.firebasestorage.app',
  messagingSenderId: '406408554112',
  appId: '1:406408554112:web:df118a86ee8e97b29da865',
  measurementId: 'G-249L0L7PFS',
};

const isEnabled = () => process.env.NODE_ENV === 'production';

let analyticsPromise = null;
let logEventFn = null;

const init = () => {
  if (analyticsPromise) return analyticsPromise;
  if (!isEnabled()) {
    analyticsPromise = Promise.resolve(null);
    return analyticsPromise;
  }
  analyticsPromise = (async () => {
    const [appMod, analyticsMod] = await Promise.all([
      import('firebase/app'),
      import('firebase/analytics'),
    ]);
    const supported = await analyticsMod.isSupported();
    if (!supported) return null;
    const app = appMod.getApps().length
      ? appMod.getApps()[0]
      : appMod.initializeApp(config);
    logEventFn = analyticsMod.logEvent;
    return analyticsMod.getAnalytics(app);
  })().catch((err) => {
    console.warn('[analytics] init failed', err);
    return null;
  });
  return analyticsPromise;
};

export const trackEvent = async (name, params = {}) => {
  const analytics = await init();
  if (!analytics || !logEventFn) return;
  try {
    logEventFn(analytics, name, params);
  } catch (err) {
    console.warn('[analytics] logEvent failed', err);
  }
};

export const trackPageView = (path, title) =>
  trackEvent('page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
