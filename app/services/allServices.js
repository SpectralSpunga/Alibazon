const { categoryDataLoader } = require('./categoryService');
const { productsDataLoader, productsSearch } = require('./productsService');
const { authSignUp, authSignIn } = require('./authService');
const { getCart, addItemToCart, removeItemFromCart, changeQuantityCart, getItemFromCart, cleanCart } = require('./cartService')
const { getWishlist, addItemToWishlist, removeItemFromWishlist, changeQuantityWishlist, getItemFromWishlist } = require('./wishlistService')
const { getOrders, createOrder } = require('./orderService')
const { getProfile } = require('./profileService')

module.exports = {
    categoryDataLoader,
    productsDataLoader, 
    productsSearch,
    authSignUp, 
    authSignIn,
    getCart, 
    addItemToCart, 
    removeItemFromCart, 
    changeQuantityCart, 
    getItemFromCart, 
    cleanCart,
    getWishlist, 
    addItemToWishlist, 
    removeItemFromWishlist, 
    changeQuantityWishlist, 
    getItemFromWishlist,
    getOrders, 
    createOrder,
    getProfile
}