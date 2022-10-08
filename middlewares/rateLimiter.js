const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Вы сделали более 100 запросов за 15 минут...',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
