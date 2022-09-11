/* eslint-disable import/extensions */
const router = require('express').Router()

const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users')

const {
  validateUpdateUser,
} = require('../middlewares/validation')

router.get('/users/me', getCurrentUser)
router.patch('/users/me', validateUpdateUser, updateUserInfo)

module.exports = router

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
