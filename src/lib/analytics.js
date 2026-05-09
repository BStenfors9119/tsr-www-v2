const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const isEnabled = () =>
  process.env.NODE_ENV === 'production' &&
  !!config.measurementId &&
  !!config.apiKey &&
  !!config.appId &&
  !!config.projectId;

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
