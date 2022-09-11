/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

const AuthErr = require('../errors/AuthErr');

require('dotenv').config();

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let token = req.cookies.jwt;

  if (req.headers.authorization) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AuthErr('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthErr('Токен устарел'));
  }

  req.user = payload;

  return next();
};
