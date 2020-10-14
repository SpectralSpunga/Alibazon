const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function productsDataLoader(requestURL){
    try{
        let products = await axios.get(`${API}/products/product_search?${requestURL}&secretKey=${secretKey}`);
        return products.data;
    } catch(err){
        return err;
    }
}

async function productsSearch(query){
    let result = [];
    let i = 1;
    try{
        while(true){
            let response = await axios.get(`${API}/products/product_search?secretKey=${secretKey}&page=${i}`);
            let products = response.data;
            for(let elem of products){
                if(elem.page_title && elem.page_title.toLowerCase().includes(query.toLowerCase())){
                    result.push(elem) 
                }
            }
            i++;
        }
    } catch(err){
    } finally{
        return result;
    }
}

module.exports = {
    productsDataLoader,
    productsSearch
}