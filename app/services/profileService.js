const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function getProfile(token){
    try{
        let headers = { "Content-Type":"application/json", "Authorization": "Bearer " + token }
        let cart = await axios({
            url: `${API}/cart?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        let wishlist = await axios({
            url: `${API}/wishlist?secretKey=${secretKey}`,
            method: 'get',
            headers
        });

        let profileCart = cart.data.items.length;
        let profileWishlist = wishlist.data.items.length;

        return { profileCart, profileWishlist };
    } catch(err){
        console.log(err.response)
        if(err.response) return err.response.data.error
    }
}

module.exports = {
    getProfile
}