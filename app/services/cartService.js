const axios = require('axios');
const { secretKey, API } = require('../config').config;
const productsDataLoader = require('../services/productsService').productsDataLoader

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

async function addItemToCart(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        await axios({
            url: `${API}/cart/addItem`,
            method: 'post',
            data: body,
            headers
        });

        return 'Successfully added item';
    } catch(err){
        if(err.response && err.response.data.error === 'This Item is already in your cart'){
            let item = await getItemFromCart(token, body.variantId);
            if(item instanceof Error) throw new Error()
            body.quantity += item.quantity;
            await changeQuantityCart(token, body)
            return 'Successfully added item'
        }
        return err;
    }
}

async function removeItemFromCart(token, body){
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

async function changeQuantityCart(token, body){
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

        return { error: "Variant not found" };
    } catch(err){
        return err;
    }
}

async function cleanCart(token){
    try{
        let cart = await getCart(token)
        if(cart instanceof Error) throw new Error("error")
        if(cart.data === 'There is no cart created for this user') throw new Error("no cart for user")

        let body = { "secretKey": secretKey }

        for(let elem of cart.items){
            body.productId = elem.productId;
            body.variantId = elem.variant.product_id;
            await removeItemFromCart(token, body)
        }

        return 'Cart has been cleaned'; 
    } catch(err){
        return err;
    }
}

module.exports = { 
    getCart,
    addItemToCart,
    removeItemFromCart,
    changeQuantityCart,
    getItemFromCart,
    cleanCart
}