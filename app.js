require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const matchRoutes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DB_ENV } = process.env;
const app = express();
app.use(helmet());
mongoose.connect(
  NODE_ENV === 'production' ? DB_ENV : 'mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
  },
);

mongoose.connect(
  NODE_ENV === 'production' ? DB_ENV : 'mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
  },
);

app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(requestLogger);
app.use(rateLimiter);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://movex.nomoredomains.sbs',
      'http://movex.nomoredomains.sbs',
      'http://api.movex.nomoredomains.sbs',
      'https://api.movex.nomoredomains.sbs',
    ],
    credentials: true,
  }),
);

app.use(auth);
matchRoutes(app);
app.use(errorLogger);
app.use(errors());
app.use(errHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
