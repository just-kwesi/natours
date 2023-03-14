const Review = require('../db/reviewModel');
const handlerFactory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllUsers = handlerFactory.getAll(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.getReview = handlerFactory.updateOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
