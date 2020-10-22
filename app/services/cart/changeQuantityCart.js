const axios = require('axios');
const { API } = require('../../config').config;

/**
 * Changes quantity of a specific item in the cart
 * @param {string} token - json web token
 * @param {object} body 
 * @example
 * body = {
        secretKey: "...",
        productId: "...",
        variantId: "...",
        quantity: 2
    }
   @returns {object} updated cart object
 */
async function changeQuantityCart(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/changeItemQuantity`,
            method: 'post',
            data: body,
            headers
        });

        return cart.data;
    } catch(err){
        return err;
    }
}

module.exports = changeQuantityCart;