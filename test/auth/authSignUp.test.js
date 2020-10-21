/**
 * @jest-environment node
 */

const Services = require('../../app/services/allServices')
const { secretKey } = require('../../app/config').config

describe('authSignUp', ()=>{
    //------------------CAN BE PASSED ONLY WITH NEW USER------------------
    //
    // test("should register new user if he doesn't exist yet", async ()=>{
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

    test("shouldn't register new user if he already exists", async ()=>{
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

    test("shouldn't register new user if secretKey is invalid", async ()=>{
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

    test("shouldn't register new user if one of the fields is empty", async ()=>{
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