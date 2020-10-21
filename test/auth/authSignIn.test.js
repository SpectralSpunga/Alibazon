/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const { secretKey } = require('../../app/config').config

describe('authSignIn', ()=>{
    test("should login user if he is registered", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":"ffffffffffff"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("user");
    })

    test("shouldn't login user if he isn't registered", async ()=>{
        let body = {
            secretKey,
            "email":"dwwdwd@gmaillaile.com",
            "password":"wksjwdkwjdkwj"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "User not found");
    })

    test("shouldn't login user if secretKey is invalid", async ()=>{
        let body = {
            "secretKey": "peepeepoopoo",
            "email":"testemail@gmaillaile.com",
            "password":"123456789qqq"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "Invalid Secret Key");
    })

    test("shouldn't login user if password is invalid", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":""
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "Invalid password");
    })

    test("shouldn't login user if email is empty", async ()=>{
        let body = {
            secretKey,
            "email":"",
            "password":"ffffffffffff"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "User not found");
    })
})