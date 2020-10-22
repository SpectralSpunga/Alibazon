const axios = require('axios');
const { secretKey, API } = require('../config').config;
const productsDataLoader = require('../services/productsService').productsDataLoader

async function getWishlist(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        for(let variant of wishlist.data.items){
            variant.variation = [];
            let datad = await productsDataLoader(`id=${variant.productId}`);
            variant.product = datad;
            variant.total = (variant.quantity * variant.variant.price).toFixed(2);
            for(let prop in variant.variant.variation_values){
                variant.variation.push([prop, variant.variant.variation_values[prop]])
            }
        }

        return wishlist.data;
    } catch(err){
        if(err.response) return err.response.data.error
    }
}

async function addItemToWishlist(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        await axios({
            url: `${API}/wishlist/addItem`,
            method: 'post',
            data: body,
            headers
        });

        return 'Successfully added item';
    } catch(err){
        if(err.response && err.response.data.error === 'This Item is already in your wishlist'){
            let item = await getItemFromWishlist(token, body.variantId);
            if(item instanceof Error) throw new Error()
            body.quantity += item.quantity;
            await changeQuantityWishlist(token, body)
            return 'Successfully added item'
        }
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

        return { error: "Variant not found" };
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