import express from 'express';
import { verifyIdToken } from '../firebase.admin.js';

const router = express.Router();

router.post('/verify', async (req, res) => {
  const { idToken } = req.body || {};
  if (!idToken) return res.status(400).json({ error: 'idToken required' });

  try {
    const decoded = await verifyIdToken(idToken);
    res.json({ uid: decoded.uid, email: decoded.email });
  } catch (err) {
    res.status(401).json({ error: 'invalid token', detail: err.message });
  }
});

export default router;
