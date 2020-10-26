const axios = require('axios');
const { API } = require('../../config').config;

/**
 * Removes specific item from the cart
 * @param {string} token - json web token 
 * @param {object} body
 * @example
 * body = {
        secretKey: "...",
        productId: "...",
        variantId: "..."
    }
    @returns {object} updated cart object
 */
async function removeItemFromCart(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/removeItem`,
            method: 'delete',
            data: body,
            headers
        });

        return cart.data;
    } catch(err){
        return err;
    }
}

module.exports = removeItemFromCart;