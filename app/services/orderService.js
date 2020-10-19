const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getOrders(token){
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

async function createOrder(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let order = await axios({
            url: `${API}/orders`,
            method: 'post',
            data: body,
            headers
        });

        return order;
    } catch(err){
        console.log(err.response.data)
    }
}

module.exports = {
    getOrders,
    createOrder
}