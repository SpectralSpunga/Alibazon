const axios = require('axios');
const { secretKey, API } = require('../../config').config;

/**
 * Returns an array of products with specific category or one product with specific id depending on requestURL
 * @param { string } requestURL
 * @example
 * "id=25565", "primary_category_id=womens-clothing-tops", "page=10"
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
async function productsDataLoader(requestURL){
    try{
        let products = await axios.get(`${API}/products/product_search?${requestURL}&secretKey=${secretKey}`);
        return products.data;
    } catch(err){
        return err;
    }
}

module.exports = productsDataLoader;