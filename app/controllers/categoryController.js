const Helper = require('../helpers/categoryDataLoader')

async function categoryMens(req, res, next){
    let obj = await Helper.categoryDataLoader('mens', '', 'Mens');
    obj.links = [{ link: 'mens', ap: 'Mens' }]
    
    return res.render('category',{ obj })
}

async function categoryWomens(req, res, next){
    let obj = await Helper.categoryDataLoader('womens', '', 'Womens')
    obj.links = [{ link: 'womens', ap: 'Womens' }]

    return res.render('category',{ obj })
}

module.exports = { categoryMens, categoryWomens }
  