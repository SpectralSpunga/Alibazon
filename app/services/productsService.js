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

            products.map( elem =>{
                if(elem.page_title && elem.page_title.toLowerCase().includes(query.toLowerCase())){
                    result.push(elem) 
                }
            })
            i++;
        }
    } catch(err){
    } finally{
        return result;
    }
}


function searchDecorator(search){
    let result = new Map()

    return function(query){
        if(result.has(query)) return result.get(query)

        let searchResult = search(query)
        result.set(query, searchResult)
        
        // if(result.has('clear')) return result.get(query);
        // result.set('clear', setTimeout(()=>{
        //     result.clear()
        // }, 5 * 60 * 1000))

        return result.get(query);
    }
}

productsSearch = searchDecorator(productsSearch);

module.exports = {
    productsDataLoader,
    productsSearch
}