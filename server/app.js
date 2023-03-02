const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const AppError = require('./utils/appError');
// const globalErrorHandler = require('./controllers/errorController');
const errorController = require('./controllers/errorController');

//db connection
const DB = process.env.MONGODB_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.MONGODB_USER_PASSWORD
);
mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewURlParser: true,
  })
  .then(() => console.log(`db connection successful`));

//start express app
const app = express();

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/v1', require('./api'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
