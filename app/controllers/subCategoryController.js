const Helper = require('../helpers/categoryDataLoader')

async function clothingMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens-clothing', '/parent/mens', 'Clothing');
    obj.links = [{ link: 'mens', ap: 'Mens' }, { link: 'mens/clothing', ap: 'Clothing' }]

    return res.render('category', { obj, links: obj.links })
}

async function accessoriesMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens-accessories', '/parent/mens', 'Accessories');
    obj.links = [{ link: 'mens', ap: 'Mens' }, { link: 'mens/accessories', ap: 'Accessories' }]
    
    return res.render('category', { obj, links: obj.links })
}

async function clothingWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-clothing', '/parent/womens', 'Clothing');
    obj.links = [{ link: 'womens', ap: 'Womens' }, { link: 'womens/clothing', ap: 'Clothing' }]

    return res.render('category', { obj, links: obj.links })
}

async function accessoriesWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-accessories', '/parent/womens', 'Accessories');
    obj.links = [{ link: 'womens', ap: 'Womens' }, { link: 'womens/accessories', ap: 'Accessories' }]

    return res.render('category', { obj, links: obj.links })
}

async function jewelryWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens-jewelry', '/parent/womens', 'Jewelry');
    obj.links = [{ link: 'womens', ap: 'Womens' }, { link: 'womens/jewelry', ap: 'Jewelry' }]

    return res.render('category', { obj, links: obj.links })
}

module.exports = { clothingMens, accessoriesMens, accessoriesWomens, jewelryWomens, clothingWomens }