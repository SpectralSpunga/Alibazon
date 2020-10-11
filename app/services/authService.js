const axios = require('axios');
const { secretKey, API } = require('../config').config;

async function authSignUp(body){
    try{
        let headers = { "Content-Type":"application/json" }
        let datad = await axios({
            url: `${API}/auth/signup`,
            method: 'post',
            data: body,
            headers
        });

        return datad.data;
        
    } catch(err){
        return err;
    }
}

async function authSignIn(body){
    try{
        let headers = { "Content-Type":"application/json" }
        let datad = await axios({
            url: `${API}/auth/signin`,
            method: 'post',
            data: body,
            headers
        });

        return datad.data;
        
    } catch(err){
        return err;
    }
}

module.exports = {
    authSignUp,
    authSignIn
}