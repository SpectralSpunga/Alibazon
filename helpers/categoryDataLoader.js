const axios = require('axios');
const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";

async function categoryDataLoader(subCategory, category, name){
    let mainCategory = "";
    let categoryDesc = ''

    let data = await axios.get(`${API}/categories/parent/${subCategory}?secretKey=${secretKey}`);
    let datad = await axios.get(`${API}/categories${category}?secretKey=${secretKey}`);

    datad.data.forEach(elem=>{
        if(elem.name === name){
            mainCategory = elem.name;
            categoryDesc = elem.page_description;
        }
    })

    return {
        mens: data.data, 
        mainCategory, 
        categoryDesc,
        links: [
            {
                link: '',
                ap: ''
            }
        ]
    }
}

module.exports = {
    categoryDataLoader
}