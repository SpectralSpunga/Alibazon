const Service = require('../services/cartService')
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
    else{
        return res.json({error: "Forbidden"})
    }
}

module.exports = {
    getCart
}