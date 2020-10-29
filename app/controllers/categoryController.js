const Category = require('../services/category/index')()

async function category(req, res, next){
    let { category, subCategory } = req.params;
    let user = req.cookies ? req.cookies.user ? req.cookies.user : "none" : "none";
    let result = '', links = [], ap = '';

    if(subCategory){
        let request = category + "-" + subCategory;
        result = await Category.dataLoader(request);
        if(result instanceof Error) return res.render('NotFound');

        ap = category.charAt(0).toUpperCase() + category.slice(1);
        links = [{ link: "/category/" + category, ap }, { link: '', ap: result.mainCategory }];
    }
    else{
        result = await Category.dataLoader(req.params.category);
        if(result instanceof Error) return res.render('NotFound');

        links = [{ link: req.params.category, ap: result.mainCategory }]
    }
    
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