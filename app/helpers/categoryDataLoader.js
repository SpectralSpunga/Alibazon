const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function categoryDataLoader(category){
    try{
        let data = await axios.get(`${API}/categories/parent/${category}?secretKey=${secretKey}`);
        let datad = await axios.get(`${API}/categories/${category}?secretKey=${secretKey}`);

        if (data.length) throw new Error('categoryDataLoader failed')
        else if (datad.length) throw new Error('categoryDataLoader failed')

        return {
            data: data.data, 
            mainCategory: datad.data.name, 
            categoryDesc: datad.data.page_description
        }
    } catch(err){
        return err;
    }
}

module.exports = {
    categoryDataLoader
}