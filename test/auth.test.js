/**
 * @jest-environment node
 */

const Services = require('../app/services/allServices')
const { secretKey } = require('../app/config').config

describe('/auth/signup API calls', ()=>{
    //------------------CAN BE PASSED ONLY WITH NEW USER------------------
    //
    // test("authSignUp should register new user if he doesn't exist yet", async ()=>{
    //     let body = {
    //         secretKey,
    //         "name":"testikalko",
    //         "email":"testemssail@gm.com",
    //         "password":"1234sssios"
    //     }
    //     const result = await Services.authSignUp(body)

    //     expect(result).toBeInstanceOf(Object);
    //     expect(result).toHaveProperty("user");
    // })

    test("authSignUp shouldn't register new user if he already exists", async ()=>{
        let body = {
            secretKey,
            "name":"test_name228",
            "email":"testemail@gmaillaile.com",
            "password":"123456789qqq"
        }
        const result = await Services.authSignUp(body)

        expect(result.response.data).toBeDefined();
        expect(result.response.data).toHaveProperty('error', "User already exists");
    })

    test("authSignUp shouldn't register new user if secretKey is invalid", async ()=>{
        let body = {
            "secretKey": "peepeepoopoo",
            "name":"test_name228",
            "email":"testemail@gmaillaile.com",
            "password":"123456789qqq"
        }
        const result = await Services.authSignUp(body)

        expect(result.response.data).toBeDefined();
        expect(result.response.data).toHaveProperty('error', "Invalid Secret Key");
    })

    test("authSignUp shouldn't register new user if one of the fields is empty", async ()=>{
        let body1 = {
            secretKey,
            "name":"",
            "email":"testemail@gmaillaile.com",
            "password":"123456789qqq"
        }

        let body2 = {
            secretKey,
            "name":"pepepe",
            "email":"",
            "password":"123456789qqq"
        }

        let body3 = {
            secretKey,
            "name":"pepepe",
            "email":"pepepepp@gmail.com",
            "password":""
        }

        const result1 = await Services.authSignUp(body1)
        const result2 = await Services.authSignUp(body2)
        const result3 = await Services.authSignUp(body3)

        expect(result1).toBeInstanceOf(Error);
        expect(result2).toBeInstanceOf(Error);
        expect(result3).toBeInstanceOf(Error);
    })
})

describe('/auth/signin API calls', ()=>{
    test("authSignIn should login user if he is registered", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":"ffffffffffff"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("user");
    })

    test("authSignIn shouldn't login user if he isn't registered", async ()=>{
        let body = {
            secretKey,
            "email":"dwwdwd@gmaillaile.com",
            "password":"wksjwdkwjdkwj"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "User not found");
    })

    test("authSignIn shouldn't login user if secretKey is invalid", async ()=>{
        let body = {
            "secretKey": "peepeepoopoo",
            "email":"testemail@gmaillaile.com",
            "password":"123456789qqq"
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "Invalid Secret Key");
    })

    test("authSignIn shouldn't login user if password is invalid", async ()=>{
        let body = {
            secretKey,
            "email":"56456456@dfg",
            "password":""
        }
        const result = await Services.authSignIn(body)
        expect(result).toBeInstanceOf(Error);
        expect(result.response.data).toHaveProperty('error', "Invalid password");
    })

    test("authSignIn shouldn't login user if email is empty", async ()=>{
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