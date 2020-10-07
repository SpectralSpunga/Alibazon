const Helper = require('../helpers/categoryDataLoader')

async function categoryMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens', '', 'Mens');
    obj.links = [{ link: 'mens', ap: 'Mens' }]
    
    return res.render('category',{ obj, links: obj.links })
}

async function categoryWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens', '', 'Womens')
    obj.links = [{ link: 'womens', ap: 'Womens' }]

    return res.render('category',{ obj, links: obj.links })
}

async function clothingMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens-clothing', '/parent/mens', 'Clothing');
    obj.links = [{ link: '/category/mens', ap: 'Mens' }, { link: '', ap: 'Clothing' }]

    return res.render('category', { obj, links: obj.links })
}

async function accessoriesMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens-accessories', '/parent/mens', 'Accessories');
    obj.links = [{ link: '/category/mens', ap: 'Mens' }, { link: '', ap: 'Accessories' }]
    
    return res.render('category', { obj, links: obj.links })
}

async function clothingWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-clothing', '/parent/womens', 'Clothing');
    obj.links = [{ link: '/category/womens', ap: 'Womens' }, { link: '', ap: 'Clothing' }]

    return res.render('category', { obj, links: obj.links })
}

async function accessoriesWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-accessories', '/parent/womens', 'Accessories');
    obj.links = [{ link: '/category/womens', ap: 'Womens' }, { link: '', ap: 'Accessories' }]

    return res.render('category', { obj, links: obj.links })
}

async function jewelryWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-jewelry', '/parent/womens', 'Jewelry');
    obj.links = [{ link: '/category/womens', ap: 'Womens' }, { link: '', ap: 'Jewelry' }]

    return res.render('category', { obj, links: obj.links })
}

module.exports = { 
    categoryMens, 
    categoryWomens,
    clothingMens, 
    accessoriesMens, 
    accessoriesWomens, 
    jewelryWomens, 
    clothingWomens
}
  