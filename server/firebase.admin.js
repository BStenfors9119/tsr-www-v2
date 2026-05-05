import admin from 'firebase-admin';
import fs from 'node:fs';
import path from 'node:path';

let app = null;

export const init = () => {
  if (app) return app;

  const credPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!credPath || !fs.existsSync(path.resolve(credPath))) {
    console.warn(
      '[firebase] FIREBASE_SERVICE_ACCOUNT_PATH not set or file missing — skipping admin init',
    );
    return null;
  }

  const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(credPath), 'utf8'));
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  return app;
};

export const verifyIdToken = async (idToken) => {
  const a = init();
  if (!a) throw new Error('firebase admin not initialized');
  return admin.auth().verifyIdToken(idToken);
};
