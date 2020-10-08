const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";
const axios = require('axios');

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