const express = require('express');
const app = express();

// Reemplaza con tu link final
const DESTINATION_URL = 'https://5b356756-fca8-4007-aa32-caf7fa92ecd6-00-gpqbwavyvlgg.picard.replit.dev/health';

// Middleware para bloquear bots
app.use((req, res, next) => {
  const userAgent = req.get('User-Agent') || '';
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /slurp/i,
    /bing/i,
    /duckduck/i,
    /yandex/i,
    /python/i,
    /curl/i
  ];

  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  if (isBot) {
    return res.status(403).send('Access denied'); // Bloquea bots
  }
  next();
});

// Redirección principal
app.get('/', (req, res) => {
  res.redirect(DESTINATION_URL);
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
