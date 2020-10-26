const { secretKey } = require('../../config').config;
const Cart = require('./index')();

/**
 * Deletes all items from the cart when a checkout is completed
 * @param {string} token - json web token
 * @returns {string} string 'Cart has been cleaned' if no errors
 * @returns {error} error object if error
 */
async function clean(token){
    try{
        let cart = await Cart.get(token)
        if(cart instanceof Error) throw new Error("error")
        if(cart.data === 'There is no cart created for this user') throw new Error("no cart for user")

        let body = { "secretKey": secretKey }

        for(let elem of cart.items){
            body.productId = elem.productId;
            body.variantId = elem.variant.product_id;
            await Cart.removeItem(token, body)
        }

        return 'Cart has been cleaned'; 
    } catch(err){
        return err;
    }
}

module.exports = clean;