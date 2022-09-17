require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PageNotFound = require('../errors/PageNotFound');
const BadReqErr = require('../errors/BadReqErr');
// const AuthErr = require('../errors/AuthErr');
const ConflictReqErr = require('../errors/ConflictReqErr');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new PageNotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadReqErr('Передан неверный id пользователя'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadReqErr('При обновлении данных пользователя переданы неверные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictReqErr('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new PageNotFound('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadReqErr('Введены некорректные данные'));
      }
      if (error.code === 11000) {
        return next(new ConflictReqErr('Пользователь с таким email уже существует'));
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        domain: 'movex.nomoredomains.sbs',
      })
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new PageNotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  login,
  getCurrentUser,
  logout,
};
