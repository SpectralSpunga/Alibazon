const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/auth/register', authController.authSignUp)
router.post('/auth/register', authController.postSignUp)

module.exports = router;