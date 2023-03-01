const router = require('express').Router();

module.exports = router;

router.use('/tours', require('./tours'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});
