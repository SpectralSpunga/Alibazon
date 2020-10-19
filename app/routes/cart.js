const router = require('express').Router();
const cartController = require('../controllers/cartController');
const checkCookie = require('../middlewares/checkCookie').checkCookie;

router.get('/cart', checkCookie, cartController.getCart)
router.post('/cart/add', checkCookie, cartController.addItem)
router.post('/cart/removeItem', checkCookie, cartController.removeItem)
router.post('/cart/changeItemQuantity', checkCookie, cartController.changeQuantity)

router.delete('/cart', checkCookie, cartController.cleanCart)

module.exports = router;