const Auth = require('../services/auth/index')()

function registerPage(req, res, next){
    if(req.cookies && req.cookies.user && req.cookies.user.user) return res.redirect('/category/mens')
    return res.render('signup',{ links: [{ap: "AUTH"}], user: 'none', title: "Sign Up" })
}

function loginPage(req, res, next){
    if(req.cookies && req.cookies.user && req.cookies.user.user) return res.redirect('/category/mens')
    return res.render('signin',{ links: [{ap: "AUTH"}], user: 'none', title: "Sign In" })
}

async function logout(req, res, next){
    res.cookie('user', "none", { httpOnly: true });
    return res.redirect('/category/mens')
}

async function postSignUp(req, res, next){
    let user = await Auth.signUp(req.body);
    if(user.user){
        res.cookie('user', user, { httpOnly: true });
        return res.redirect('/category/mens');
    }
    else{
        return res.status(400).json({error: "User already exists"})
    }
}

async function postSignIn(req, res, next){
    let user = await Auth.signIn(req.body);
    if(user.user){
        res.cookie('user', user, { httpOnly: true });
        return res.redirect('/category/mens')
    }
    else{
        return res.redirect("/auth/login")
    }
}

module.exports = {
    registerPage,
    postSignUp,
    loginPage,
    postSignIn,
    logout
}