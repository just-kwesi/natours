const router = require('express').Router();

const viewController = require('../controllers/viewsController');

module.exports = router;

router.get('/', viewController.getOverview);
router.get('/tours/:slug', viewController.getTour);
