const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = router;

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getAllUsers);
