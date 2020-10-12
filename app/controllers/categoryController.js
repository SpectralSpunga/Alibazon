const Service = require('../services/categoryService')

async function category(req, res, next){
    let obj = await Service.categoryDataLoader(req.params.category);
    if(obj instanceof Error) return res.render('NotFound', { links: [{ap: "NotFound"}]});

    let links = [{ link: req.params.category, ap: obj.mainCategory }]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    return res.render('category',
    { 
        obj: obj.data, 
        links, 
        category: obj.mainCategory, 
        description: obj.categoryDesc, 
        title: obj.title, 
        user 
    })
}

async function subCategory(req, res, next){
    let { category, subCategory } = req.params;
    let request = category + "-" + subCategory;
    
    let obj = await Service.categoryDataLoader(request);
    if(obj instanceof Error) return res.render('NotFound', { links: [{ap: "NotFound"}]});

    let ap = category.charAt(0).toUpperCase() + category.slice(1);

    let links = [{ link: "/category/" + category, ap }, { link: '', ap: obj.mainCategory }];
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user.name;
    
    return res.render('category',
    { 
        obj: obj.data, 
        links, 
        category: obj.mainCategory, 
        description: obj.categoryDesc, 
        title: obj.title, 
        user 
    })
}

module.exports = {
    category,
    subCategory
}