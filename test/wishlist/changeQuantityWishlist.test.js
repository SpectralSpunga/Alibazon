/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Wishlist = require('../../app/services/wishlist/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Wishlist changeQuantity', ()=>{
    test("should change quantity of item in wishlist with valid arguments", async ()=>{
        let body = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity": 20
        }

        const wishlist = await Wishlist.changeQuantity(token, body)

        expect(wishlist).toBeInstanceOf(Object)
        expect(wishlist).toHaveProperty('userId')
        expect(wishlist).toHaveProperty('items')
    })
    test("shouldn't change quantity of item in wishlist with invalid arguments", async ()=>{
        let body1 = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity":2
        }

        let body3 = {
            secretKey,
            "productId": "255",
            "variantId": "701643540037",
            "quantity":2
        }

        let body4 = {
            secretKey,
            "productId": "25565189",
            "variantId": "7",
            "quantity":2
        }

        let body5 = {
            secretKey,
            "productId": "21736758",
            "variantId": "883360541259",
            "quantity":2
        }

        const wishlist1 = await Wishlist.changeQuantity(token + "peepeepoopoo", body1)
        const wishlist3 = await Wishlist.changeQuantity(token, body3)
        const wishlist4 = await Wishlist.changeQuantity(token, body4)
        const wishlist5 = await Wishlist.changeQuantity(token, body5)

        expect(wishlist1).toBeInstanceOf(Error)
        expect(wishlist1.response.data.error).toEqual("Invalid Token")
        expect(wishlist3).toBeInstanceOf(Error)
        expect(wishlist3.response.data.error).toEqual("Product Not Found")
        expect(wishlist4).toBeInstanceOf(Error)
        expect(wishlist4.response.data.error).toEqual("You must inform a valid Variant ID for this Product")
        expect(wishlist5).toBeInstanceOf(Error)
        expect(wishlist5.response.data.error).toEqual("This item is not in your wishlist")
    })
})