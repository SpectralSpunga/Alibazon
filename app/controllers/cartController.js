const Service = require('../services/cartService')
const pService = require('../services/productsService')
const { secretKey } = require('../config').config;

async function getCart(req, res, next){
    let result = await Service.getCart(req.cookies.user.token);
    if(result === "Invalid Token") return res.redirect("/auth/login")
    if(result === "There is no cart created for this user") result = 'no items'

    if(result !== 'no items'){
        for(let variant of result.items){
            variant.variation = [];
            let datad = await pService.productsDataLoader(`id=${variant.productId}`);
            variant.product = datad;
            variant.total = (variant.quantity * variant.variant.price).toFixed(2);
            for(let prop in variant.variant.variation_values){
                variant.variation.push([prop, variant.variant.variation_values[prop]])
            }
        }
    }

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
    let product = await pService.productsDataLoader(`id=${req.body.product_id}`)
    if(product instanceof Error) return res.json({error: "Error"})
    let response = '';
    let body = {
        "secretKey": secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id,
    }

    body["quantity"] = req.body.quantity === null ? 1 : req.body.quantity ;
    response = await Service.addItem(req.cookies.user.token, body)

    if(response.response){
        if(response.response.data.error === 'This Item is already in your cart'){
            let item = await Service.getItemFromCart(req.cookies.user.token, req.body.variant_id);
            if(item instanceof Error) return res.status(500).send("At addItem")
            body["quantity"] = req.body.quantity + item.quantity;
    
            await Service.changeQuantity(req.cookies.user.token, body)
        }
    }

    return res.status(200).end()
}

async function removeItem(req, res, next){
    let body = {
        "secretKey": secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id
    }

    await Service.removeItem(req.cookies.user.token, body)
    return res.status(200).end()
}

async function changeQuantity(req, res, next){
    let body = {
        "secretKey": secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id,
        "quantity": req.body.quantity
    }

    await Service.changeQuantity(req.cookies.user.token, body)
    return res.status(200).end()
}

async function cleanCart(req, res, next){
    await Service.cleanCart(req.cookies.user.token)
    return res.status(200).end()
}

module.exports = {
    getCart,
    addItem,
    removeItem,
    changeQuantity,
    cleanCart
}