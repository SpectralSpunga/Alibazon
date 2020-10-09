const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function productsDataLoader(requestURL){
    try{
        let obj = await axios.get(`${API}/products/product_search?${requestURL}&secretKey=${secretKey}`);
        if(obj.error) throw new Error(obj.error);
        
        return obj;
    } catch(err){
        return err;
    }
}

module.exports = {
    productsDataLoader
}