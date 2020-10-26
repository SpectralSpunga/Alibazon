const axios = require('axios');
const { API } = require('../../config').config;

/**
 * 
 * @param {string} token - json web token
 * @param {object} body - info about order
 * @example
 * body = {
            secretKey: "...",
            address: "...",
            paymentId: "...",
            items: [ {}, {}, ... ]
        }
 * @returns {object} order object
   @example
   order = {
            "_id": "...",
            "secretKey": "...",
            "userId": "...",
            "items": [ {}, {}, ...],
            "address": "...",
            "paymentId": "...",
            "status": "...",
            "__v": 0
        }
 */
async function create(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let order = await axios({
            url: `${API}/orders`,
            method: 'post',
            data: body,
            headers
        });

        return order.data;
    } catch(err){
        return err
    }
}

module.exports = create;