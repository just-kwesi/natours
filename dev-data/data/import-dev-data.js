const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const fs = require('fs');

const Tours = require('../../server/db/tourModel');
const User = require('../../server/db/userModel');
const Review = require('../../server/db/reviewModel');

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf8')
);

const exportData = async () => {
  try {
    await Tours.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data successsfully loaded!');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from db
const deleteData = async () => {
  try {
    await Tours.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data successsfully deleted!');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--export') {
  exportData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
