const Tour = require('../db/tourModel');
const AppError = require('../utils/appError');
const Booking = require('../db/bookingModel');

exports.getOverview = async (req, res, next) => {
  try {
    const tours = await Tour.find();

    res.status(200).render('overview', {
      title: 'Exciting tours for adventurous people',
      tours,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const tour = await Tour.find({ slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
    });
    if (!tour) {
      return next(new AppError('There is no tour with that name.', 404));
    }

    res.status(200).render('tour', {
      title: `${tour[0].name}`,
      tour: tour[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.getLoginForm = async (req, res, next) => {
  try {
    res.status(200).render('login', {
      title: 'Login',
    });
  } catch (error) {
    next(error);
  }
};

exports.getSignupForm = async (req, res, next) => {
  try {
    res.status(200).render('signup', {
      title: 'Signup',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAccount = (req, res, next) => {
  try {
    // console.log(res);
    res.status(200).render('account', {
      title: 'My Account',
    });
  } catch (error) {
    next(error);
  }
};
exports.getMyTours = async (req, res, next) => {
  try {
    // 1) Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    // 2) Find tours with the returned IDs
    const tourIDs = bookings.map((el) => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200).render('overview', {
      title: 'My Tours',
      tours,
    });
  } catch (error) {
    next(error);
  }
};
