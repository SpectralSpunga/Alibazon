const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns item from the wishlist by id
 * @param {string} token - json web token 
 * @param {string} item_id - variantId of item in wishlist
 * @returns {object} item object with item_id
 */
async function getItem(token, item_id){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        for(let elem of wishlist.data.items){
            if(item_id === elem.variant.product_id){
                return elem
            }
        }

        return { error: "Variant not found" };
    } catch(err){
        return err;
    }
}

module.exports = getItem;