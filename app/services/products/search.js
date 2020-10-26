const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Searches the database for matches to any query 
 * @param { string } query - any string
 * @example
 * "men's", "blue", "jacket" etc.
 * 
 * @returns { Array } array with many products or with one specific product
 * @example
 * return [
            {
                master: { ... },
                type: { ... },
                _id: '...',
                page_description: '...',
                page_title: "...",
                name: '...',
                c_isNewtest: true,
                price: 475,
                variation_attributes: [ {...}, {...} ],
                id: '...',
                currency: '...',
                primary_category_id: '...',
                image_groups: [ {}, {}, {} ],
                c_isNew: true,
                short_description: '...',
                orderable: true,
                variants: [ {}, {}, {} ],
                long_description: '...',
                c_isSale: true
            },
            ...
        ]
 */
async function search(query){
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

        return result.get(query);
    }
}

search = searchDecorator(search);

module.exports = search;