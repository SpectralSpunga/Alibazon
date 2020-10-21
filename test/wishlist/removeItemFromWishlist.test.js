/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('removeItemFromWishlist', ()=>{
    //---------CAN BE PASSED ONLY WITH NEW BODY EACH TIME----------
    // test("should remove item from wishlist if item is in Wishlist", async ()=>{
    //     let body = {
    //         secretKey,
    //         "productId": "25518241",
    //         "variantId": "701642838852"
    //     }

    //     const wishlist = await Services.removeItemFromWishlist(token, body)

    //     expect(wishlist).toBeInstanceOf(Object)
    //     expect(wishlist).toHaveProperty('userId')
    //     expect(wishlist).toHaveProperty('items')
    // })

    test("shouldn't remove item from Wishlist with invalid argument", async ()=>{
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
        const wishlist1 = await Services.removeItemFromWishlist(token + "peepeepoopoo", body1)
        const wishlist3 = await Services.removeItemFromWishlist(token, body3)
        const wishlist4 = await Services.removeItemFromWishlist(token, body4)
        const wishlist5 = await Services.removeItemFromWishlist(token, body5)

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