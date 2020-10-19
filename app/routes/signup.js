const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/auth/register', authController.registerPage)
router.post('/auth/register', authController.postSignUp)

module.exports = router;