const jwt = require('jsonwebtoken');

const AuthErr = require('../errors/AuthErr');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthErr('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new AuthErr('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
