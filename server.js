import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './server/routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(express.static(path.join(__dirname, 'dist')));

// Standalone hero-video pages. These are full documents of their own, not SPA
// routes, so they must be answered before the catch-all hands back index.html.
const HERO_VIDEOS = {
  '/hero-vid-venue': 'hero-vid-venue.html',
  '/hero-vid-venue-phone': 'hero-vid-venue-phone.html',
  '/hero-vid-consumer': 'hero-vid-consumer.html',
  '/hero-vid-venue-phone-v2': 'hero-vid-venue-phone-v2.html',
  '/hero-vid-venue-v2': 'hero-vid-venue-v2.html',
  '/hero-vid-consumer-v2': 'hero-vid-consumer-v2.html',
};

Object.entries(HERO_VIDEOS).forEach(([route, file]) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'videos', file));
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`TSR www listening on http://localhost:${port}`);
});
