const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Static assets
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Health check for uptime monitoring / Vercel
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Placeholder router for future APIs
const apiRouter = express.Router();
// Example namespace for future routes: /api/contact, /api/auth, etc.
app.use('/api', apiRouter);

// Fallback to index.html for root
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});

