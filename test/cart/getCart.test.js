/**
 * @jest-environment node
 */
const Cart = require('../../app/services/cart/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Cart get', ()=>{
    test('should return cart of the user with valid token', async ()=>{
        const cart = await Cart.get(token)
        
        if(cart !== 'There is no cart created for this user'){
            expect(cart).toBeInstanceOf(Object)
            expect(cart).toHaveProperty('userId')
            expect(cart).toHaveProperty('items')
        }
    })

    test("shouldn't return cart of the user with invalid token", async ()=>{
        const cart = await Cart.get(token + "peepeepoopoo")

        expect(cart).toEqual('Invalid Token')
    })
})