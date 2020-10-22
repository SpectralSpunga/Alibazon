const Service = require('../services/cartService')

async function getCart(req, res, next){
    let result = await Service.getCart(req.cookies.user.token);
    if(result === "Invalid Token") return res.redirect("/auth/login")
    if(result === "There is no cart created for this user") result = 'no items'

    let links = [{ link: "/profile", ap: "Profile" }, { link: '', ap: "Shopping Cart" }];
    let user = req.cookies.user;

    return res.render('cart', { 
        result, 
        links, 
        title: "Cart", 
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
    let response = await Service.addItemToCart(req.cookies.user.token, body)
    
    return res.status(201).send(response)
}

async function removeItem(req, res, next){
    let body = {
        "secretKey": req.body.secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id
    }
    let response = await Service.removeItemFromCart(req.cookies.user.token, body)
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
    let response = await Service.changeQuantityCart(req.cookies.user.token, body)
    if(response instanceof Error) return next(response)

    return res.status(200).end()
}

async function cleanCart(req, res, next){
    let response = await Service.cleanCart(req.cookies.user.token)
    if(response instanceof Error) return next(response)

    return res.status(200).end()
}

module.exports = {
    getCart,
    addItem,
    removeItem,
    changeQuantity,
    cleanCart
}