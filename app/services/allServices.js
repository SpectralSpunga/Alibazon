const categoryDataLoader = require('./category/categoryDataLoader');
const productsDataLoader = require('./products/productsDataLoader');
const productsSearch = require('./products/productsSearch');
const authSignUp = require('./auth/authSignUp');
const authSignIn = require('./auth/authSignIn');
const getCart = require('./cart/getCart')
const addItemToCart = require('./cart/addItemToCart')
const removeItemFromCart = require('./cart/removeItemFromCart')
const changeQuantityCart = require('./cart/changeQuantityCart')
const getItemFromCart = require('./cart/getItemFromCart')
const cleanCart = require('./cart/cleanCart')
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