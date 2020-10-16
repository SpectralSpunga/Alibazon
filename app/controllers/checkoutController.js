const stripe = require('stripe')('sk_test_51HcsLmGeV8SUiJfKkhUVTRbJ1xddnbf5dcbR2pHiSl080ZHJrIiJJgNwvy22bXujx6txyl1XjZyuxqFKlR4eVBXi00ciM0v1mm');

async function checkout(req, res, next){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: `http://localhost:3000/order/success`,
        cancel_url: 'http://localhost:3000/order/fail',
    });
    res.cookie('session_id', session.id, { httpOnly: true, expires: new Date(Date.now() + 60000) });
    
    res.json({ id: session.id });
}

module.exports = {
    checkout
}