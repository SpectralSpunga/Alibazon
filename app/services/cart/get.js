const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns a cart
 * @param { String } token - json web token
 * @returns { object } cart object with array of items
 * @example 
 * {
    _id: '...',
    secretKey: '...',
    userId: '...',
    items: [
        {
        variant: [Object],
        _id: '...',
        productId: '...',
        quantity: 1,
        variation: [Array],
        product: [Array],
        total: ''
        },
        ...
    ]
 */
async function get(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        return cart.data;
    } catch(err){
        if(err.response === undefined) await get(token)
        
        if(err.response) return err.response.data.error
    }
}

module.exports = get;