require('dotenv').config()

const config = {
    secretKey: process.env.secretKey,
    API: process.env.API
};
   
module.exports ={
    config
};