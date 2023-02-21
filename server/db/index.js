const mongoose = require('mongoose');

//db schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a price'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour myst have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour myst have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour myst have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover inage'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: {
    type: [Date],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 500,
// });

// testTour
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log('ERROR 👿', err);
//   });
