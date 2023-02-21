const mongoose = require('mongoose');
require('dotenv').config({ path: '../../config.env' });
const fs = require('fs');

const Tours = require('../../server/db');

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

const exportData = async () => {
  try {
    await Tours.create(tours);
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
    console.log('Data successsfully deletde!');
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
