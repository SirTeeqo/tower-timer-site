require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HINT_TEXT = process.env.HINT_TEXT || '';
const RELEASE_AT_RAW = process.env.RELEASE_AT;

if (!RELEASE_AT_RAW) {
  throw new Error('Missing RELEASE_AT in environment variables.');
}

const releaseTimestamp = new Date(RELEASE_AT_RAW).getTime();
if (Number.isNaN(releaseTimestamp)) {
  throw new Error('RELEASE_AT must be a valid ISO datetime, e.g. 2026-04-07T18:00:00Z');
}

if (!HINT_TEXT) {
  console.warn('Warning: HINT_TEXT is empty. The site will reveal an empty hint.');
}

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (req, res) => {
  const now = Date.now();
  res.json({
    serverNow: now,
    releaseAt: releaseTimestamp,
    remainingMs: Math.max(0, releaseTimestamp - now),
    revealed: now >= releaseTimestamp
  });
});

app.get('/api/hint', (req, res) => {
  const now = Date.now();
  if (now < releaseTimestamp) {
    return res.status(403).json({
      error: 'Hint not available yet.',
      remainingMs: Math.max(0, releaseTimestamp - now)
    });
  }

  res.json({
    hint: HINT_TEXT
  });
});

app.listen(PORT, () => {
  console.log(`Tower timer site running on http://localhost:${PORT}`);
  console.log(`Hint will unlock at ${new Date(releaseTimestamp).toISOString()}`);
});
