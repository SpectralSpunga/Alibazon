const axios = require('axios');
const { API } = require('../../config').config;

/** Logins a user if he has already registered
    @param { Object } body - email and password
    @example 
    body = {
        secretKey: "<your secretkey>",
        email: "aaa<at>gmail.com",
        password: "123456"
    }
    @returns { Object } user object with token
    @example 
    return response = { 
        user: {
            _id: "...",
            secretKey: "<your secretkey>",
            name: "aaa",
            email: "aaa<at>gmail.com",
            password: "...",
            createdAt: "...",
            __v: 0
            },
        token: "..." 
    }
 */
async function signIn(body){
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

module.exports = signIn;