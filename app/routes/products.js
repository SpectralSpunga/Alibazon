const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/products/search', productsController.productsSearch);
router.get('/products/:subsubCategory', productsController.productsCatalog);
router.get('/products/:subsubCategory/:productID', productsController.productsPage);

router.post('/productById', productsController.productById);

module.exports = router; 