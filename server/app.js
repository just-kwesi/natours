const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

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

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
