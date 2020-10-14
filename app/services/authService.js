const axios = require('axios');
const { API } = require('../config').config;

async function authSignUp(body){
    try{
        let headers = { "Content-Type":"application/json" }
        let signUp = await axios({
            url: `${API}/auth/signup`,
            method: 'post',
            data: body,
            headers
        });

        return signUp.data;
    } catch(err){
        return err;
    }
}

async function authSignIn(body){
    try{
        let headers = { "Content-Type":"application/json" }
        let signIn = await axios({
            url: `${API}/auth/signin`,
            method: 'post',
            data: body,
            headers
        });

        return signIn.data;
    } catch(err){
        return err;
    }
}

module.exports = {
    authSignUp,
    authSignIn
}