/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
const router = require('express').Router()

const {
  getMovie,
  postMovie,
  deleteMovie,
} = require('../controllers/movies')

const {
  validationMovie,
  validateMovieId,
} = require('../middlewares/validation')

router.get('/movies', getMovie)
router.post('/movies', validationMovie, postMovie)
router.delete('/movies/_id', validateMovieId, deleteMovie)

module.exports = router

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
