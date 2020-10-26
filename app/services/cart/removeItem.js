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
async function removeItem(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/removeItem`,
            method: 'delete',
            data: body,
            headers
        });

        console.log("removed item")

        return cart.data;
    } catch(err){
        return err;
    }
}

module.exports = removeItem;