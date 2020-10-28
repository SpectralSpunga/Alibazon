/**
 * @jest-environment node
 */
const Wishlist = require('../../app/services/wishlist/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('getWishlist', ()=>{
    test('should return wishlist of the user with valid token', async ()=>{
        const wishlist = await Wishlist.get(token)
        
        if(wishlist !== 'There is no Wishlist created for this user'){
            expect(wishlist).toBeInstanceOf(Object)
            expect(wishlist).toHaveProperty('userId')
            expect(wishlist).toHaveProperty('items')
        }
    })

    test("shouldn't return wishlist of the user with invalid token", async ()=>{
        const wishlist = await Wishlist.get(token + "peepeepoopoo")

        expect(wishlist).toEqual('Invalid Token')
    })
})