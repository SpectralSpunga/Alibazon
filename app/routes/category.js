const express = require('express')
const router = express.Router();
const Controller = require('../controllers/categoryController');

router.get('/category/mens', Controller.homepageMens);
router.get('/category/womens', Controller.homepageWomens);

module.exports = router;