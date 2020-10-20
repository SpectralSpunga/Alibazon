const Service = require('../services/wishlistService')
const productsDataLoader = require('../services/productsService').productsDataLoader
const { secretKey } = require('../config').config;

async function getWishlist(req, res, next){
    let result = await Service.getWishlist(req.cookies.user.token);
    if(result === "Invalid Token") return res.redirect("/auth/login")
    if(result === "There is no wishlist created for this user") result = 'no items'

    if(result !== 'no items'){
        for(let variant of result.items){
            variant.variation = [];
            let datad = await productsDataLoader(`id=${variant.productId}`);
            variant.product = datad;
            variant.total = (variant.quantity * variant.variant.price).toFixed(2);
            for(let prop in variant.variant.variation_values){
                variant.variation.push([prop, variant.variant.variation_values[prop]])
            }
        }
    }

    let links = [{ link: "/profile", ap: "Profile" }, { link: '', ap: "Wishlist" }];
    let user = req.cookies.user;

    return res.render('wishlist', { 
        result, 
        links, 
        title: "Wishlist", 
        user 
    })
}

async function addItem(req, res, next){
    let response = '';
    let body = {
        "secretKey": secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id,
    }

    body["quantity"] = req.body.quantity === null ? 1 : req.body.quantity ;
    response = await Service.addItemToWishlist(req.cookies.user.token, body)

    if(response.response && response.response.data.error === 'This Item is already in your wishlist'){
        let item = await Service.getItemFromWishlist(req.cookies.user.token, req.body.variant_id);
        if(item instanceof Error) return next(item)
        body["quantity"] = req.body.quantity + item.quantity;

        await Service.changeQuantity(req.cookies.user.token, body)
    }

    return res.status(201).end()
}

async function removeItem(req, res, next){
    let body = {
        "secretKey": secretKey,
        "productId": req.body.product_id,
        "variantId": req.body.variant_id
    }
    let response = await Service.removeItemFromWishlist(req.cookies.user.token, body)
    if(response instanceof Error) return next(response)

    return res.status(200).end()
}

async function changeQuantity(req, res, next){
    let body = {
        "secretKey": secretKey,
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