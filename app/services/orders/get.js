const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns an array of orders of a user or error if there is no orders
 * @param {string} token - json web token
 * @returns {Array} array of orders
 * @example
 * return [
            {
                _id: "...",
                secretKey: "...",
                userId: "...",
                items: [ {}, {}, ...],
                address: "...",
                paymentId: "...",
                status: "...",
                __v: 0
            },
            ...
        ]
 */
async function get(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let orders = await axios({
            url: `${API}/orders?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        return orders.data;
    } catch(err){
        if(err.response) return err.response.data.error
    }
}

module.exports = get;