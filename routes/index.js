const { validateLogin, validateUser } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const PageNotFound = require('../errors/PageNotFound');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const matchRoutes = (app) => {
  app.post('/signin', validateLogin, login);
  app.post('/signup', validateUser, createUser);
  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);

  app.use('/', (req, res, next) => {
    next(new PageNotFound('Страница не найдена'));
  });
};

module.exports = matchRoutes;
