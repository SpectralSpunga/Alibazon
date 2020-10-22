const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getProfile(token){
    let profileCart, profileWishlist, orders, products;
    let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }

    try{
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        profileCart = cart.data.items.length;
    } catch(err){
        if(err.response && err.response.data.error === 'There is no cart created for this user') profileCart = 0;
        else return err
    }

    try{
        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });
        profileWishlist = wishlist.data.items.length;
    } catch(err){
        if(err.response && err.response.data.error === 'There is no wishlist created for this user') profileWishlist = 0;
        else return err
    }

    try{
        orders = await axios({
            url: `${API}/orders?secretKey=${secretKey}`,
            method: 'get',
            headers
        });
    } catch(err){
        orders = 'No orders'
    }
    
    finally{
        return { profileCart, profileWishlist, orders };
    }
}

module.exports = {
    getProfile
}