const Review = require('../db/reviewModel');
const handlerFactory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    //allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newReview,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = handlerFactory.deleteOne(Review);
