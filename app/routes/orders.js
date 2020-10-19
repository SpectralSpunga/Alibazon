const router = require('express').Router();
const orderController = require('../controllers/orderController');
const checkCookie = require('../middlewares/checkCookie').checkCookie

router.post('/orders', checkCookie, orderController.createOrder)
router.get('/orders/success', checkCookie, orderController.successOrder)

module.exports = router; 