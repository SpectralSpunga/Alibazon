/**
 * @jest-environment node
 */
const Wishlist = require('../../app/services/wishlist/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Wishlist getItem', ()=>{
    test("should return item from wishlist if it exists", async ()=>{
        let item_id = '701643540037'
        const wishlist = await Wishlist.getItem(token, item_id)

        expect(wishlist).not.toBeInstanceOf(Error)
        expect(wishlist).toBeInstanceOf(Object)
        expect(wishlist).toHaveProperty('productId')
        expect(wishlist).toHaveProperty('quantity')
    })
    test("shouldn't return item from wishlist if it doesn't exists", async ()=>{
        let item_id = '233'
        const wishlist = await Wishlist.getItem(token, item_id)

        expect(wishlist).toBeInstanceOf(Object)
        expect(wishlist.error).toEqual('Variant not found')
    })

    test("shouldn't return item from wishlist with invalid token", async ()=>{
        let item_id = '701642838852'
        const wishlist = await Wishlist.getItem(token + "peepeepoopoo", item_id)
        
        expect(wishlist).toBeInstanceOf(Error)
        expect(wishlist.response.data.error).toEqual('Invalid Token')
    })
})