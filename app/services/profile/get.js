const Cart = require('../cart/index')();
const Wishlist = require('../wishlist/index')();
const Orders = require('../orders/index')();

/**
 * Returns profile info of a user
 * @param {string} token - json web token
 * @returns {object} profile object with quantity of items in cart, wishlist and with all orders
 */
async function get(token){
    let cart = await Cart.get(token);
    let profileCart = cart.hasOwnProperty('items') ? cart.items.length: 0;

    let wishlist = await Wishlist.get(token);
    let profileWishlist = wishlist.hasOwnProperty('items') ? wishlist.items.length: 0;

    let orders = await Orders.get(token)
    let profileOrders = orders instanceof String ? 0: orders

    return { profileCart, profileWishlist, profileOrders };
    
}

module.exports = get;
