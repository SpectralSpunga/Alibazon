const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController');
const checkCookie = require('../middlewares/checkCookie').checkCookie

router.get('/wishlist', checkCookie, wishlistController.getWishlist)
router.post('/wishlist/add', checkCookie, wishlistController.addItem)
router.post('/wishlist/removeItem', checkCookie, wishlistController.removeItem)
router.post('/wishlist/changeItemQuantity', checkCookie, wishlistController.changeQuantity)

module.exports = router;