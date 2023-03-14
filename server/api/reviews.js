const router = require('express').Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router.get('/', authController.protect, reviewController.getAllUsers);

router.post(
  '/',
  authController.protect,
  authController.restrictTo('user'),
  reviewController.createReview
);

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
