const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";
const axios = require('axios');

async function productsCatalog(req, res, next){
    try{
        let obj = await axios.get(`${API}/products/product_search?primary_category_id=${req.params.subsubCategory}&secretKey=${secretKey}`)
        let result = obj.data;
        let str = req.params.subsubCategory.split('-')

        if(str.length == 2){
            str = [str[0], "clothing", str[1]]
        }

        let arr = str.map(elem=>{
            return elem.charAt(0).toUpperCase() + elem.slice(1);
        })

        let links = [
            {
                link: "/category/" + str[0],
                ap: arr[0]
            },
            {
                link: "/category/"  + str[0] + "/" + str[1],
                ap: arr[1]
            },
            {
                link: "/products/" + req.params.subsubCategory,
                ap: arr[2]
            }
        ]
        res.render('productsCatalog', { result, links });
    } catch(err){
        res.json({ error: err.message })
    }
}

async function productsPage(req, res, next){
    try{
        let obj = await axios.get(`${API}/products/product_search?id=${req.params.productID}&secretKey=${secretKey}`);
        let result = obj.data;
        let str = req.params.subsubCategory.split('-')

        if(str.length == 2){
            str = [str[0], "clothing", str[1]]
        }

        let arr = str.map(elem=>{
            return elem.charAt(0).toUpperCase() + elem.slice(1);
        })

        let links = [
            {
                link: "/category/" + str[0],
                ap: arr[0]
            },
            {
                link: "/category/"  + str[0] + "/" + str[1],
                ap: arr[1]
            },
            {
                link: "/products/" + req.params.subsubCategory,
                ap: arr[2]
            },
            {
                link: "/products/" + req.params.subsubCategory + "/" + req.params.productID,
                ap: result[0].name
            },
        ]

        res.render('productsPage', { result, links });
    } catch(err){
        res.json({ error: err.message })
    }
}

module.exports = {
    productsPage,
    productsCatalog
}