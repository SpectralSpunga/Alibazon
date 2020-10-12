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

async function search(q){
    let result = [];
    try{
        let i = 0;
        while(true){
            i++;
            let products = await axios.get(`${API}/products/product_search?secretKey=${secretKey}&page=${i}`);
            let arr = products.data;
            for(let j of arr){
                if(j.page_title && j.page_title.toLowerCase().includes(q.toLowerCase())){
                    result.push(j) 
                }
            }
        }
    } catch(err){
        console.log(err.message)
    } finally{
        return result;
    }
}

module.exports = {
    productsDataLoader,
    search
}