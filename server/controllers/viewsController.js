const Tour = require('../db/tourModel');

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
