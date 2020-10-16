const router = require('express').Router();
const profileController = require('../controllers/profileController');
const checkCookie = require('../middlewares/checkCookie').checkCookie

router.get('/profile', checkCookie, profileController.profile)

module.exports = router;