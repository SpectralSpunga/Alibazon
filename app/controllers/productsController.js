const Service = require('../services/productsService')

async function productsCatalog(req, res, next){
    let requestURL = "primary_category_id=" + req.params.subsubCategory;
    let obj = await Service.productsDataLoader(requestURL)
    if(obj instanceof Error) return res.render('NotFound');

    let result = obj.data;
    //converts subsubCategory like 'mens-clothing-jackets' to array ['mens', 'clothing', 'jackets']
    let str = req.params.subsubCategory.split('-') 

    //checking for womens-outfits 
    if(str.length == 2) str = [str[0], "clothing", str[1]]
    

    //capitilizes str like ['mens', 'clothing', 'jackets'] to ['Mens', 'Clothing', 'Jackets']
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

    res.render('productsCatalog', { result, links, user, title: "Catalog" });
}

async function productsPage(req, res, next){
    let requestURL = "id=" + req.params.productID;
    let obj = await Service.productsDataLoader(requestURL);
    if(obj instanceof Error) return res.render('NotFound');
    
    let result = obj.data;
    let str = req.params.subsubCategory.split('-')

    if(str.length == 2) str = [str[0], "clothing", str[1]]

    let arr = str.map(elem=>{
        return elem.charAt(0).toUpperCase() + elem.slice(1);
    })

    let links = [
        { link: "/category/" + str[0], ap: arr[0] }, 
        { link: "/category/" + str[0] + "/" + str[1], ap: arr[1] },
        { link: "/products/" + req.params.subsubCategory, ap: arr[2] },
        { link: "/products/" + req.params.subsubCategory + "/" + req.params.productID, ap: result[0].name },
    ]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    res.render('productsPage', { product: result[0], links, user, title: result[0].page_title });
}

async function productsSearch(req, res, next){
    let obj = await Service.search(req.query.q);
    if(obj instanceof Error) return res.render('NotFound');

    let links = [{ link: '', ap: `${obj.length} results for: ` + req.query.q }]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    res.render('productsCatalog', { result: obj, links, user, title: "Results for: " + req.query.q });
}

module.exports = {
    productsPage,
    productsCatalog,
    productsSearch
}