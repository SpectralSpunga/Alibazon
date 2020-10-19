const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function categoryDataLoader(category){
    try{
        let subCategory = await axios.get(`${API}/categories/parent/${category}?secretKey=${secretKey}`);
        let mainCategory = await axios.get(`${API}/categories/${category}?secretKey=${secretKey}`);

        return {
            data: subCategory.data, 
            mainCategory: mainCategory.data.name, 
            categoryDesc: mainCategory.data.page_description,
            title: mainCategory.data.page_title
        }
    } catch(err){
        return err;
    }
}

module.exports = {
    categoryDataLoader
}