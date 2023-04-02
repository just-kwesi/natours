const router = require('express').Router();
const appError = require('../utils/appError');

module.exports = router;

router.use('/tours', require('./tours'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/booking', require('./booking'));

router.use((req, res, next) => {
  const error = new appError(' Page Not Found!', 404);
  next(error);
});
