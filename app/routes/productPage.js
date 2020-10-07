const express = require('express')
const router = express.Router();
const Controller = require('../controllers/productPageController');

router.get('/products/:subsubCategory/:productID', Controller.productPage);

module.exports = router;