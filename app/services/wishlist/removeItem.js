const axios = require('axios');
const { API } = require('../../config').config;

/**
 * Removes specific item from the wishlist
 * @param {string} token - json web token 
 * @param {object} body
 * @example
 * body = {
        secretKey: "...",
        productId: "...",
        variantId: "..."
    }
    @returns {object} updated wishlist object
 */
async function removeItem(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist/removeItem`,
            method: 'delete',
            data: body,
            headers
        });

        console.log("removed item")
        return wishlist.data;
    } catch(err){
        return err;
    }
}

module.exports = removeItem;