const axios = require('axios');
const { API } = require('../../config').config;

/**
 * Changes quantity of a specific item in the wishlist
 * @param {string} token - json web token
 * @param {object} body 
 * @example
 * body = {
        secretKey: "...",
        productId: "...",
        variantId: "...",
        quantity: 2
    }
   @returns {object} updated wishlist object
 */
async function changeQuantity(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist/changeItemQuantity`,
            method: 'post',
            data: body,
            headers
        });
        console.log("changed quantity")

        return wishlist.data;
    } catch(err){
        return err;
    }
}

module.exports = changeQuantity;