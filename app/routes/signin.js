const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/auth/login', authController.authSignIn)
router.post('/auth/login', authController.postSignIn)
router.get('/auth/logout', authController.logout)

module.exports = router;