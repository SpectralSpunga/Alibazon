const Service = require('../services/authService')
const { secretKey } = require('../config').config;

function authSignUp(req, res, next){
    return res.render('signup',{ links: [{ap: "AUTH"}], user: 'none', title: "Sign Up" })
}

function authSignIn(req, res, next){
    return res.render('signin',{ links: [{ap: "AUTH"}], user: 'none', title: "Sign In" })
}

async function logout(req, res, next){
    res.cookie('user', 'none', { httpOnly: true });
    return res.redirect('/category/mens')
}

async function postSignUp(req, res, next){
    req.body.secretKey = secretKey;
    let body = JSON.stringify(req.body)
    let obj = await Service.authSignUp(body);
    if(obj.user){
        let user = {
            name: obj.user.name,
            email: obj.user.email,
            date: obj.user.createdAt,
            token: obj.token
        }
        res.cookie('user', user, { httpOnly: true, expires: new Date(Date.now() + 24 * 3600000) });
        return res.redirect('/category/mens');
    }
    else{
        return res.status(400).json({error: "User already exists"})
    }
}

async function postSignIn(req, res, next){
    req.body.secretKey = secretKey;
    let body = JSON.stringify(req.body)
    let obj = await Service.authSignIn(body);
    if(obj.user){
        let user = {
            name: obj.user.name,
            email: obj.user.email,
            date: obj.user.createdAt,
            token: obj.token
        }
        res.cookie('user', user, { httpOnly: true, expires: new Date(Date.now() + 24 * 3600000) });
        return res.redirect('/category/mens')
    }
    else{
        return res.redirect("/auth/login")
    }
}

module.exports = {
    authSignUp,
    postSignUp,
    authSignIn,
    postSignIn,
    logout
}