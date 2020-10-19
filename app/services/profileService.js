const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getProfile(token){
    let profileCart, profileWishlist;
    let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
    try{
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        profileCart = cart.data.items.length;
    } catch(err){
        profileCart = 0;
    }
    try{
        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });
        profileWishlist = wishlist.data.items.length;
    } catch(err){
        profileWishlist = 0;
    } finally{
        return { profileCart, profileWishlist };
    }
}

module.exports = {
    getProfile
}