const { secretKey } = require('../config').config;

function secretKeyAdder(req, res, next){
    req.body.secretKey = secretKey;
    next()
}

module.exports = { secretKeyAdder }