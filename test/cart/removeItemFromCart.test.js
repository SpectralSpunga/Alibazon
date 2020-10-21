/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('removeItemFromCart', ()=>{
    //---------CAN BE PASSED ONLY WITH NEW BODY EACH TIME----------
    // test("should remove item from cart if item is in cart", async ()=>{
    //     let body = {
    //         secretKey,
    //         "productId": "25518241",
    //         "variantId": "701642838852"
    //     }

    //     const cart = await Services.removeItemFromCart(token, body)

    //     expect(cart).toBeInstanceOf(Object)
    //     expect(cart).toHaveProperty('userId')
    //     expect(cart).toHaveProperty('items')
    // })

    test("shouldn't remove item from cart with invalid argument", async ()=>{
        let body1 = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037"
        }

        let body3 = {
            secretKey,
            "productId": "255",
            "variantId": "701643540037"
        }

        let body4 = {
            secretKey,
            "productId": "25565189",
            "variantId": "7"
        }

        let body5 = {
            secretKey,
            "productId": "21736758",
            "variantId": "883360541259"
        }
        const cart1 = await Services.removeItemFromCart(token + "peepeepoopoo", body1)
        const cart3 = await Services.removeItemFromCart(token, body3)
        const cart4 = await Services.removeItemFromCart(token, body4)
        const cart5 = await Services.removeItemFromCart(token, body5)

        expect(cart1).toBeInstanceOf(Error)
        expect(cart1.response.data.error).toEqual("Invalid Token")
        expect(cart3).toBeInstanceOf(Error)
        expect(cart3.response.data.error).toEqual("Product Not Found")
        expect(cart4).toBeInstanceOf(Error)
        expect(cart4.response.data.error).toEqual("You must inform a valid Variant ID for this Product")
        expect(cart5).toBeInstanceOf(Error)
        expect(cart5.response.data.error).toEqual("This item is not in your Cart")
    })
})