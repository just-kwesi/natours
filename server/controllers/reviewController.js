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

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = handlerFactory.createOne(Review);
exports.getReview = handlerFactory.updateOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
