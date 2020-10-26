const Profile = require('../services/profile/index')()

async function profile(req, res, next){
    let profileObj = await Profile.get(req.cookies.user.token);
    let links = [{ link: "", ap: "Profile" }]
    let user = req.cookies.user;
    let options = { year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(user.user.createdAt).toLocaleDateString('en-US', options)
    
    res.render('profile',  
    { 
        links, 
        user,
        date,
        title: user.user.name, 
        cart: profileObj.profileCart, 
        wishlist: profileObj.profileWishlist,
        orders : profileObj.profileOrders
    });
}

module.exports = {
    profile
}