require('dotenv').config()

const config = {
    secretKey: process.env.secretKey,
    API: process.env.API,
    STRIPE_PUBLIC_KEY : process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY
};
   
module.exports ={ config };