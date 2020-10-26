const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns item from the cart by id
 * @param {string} token - json web token 
 * @param {string} item_id - variantId of item in cart
 * @returns {object} item object with item_id
 */
async function getItemFromCart(token, item_id){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get', 
            headers
        });

        for(let elem of cart.data.items){
            if(item_id === elem.variant.product_id){
                return elem
            }
        }

        return { error: "Variant not found" };
    } catch(err){
        return err;
    }
}

module.exports = getItemFromCart;