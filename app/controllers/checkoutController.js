const { STRIPE_SECRET_KEY } = require('../config').config;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

async function checkout(req, res, next){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: `http://localhost:3000/orders/success`,
        cancel_url: 'http://localhost:3000/orders/fail',
        "billing_address_collection": "required",
        "shipping_address_collection": {
            allowed_countries: ['US', 'CA', 'UA'],
          }
    });
    res.cookie('session_id', session.id, { httpOnly: true });
    res.cookie('payment_id', session.payment_intent, { httpOnly: true });
    
    res.json({ id: session.id });
}

module.exports = {
    checkout
}