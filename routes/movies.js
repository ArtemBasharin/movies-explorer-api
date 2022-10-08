const router = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationMovie,
  validateMovieId,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validationMovie, postMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country,director,duration,year,description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
