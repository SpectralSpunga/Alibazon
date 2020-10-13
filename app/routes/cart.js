const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart)
router.post('/cart/add', cartController.addCart)
router.post('/cart/check', cartController.checkProduct)
router.post('/cart/removeItem', cartController.removeItem)

module.exports = router;