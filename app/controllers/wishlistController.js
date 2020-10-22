const Service = require('../services/wishlistService')

async function getWishlist(req, res, next){
    let result = await Service.getWishlist(req.cookies.user.token);
    if(result === "Invalid Token") return res.redirect("/auth/login")
    if(result === "There is no wishlist created for this user") result = 'no items'

    let links = [{ link: "/profile", ap: "Profile" }, { link: '', ap: "Wishlist" }];
    let user = req.cookies.user;

    console.log(result)

    return res.render('wishlist', { 
        result, 
        links, 
        title: "Wishlist", 
        user 
    })
}

async function addItem(req, res, next){
    let body = {
        "secretKey": req.body.secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id,
        "quantity": req.body.quantity === null ? 1 : req.body.quantity
    }

    let response = await Service.addItemToWishlist(req.cookies.user.token, body)
    if(response instanceof Error) return res.status(500).end()

    return res.status(201).end()
}

async function removeItem(req, res, next){
    let body = {
        "secretKey": req.body.secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id
    }
    let response = await Service.removeItemFromWishlist(req.cookies.user.token, body)
    if(response instanceof Error) return next(response)

    return res.status(200).end()
}

async function changeQuantity(req, res, next){
    let body = {
        "secretKey": req.body.secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id,
        "quantity": req.body.quantity
    }
    let response = await Service.changeQuantityWishlist(req.cookies.user.token, body)
    if(response instanceof Error) return next(response)

    return res.status(200).end()
}

module.exports = {
    getWishlist,
    addItem,
    removeItem,
    changeQuantity
}