const Service = require('../services/authService')
const { secretKey } = require('../config').config;

function authSignUp(req, res, next){
    return res.render('signup',{ links: [{ap: "AUTH"}], secretKey, user: 'none'  })
}

function authSignIn(req, res, next){
    return res.render('signin',{ links: [{ap: "AUTH"}], secretKey, user: 'none' })
}

async function postSignUp(req, res, next){
    let body = JSON.stringify(req.body)
    let obj = await Service.authSignUp(body);
    if(obj.user){
        req.user = obj;
        res.cookie('user', req.user, { httpOnly: true });
        return res.redirect('/category/mens');
    }
    else{
        return res.status(400).json({error: "User already exists"})
    }
}

async function postSignIn(req, res, next){
    let body = JSON.stringify(req.body)
    let obj = await Service.authSignIn(body);
    if(obj.user){
        req.user = obj;
        res.cookie('user', req.user, { httpOnly: true });
        return res.redirect('/category/mens')
    }
    else{
        return res.status(401).json({error: "Forbidden"})
    }
}

async function logout(req, res, next){
    res.cookie('user', 'none', { httpOnly: true });
    return res.redirect('/category/mens')
}

module.exports = {
    authSignUp,
    postSignUp,
    authSignIn,
    postSignIn,
    logout
}