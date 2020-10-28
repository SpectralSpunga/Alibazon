/**
 * @jest-environment node
 */
const Auth = require('../../app/services/auth/index')()
const { secretKey } = require('../../app/config').config

describe('signIn', ()=>{
    test("should login user if he is registered", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":"ffffffffffff"
        }
        const result = await Auth.signIn(body)
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("user");
    })

    test("shouldn't login user if he isn't registered", async ()=>{
        let body = {
            secretKey,
            "email":"dwwdwd@gmaillaile.com",
            "password":"wksjwdkwjdkwj"
        }
        const result = await Auth.signIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "User not found");
    })

    test("shouldn't login user if password is invalid", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":""
        }
        const result = await Auth.signIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "Invalid password");
    })

    test("shouldn't login user if email is empty", async ()=>{
        let body = {
            secretKey,
            "email":"",
            "password":"ffffffffffff"
        }
        const result = await Auth.signIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "User not found");
    })
})