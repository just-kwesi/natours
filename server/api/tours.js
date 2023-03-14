const router = require('express').Router();
const Tours = require('../db/tourModel');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');
const handlerFactory = require('../controllers/handlerFactory');
const reviewRouter = require('./reviews');

module.exports = router;

router.get('/', authController.protect, async (req, res, next) => {
  try {
    // execute query
    const features = new APIFeatures(Tours.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const tours = await features.query;
    //response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  handlerFactory.createOne(Tours)
);

router.get('/tour-stats', authController.protect, async (req, res, next) => {
  try {
    const stats = await Tours.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          numTours: { $count: {} },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $avg: '$price' },
          maxPrice: { $avg: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        tour: stats,
      },
    });
  } catch (err) {
    next(err);
  }
});

router
  .route(':/id')
  .get(
    authController.protect,
    handlerFactory.getOne(Tours, { path: 'reviews' })
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    handlerFactory.updateOne(Tours)
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    handlerFactory.deleteOne(Tours)
  );

router.use('/:tourId/reviews', reviewRouter);

// OLDER IMPLEMENTATIONS

// router.patch('/:id', async (req, res, next) => {
//   try {
//     const newTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!newTour) {
//       return next(new AppError('No tour found with this ID', 404));
//     }

//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete(
//   '/:id',
//   authController.protect,
//   authController.restrictTo('admin', 'lead-guide'),
//   handlerFactory.deleteOne(Tours)
// async (req, res, next) => {
//   try {
//     const deletedTour = await Tours.findByIdAndDelete(req.params.id);
//     if (!deletedTour) {
//       return next(new AppError('No tour found with this ID', 404));
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: deletedTour,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// }
// );

// REVIEWS
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

// router.get('/:id', authController.protect, async (req, res, next) => {
//   try {
//     const tour = await Tours.findById(req.params.id).populate('reviews');

//     if (!tour) {
//       return next(new AppError('No tour found with this ID', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });
