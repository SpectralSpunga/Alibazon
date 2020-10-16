const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getCart(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        return cart.data;
    } catch(err){
        if(err.response) return err.response.data.error
    }
}

async function addItem(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/addItem`,
            method: 'post',
            data: body,
            headers
        });

        return cart.data;
    } catch(err){
        return err;
    }
}

async function removeItem(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/removeItem`,
            method: 'delete',
            data: body,
            headers
        });

        return cart.data;
    } catch(err){
        return err;
    }
}

async function changeQuantity(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart/changeItemQuantity`,
            method: 'post',
            data: body,
            headers
        });

        return cart.data;
    } catch(err){
        return err;
    }
}

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

        return cart.data;
    } catch(err){
        return err;
    }
}

async function cleanCart(token){
    try{
        let cart = await getCart(token)
        let body = { "secretKey": secretKey }

        for(let elem of cart.items){
            body.productId = elem.productId;
            body.variantId = elem.variant.product_id;
            await removeItem(token, body)
        }

        return res.status(200).end();
    } catch(err){
        return err;
    }
}

module.exports = {
    getCart,
    addItem,
    removeItem,
    changeQuantity,
    getItemFromCart,
    cleanCart
}