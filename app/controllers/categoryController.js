const Service = require('../services/categoryService')
const cleanCart = require('../services/cartService').cleanCart

async function category(req, res, next){

    if(req.sessionId){
        //await cleanCart(req.cookies.user.token)
        console.log("PEPE")
    }

    let { category, subCategory } = req.params;
    let result = '', links = [], ap = '';

    if(subCategory){
        let request = category + "-" + subCategory;
        result = await Service.categoryDataLoader(request);
        if(result instanceof Error) return res.render('NotFound');

        ap = category.charAt(0).toUpperCase() + category.slice(1);
        links = [{ link: "/category/" + category, ap }, { link: '', ap: result.mainCategory }];
    }
    else{
        result = await Service.categoryDataLoader(req.params.category);
        if(result instanceof Error) return res.render('NotFound');

        links = [{ link: req.params.category, ap: result.mainCategory }]
    }

    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user;
    
    return res.render('category',
    { 
        category: result.data, 
        links, 
        mainCategory: result.mainCategory, 
        description: result.categoryDesc, 
        title: result.title, 
        user 
    })
}

module.exports = {
    category
}