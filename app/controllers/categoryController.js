const Service = require('../services/categoryService')

async function category(req, res, next){
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

    let user = req.cookies.user.user ? req.cookies.user : "none";
    
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