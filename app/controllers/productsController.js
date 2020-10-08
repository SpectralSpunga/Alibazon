const Helper = require('../helpers/productsDataLoader')

async function productsCatalog(req, res, next){
    let requestURL = "primary_category_id=" + req.params.subsubCategory;
    let obj = await Helper.productsDataLoader(requestURL)
    if(obj.err){
        res.json({error: obj.err.message})
    }
    let result = obj.data;
    //converts subsubCategory like 'mens-clothing-jackets' to array ['mens', 'clothing', 'jackets']
    let str = req.params.subsubCategory.split('-')

    //checking for womens-outfits
    if(str.length == 2){
        str = [str[0], "clothing", str[1]]
    }

    //capitilizes str like ['mens', 'clothing', 'jackets'] to ['Mens', 'Clothing', 'Jackets']
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
}

async function productsPage(req, res, next){
    let requestURL = "id=" + req.params.productID;
    let obj = await Helper.productsDataLoader(requestURL);
    if(obj.err){
        res.json({error: obj.err.message})
    }
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
}

module.exports = {
    productsPage,
    productsCatalog
}