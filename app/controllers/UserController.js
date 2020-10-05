const userServices = require('../services/UserServices');

function helloWorld(req, res, next){
    const returnFromService = userServices.helloWorld();
    return res.status(200).render('homepage', {title: "PIK"});
}

module.exports = {
    helloWorld: helloWorld
  }
  