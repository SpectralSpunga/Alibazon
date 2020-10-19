function checkCookie(req, res, next){
    if(req.cookies.user.user){
        next()
    }
    else res.redirect('/auth/login')
}

module.exports = { checkCookie }