const router = require('express').Router();

const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUserInfo);

module.exports = router;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
