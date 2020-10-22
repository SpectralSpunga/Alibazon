/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('addItemToWishlist', ()=>{
    test('should add item to wishlist with valid arguments', async ()=>{
        let body = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity":2
        }
        const wishlist = await Services.addItemToWishlist(token, body)

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
        const wishlist1 = await Services.addItemToWishlist(token + "peepeepoopoo", body1)
        const wishlist3 = await Services.addItemToWishlist(token, body3)
        const wishlist4 = await Services.addItemToWishlist(token, body4)

        expect(wishlist1).toBeInstanceOf(Error)
        expect(wishlist1.response.data.error).toEqual("Invalid Token")
        expect(wishlist3).toBeInstanceOf(Error)
        expect(wishlist3.response.data.error).toEqual("Product Not Found")
        expect(wishlist4).toBeInstanceOf(Error)
        expect(wishlist4.response.data.error).toEqual("You must inform a valid Variant ID for this Product")
    })
})