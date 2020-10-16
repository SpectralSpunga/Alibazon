const router = require('express').Router();
const checkout = require('../controllers/checkoutController').checkout;

router.post('/create-checkout-session', checkout)

module.exports = router;