const Helper = require('../helpers/categoryDataLoader')

async function category(req, res, next){
    let obj = await Helper.categoryDataLoader(req.params.category);
    if(obj instanceof Error) return res.render('NotFound');

    obj.links = [{ link: req.params.category, ap: obj.mainCategory }]
    
    return res.render('category',{ obj, links: obj.links })
}

async function subCategory(req, res, next){
    let { category, subCategory } = req.params;
    let request = category + "-" + subCategory;
    let obj = await Helper.categoryDataLoader(request);
    if(obj instanceof Error) return res.render('NotFound');

    let ap = category.charAt(0).toUpperCase() + category.slice(1);

    obj.links = [{ link: "/category/" + category, ap }, { link: '', ap: obj.mainCategory }]
    
    return res.render('category',{ obj, links: obj.links })
}

module.exports = {
    category,
    subCategory
}