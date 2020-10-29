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
    let wishlist = await Wishlist.get(token);
    let orders = await Orders.get(token)

    if(cart === "Invalid Token") return new Error(cart)

    let profileCart = 0, profileWishlist = 0, profileOrders = 0;

    if(cart && wishlist && orders){
        profileCart = cart.hasOwnProperty('items') ? cart.items.length : 0;
        profileWishlist = wishlist.hasOwnProperty('items') ? wishlist.items.length : 0;
        profileOrders = orders[0].hasOwnProperty('items') ? orders : 0
    }

    return { profileCart, profileWishlist, profileOrders };
}

module.exports = get;
