const router = require('express').Router();

const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

module.exports = router;
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
