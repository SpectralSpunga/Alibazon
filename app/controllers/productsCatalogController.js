async function products(req, res, next){
    let result = await require('../helpers/productsDataLoader').productsDataLoader(req.params.subsubCategory);
    let links = require('../helpers/linkMaker').linkMaker(req.params.subsubCategory)

    res.render('productsCatalog', { result, links });
}

module.exports = {
    products
}