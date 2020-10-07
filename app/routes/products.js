const express = require('express')
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products/:subsubCategory', productsController.productsCatalog);
router.get('/products/:subsubCategory/:productID', productsController.productsPage);

module.exports = router; 