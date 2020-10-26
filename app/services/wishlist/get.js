const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns a wishlist
 * @param { String } token - json web token
 * @returns { object } wishlist object with array of items
 * @example 
 * wishlist = {
            _id: '...',
            secretKey: '...',
            userId: '...',
            items: [ {}, {}, ...]
        }
 */
async function get(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        return wishlist.data;
    } catch(err){
        if(err.response) return err.response.data.error
    }
}

module.exports = get;