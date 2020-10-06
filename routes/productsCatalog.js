const express = require('express')
const router = express.Router();
const productsCatalogController = require('../controllers/productsCatalogController');

router.get('/products/:subsubCategory', productsCatalogController.products);

module.exports = router;