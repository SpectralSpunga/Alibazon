const axios = require('axios');
const { API } = require('../../config').config;
const Cart = require('./index')();

/**
 * Adds item to the cart
 * @param { string } token - json web token 
 * @param { object } body
 * @example
 *  body = {
        secretKey: "...",
        productId: "...",
        variantId: "...",
        quantity: 2
    }
    @returns { string } 'Successfully added item' if no errors
    @returns { error } if error occured
 */
async function addItem(token, body){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        await axios({
            url: `${API}/cart/addItem`,
            method: 'post',
            data: body,
            headers
        });
        console.log("added")

        return 'Successfully added item';
    } catch(err){
        if(err.response && err.response.data.error === 'This Item is already in your cart'){
            let item = await Cart.getItem(token, body.variantId);
            if(item instanceof Error) throw new Error()
            body.quantity += item.quantity;
            await Cart.changeQuantity(token, body)
            console.log("added")
            return 'Successfully added item'
        }
        return err;
    }
}

module.exports = addItem;