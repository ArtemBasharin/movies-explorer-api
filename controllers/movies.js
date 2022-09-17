const BadReqErr = require('../errors/BadReqErr');
const PageNotFound = require('../errors/PageNotFound');
const ForbidErr = require('../errors/ForbidErr');

const Movie = require('../models/movie');

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadReqErr('Данные новой карточки невалидны'));
      }

      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .orFail(() => {
      throw new PageNotFound('Карточка не найдена');
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(movieId).then(() => res.send(movie));
      }

      return next(new ForbidErr('Невозможно удалить чужую карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadReqErr('Передан некорректный id карточки'));
      }

      return next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
