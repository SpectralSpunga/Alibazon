/**
 * pepe
 */
const axios = require('axios');
/**
 * popo
 */
const { API } = require('../../config').config;

/** Registers a new user if there is no such user in a database
 * @param { Object } body - name, email and password
 * @example 
 *  body = {
        secretKey: "<your secretkey>",
        name: "aaa",
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
async function signUp(body){
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

module.exports = signUp;