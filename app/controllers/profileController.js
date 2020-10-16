const Service = require('../services/profileService')

async function profile(req, res, next){

    let profileObj = await Service.getProfile(req.cookies.user.token)

    let links = [{ link: "", ap: "Profile" }]
    let user = "none";
    if(req.cookies.user !== "none") user = req.cookies.user;

    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(user.user.createdAt).toLocaleDateString('en-US', options)
    
    res.render('profile', 
    { 
        links, 
        user,
        date,
        title: user.user.name, 
        cart: profileObj.profileCart, 
        wishlist: profileObj.profileWishlist,

    });
}

module.exports = {
    profile
}