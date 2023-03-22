const router = require('express').Router();

const viewController = require('../controllers/viewsController');

module.exports = router;

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
