function checkCookie(req, res, next){
    if(req.cookies && req.cookies.user && req.cookies.user.user){
        return next()
    }
    else res.redirect('/auth/login')
}

module.exports = { checkCookie }