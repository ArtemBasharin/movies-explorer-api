const jwt = require('jsonwebtoken');

const AuthErr = require('../errors/AuthErr');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getAuthToken = (req) => {
  if (
    !req ||
    !req.headers ||
    typeof req.headers.authorization !== 'string' ||
    req.headers.authorization.match(/^Bearer /) === null
  ) {
    throw new AuthErr('Необходима авторизация');
  }

  return req.headers.authorization.split(' ')[1];
};

module.exports = (req, res, next) => {
  if (['/signin', '/signup'].includes(req.url)) {
    next();
    return;
  }

  let payload;

  try {
    const token = getAuthToken(req);

    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    next(new AuthErr('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
