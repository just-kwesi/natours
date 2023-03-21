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
    const tour = await Tour.find({ slug });

    res.status(200).render('tour', {
      title: tour.name,
      tour,
    });
  } catch (error) {
    next(error);
  }
};
