const Service = require('../services/productsService')

async function productsPage(req, res, next){
    let requestURL = "id=" + req.params.productID;
    
    let products = await Service.productsDataLoader(requestURL);
    if(products instanceof Error) return res.render('NotFound');
    
    //special check for womens-outfits
    let str = req.params.subsubCategory.split('-')
    if(str.length == 2) str = [str[0], "clothing", str[1]]
    let arr = str.map(elem=>{
        return elem.charAt(0).toUpperCase() + elem.slice(1);
    })

    let links = [
        { link: "/category/" + str[0], ap: arr[0] }, 
        { link: "/category/" + str[0] + "/" + str[1], ap: arr[1] },
        { link: "/products/" + req.params.subsubCategory, ap: arr[2] },
        { link: "/products/" + req.params.subsubCategory + "/" + req.params.productID, ap: products[0].name },
    ]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    res.render('productsPage', { product: products[0], links, user, title: products[0].page_title });
}

async function productsCatalog(req, res, next){
    let requestURL = "primary_category_id=" + req.params.subsubCategory;

    let products = await Service.productsDataLoader(requestURL)
    if(products instanceof Error) return res.render('NotFound');

    //special check for womens-outfits
    let str = req.params.subsubCategory.split('-') 
    if(str.length == 2) str = [str[0], "clothing", str[1]]
    let arr = str.map(elem=>{
        return elem.charAt(0).toUpperCase() + elem.slice(1);
    })

    let links = [
        { link: "/category/" + str[0], ap: arr[0] },
        { link: "/category/"  + str[0] + "/" + str[1], ap: arr[1]},
        { link: "/products/" + req.params.subsubCategory, ap: arr[2] }
    ]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;

    res.render('productsCatalog', { products, links, user, title: "Catalog" });
}

async function productsSearch(req, res, next){
    let products = await Service.productsSearch(req.query.q);
    if(products instanceof Error) return res.render('NotFound');

    let links = [{ link: '', ap: `${products.length} results for: ` + req.query.q }]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    res.render('productsCatalog', { products, links, user, title: "Results for: " + req.query.q });
}

module.exports = {
    productsPage,
    productsCatalog,
    productsSearch
}