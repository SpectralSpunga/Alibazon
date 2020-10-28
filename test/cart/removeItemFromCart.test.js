/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Cart = require('../../app/services/cart/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('removeItemFromCart', ()=>{
    //---------CAN BE PASSED ONLY WITH NEW BODY EACH TIME----------
    // test("should remove item from cart if item is in cart", async ()=>{
    //     let body = {
    //         secretKey,
    //         "productId": "21736758",
    //         "variantId": "883360541259"
    //     }

    //     const cart = await Cart.removeItem(token, body)

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
        const cart1 = await Cart.removeItem(token + "peepeepoopoo", body1)
        const cart3 = await Cart.removeItem(token, body3)
        const cart4 = await Cart.removeItem(token, body4)
        const cart5 = await Cart.removeItem(token, body5)

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