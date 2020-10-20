const Service = require('../services/orderService');
const getCart = require('../services/cartService').getCart
const { secretKey, STRIPE_SECRET_KEY } = require('../config').config;

async function createOrder(req, res, next){
    const stripe = require('stripe')(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve( req.cookies.session_id );

    let cart = await getCart(req.cookies.user.token);
    let body = {
        secretKey,
        paymentId: req.cookies.payment_id,
        address: session.shipping.address.country,
        items: cart.items 
    }

    await Service.createOrder(req.cookies.user.token, body);
    res.status(201).end()
}

async function successOrder(req, res, next){
    let links = [{ link: "/profile", ap: "Profile" }];
    let user = req.cookies.user;
    res.render('successOrder', {user, title: "Success", links})
}


module.exports = {
    createOrder,
    successOrder
}