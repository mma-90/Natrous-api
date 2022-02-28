const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
