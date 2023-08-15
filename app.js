const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRoute = require('./routes/userRoute');
const medicineRoute = require('./routes/medicineRoute');
// const medicineRoute = require('./routes/medicineRoute');
const notesRoute = require('./routes/notesRoute');
const cors = require('cors');
// start express app
const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());

app.use(morgan('dev'));

app.use(compression());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/medicines', medicineRoute);
app.use('/api/v1/notes', notesRoute);

app.use(globalErrorHandler);
module.exports = app;
