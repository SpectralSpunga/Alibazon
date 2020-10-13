const Service = require('../services/cartService')
const pService = require('../services/productsService')
const { secretKey } = require('../config').config;

async function getCart(req, res, next){
    if(req.cookies.user){
        let result = await Service.getCart(req.cookies.user.token);
        if(result === "Invalid Token") return res.redirect("/auth/login")
        if(result === "There is no cart created for this user") result = 'no items'

        let links = [{ link: "/profile", ap: "Profile" }, { link: '', ap: "Shopping Cart" }];
        let user = req.cookies.user.name;

        return res.render('cart', { 
            result, 
            links, 
            title: "Cart", 
            user 
        })
    }
    else return res.json({error: "Forbidden"})
}

async function addCart(req, res, next){
    if(req.cookies.user){
        let variationsLength = Object.keys(req.body.variations).length;
        let count = 0;

        let product = await pService.productsDataLoader(`id=${req.body.product_id}`)
        if(product instanceof Error) return res.json({error: "Error"})
        const variants = product.data[0].variants;

        if(req.body.quantity === null){
            let body = {
                "secretKey": secretKey,
                "productId": req.body.product_id,
                "variantId": product.data[0].variants[0].product_id,
                "quantity": 1
            }
            await Service.addCart(req.cookies.user.token, body)
        }

        for(let elem of variants){
            for(let prop in req.body.variations){
                if(elem.variation_values[prop] == req.body.variations[prop]) count++
                else count = 0

                if(count === variationsLength){
                    let body = {
                        "secretKey": secretKey,
                        "productId": req.body.product_id,
                        "variantId": elem.product_id,
                        "quantity": req.body.quantity
                    }
                    await Service.addCart(req.cookies.user.token, body)

                    return res.json({variant: elem, product: product.data[0]});
                }
            }
        }
        return res.send('sold out')
    }
    else return res.redirect('/auth/login')
}

async function removeItem(req, res, next){
    if(req.cookies.user){
        let body = {
            "secretKey": secretKey,
            "productId": req.body.product_id,
            "variantId": req.body.variant_id
        }
        await Service.removeItem(req.cookies.user.token, body)
        return res.status(200).end()
    }
    else return res.redirect('/auth/login')
}

async function checkProduct(req, res, next){
    let objArr = Object.keys(req.body.variations).length;
    let count = 0;
    if(req.body.product_id){
        let product = await pService.productsDataLoader(`id=${req.body.product_id}`)
        if(product instanceof Error) return res.json({error: "Error"})

        const arr = product.data[0].variants;
        for(let elem of arr){
            for(let prop in req.body.variations){
                if(elem.variation_values[prop] == req.body.variations[prop]) count++
                else count = 0

                if(count === objArr){
                    return res.json({variant: elem, product: product.data[0]});
                }
            }
        }
    }
    return res.send('sold out');
}

module.exports = {
    getCart,
    addCart,
    checkProduct,
    removeItem
}