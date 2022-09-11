/* eslint-disable import/no-unresolved */
/* eslint-disable semi */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const { validateLogin, validateUser } = require('./middlewares/validation');
const PageNotFound = require('./errors/PageNotFound');
const { login, createUser, logout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());

app.use(cookieParser());
app.use(requestLogger);
// app.use(cors({
//   origin: [
//     'http://localhost:3001',
//     'https://movex.nomoredomains.sbs',
//     'http://movex.nomoredomains.sbs',
//   ],
//   credentials: true,
// }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.get('/signout', logout);
app.use(auth);
app.use(usersRouter);
app.use(moviesRouter);

app.use('/', (req, res, next) => {
  next(new PageNotFound('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
