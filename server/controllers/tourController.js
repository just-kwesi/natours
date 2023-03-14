const AppError = require('../utils/appError');
const Tour = require('../db/tourModel');
const { default: dist } = require('express-rate-limit');

exports.getToursWithin = async (req, res, next) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    if (!lat || !lng) {
      next(
        new AppError(
          'Please provude latitude and longitude in the format lat,lng',
          400
        )
      );
    }
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        data: tours,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getDistances = async (req, res, next) => {
  try {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000624371 : 0.001;

    if (!lat || !lng) {
      next(
        new AppError(
          'Please provude latitude and longitude in the format lat,lng',
          400
        )
      );
    }

    const distances = await Tour.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
          distanceField: 'distance',
          distanceMultiplier: multiplier,
        },
      },
      {
        $project: {
          distance: 1,
          name: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: distances.length,
      data: {
        data: distances,
      },
    });
  } catch (error) {
    next(error);
  }
};
