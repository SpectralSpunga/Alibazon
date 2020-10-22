const axios = require('axios');
const { secretKey, API } = require('../../config').config;
const productsDataLoader = require('./products/productsService').productsDataLoader

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
async function getCart(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        for(let variant of cart.data.items){
            variant.variation = [];
            let product = await productsDataLoader(`id=${variant.productId}`);
            //if error request again
            if(product instanceof Error) product = await productsDataLoader(`id=${variant.productId}`);
            variant.product = product;
            variant.total = (variant.quantity * variant.variant.price).toFixed(2);
            for(let prop in variant.variant.variation_values){
                variant.variation.push([prop, variant.variant.variation_values[prop]])
            }
        }

        return cart.data;
    } catch(err){
        if(err.response) return err.response.data.error
    }
}

module.exports = getCart;