const axios = require('axios');
const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";

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