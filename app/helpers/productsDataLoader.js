const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";
const axios = require('axios');

async function productsDataLoader(subsubCategory){
    let obj = await axios.get(`${API}/products/product_search?primary_category_id=${subsubCategory}&secretKey=${secretKey}`)
    return obj.data;
}

async function productPageLoader(productID){
    let obj = await axios.get(`${API}/products/product_search?id=${productID}&secretKey=${secretKey}`);
    return obj.data;
}

module.exports = {
    productsDataLoader,
    productPageLoader
}