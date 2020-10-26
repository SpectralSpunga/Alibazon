const axios = require('axios');
const { API } = require('../../config').config;
const getItemFromCart = require('./getItemFromCart')
const changeQuantityCart = require('./changeQuantityCart')

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

module.exports = addItemToCart;