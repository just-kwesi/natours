const router = require('express').Router();
const Tours = require('../db');
const APIFeatures = require('../utils/apiFeatures');

module.exports = router;

router.get('/', async (req, res) => {
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
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTour = await Tours.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
});

router.get('/tour-stats', async (req, res) => {
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
    res.status(400).json({
      status: 'aggregate failed',
      message: err,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tours.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const newTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTour = await Tours.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: deletedTour,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
});
