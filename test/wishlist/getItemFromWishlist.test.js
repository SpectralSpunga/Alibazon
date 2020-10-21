/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getItemFromWishlist', ()=>{
    test("should return item from wishlist if it exists", async ()=>{
        let item_id = '883360541488'
        const wishlist = await Services.getItemFromWishlist(token, item_id)

        expect(wishlist).not.toBeInstanceOf(Error)
        expect(wishlist).toBeInstanceOf(Object)
        expect(wishlist).toHaveProperty('productId')
        expect(wishlist).toHaveProperty('quantity')
    })
    test("shouldn't return item from wishlist if it doesn't exists", async ()=>{
        let item_id = '233'
        const wishlist = await Services.getItemFromWishlist(token, item_id)

        expect(wishlist).toBeInstanceOf(Object)
        expect(wishlist.error).toEqual('Variant not found')
    })

    test("shouldn't return item from wishlist with invalid token", async ()=>{
        let item_id = '701642838852'
        const wishlist = await Services.getItemFromWishlist(token + "peepeepoopoo", item_id)
        
        expect(wishlist).toBeInstanceOf(Error)
        expect(wishlist.response.data.error).toEqual('Invalid Token')
    })
})