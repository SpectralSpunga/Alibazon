function checkCookie(req, res, next){
    if(req.cookies.user){
        next()
    }
    else res.redirect('/auth/login')
}

module.exports = { checkCookie }