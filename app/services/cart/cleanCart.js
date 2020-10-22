const { secretKey } = require('../../config').config;
const getCart = require('./getCart')
const removeItemFromCart = require('./removeItemFromCart')

/**
 * Deletes all items from the cart when a checkout is completed
 * @param {string} token - json web token
 * @returns {string} string 'Cart has been cleaned' if no errors
 * @returns {error} error object if error
 */
async function cleanCart(token){
    try{
        let cart = await getCart(token)
        if(cart instanceof Error) throw new Error("error")
        if(cart.data === 'There is no cart created for this user') throw new Error("no cart for user")

        let body = { "secretKey": secretKey }

        for(let elem of cart.items){
            body.productId = elem.productId;
            body.variantId = elem.variant.product_id;
            await removeItemFromCart(token, body)
        }

        return 'Cart has been cleaned'; 
    } catch(err){
        return err;
    }
}

module.exports = cleanCart;