async function productPage(req, res, next){
    let result = await require('../helpers/productsDataLoader').productPageLoader(req.params.productID);
    let links = require('../helpers/linkMaker').linkMaker(req.params.subsubCategory);
    links.push({
        link: "/products/" + req.params.subsubCategory + "/" + req.params.productID,
        ap: result[0].name
    })

    res.render('productPage', { result, links });
}

module.exports = {
    productPage
}