const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getWishlist(token){
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

async function addItemToWishlist(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist/addItem`,
            method: 'post',
            data: body,
            headers
        });

        return wishlist.data;
    } catch(err){
        return err;
    }
}

async function removeItemFromWishlist(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist/removeItem`,
            method: 'delete',
            data: body,
            headers
        });

        return wishlist.data;
    } catch(err){
        return err;
    }
}

async function changeQuantityWishlist(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist/changeItemQuantity`,
            method: 'post',
            data: body,
            headers
        });

        return wishlist.data;
    } catch(err){
        return err;
    }
}

async function getItemFromWishlist(token, item_id){
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

        return wishlist.data;
    } catch(err){
        return err;
    }
}

module.exports = {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
    changeQuantityWishlist,
    getItemFromWishlist
}