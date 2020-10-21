/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getWishlist', ()=>{
    test('should return wishlist of the user with valid token', async ()=>{
        const wishlist = await Services.getWishlist(token)
        
        if(wishlist !== 'There is no Wishlist created for this user'){
            expect(wishlist).toBeInstanceOf(Object)
            expect(wishlist).toHaveProperty('userId')
            expect(wishlist).toHaveProperty('items')
        }
    })

    test("shouldn't return wishlist of the user with invalid token", async ()=>{
        const wishlist = await Services.getWishlist(token + "peepeepoopoo")

        expect(wishlist).toEqual('Invalid Token')
    })
})