/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Wishlist = require('../../app/services/wishlist/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Wishlist addItem', ()=>{
    test('should add item to wishlist with valid arguments', async ()=>{
        let body = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity":2
        }
        const wishlist = await Wishlist.addItem(token, body)

        expect(wishlist).toEqual('Successfully added item')
    })

    test("shouldn't add item to wishlist with invalid argument", async ()=>{
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
        const wishlist1 = await Wishlist.addItem(token + "peepeepoopoo", body1)
        const wishlist3 = await Wishlist.addItem(token, body3)
        const wishlist4 = await Wishlist.addItem(token, body4)

        expect(wishlist1).toBeInstanceOf(Error)
        expect(wishlist1.response.data.error).toEqual("Invalid Token")
        expect(wishlist3).toBeInstanceOf(Error)
        expect(wishlist3.response.data.error).toEqual("Product Not Found")
        expect(wishlist4).toBeInstanceOf(Error)
        expect(wishlist4.response.data.error).toEqual("You must inform a valid Variant ID for this Product")
    })
})