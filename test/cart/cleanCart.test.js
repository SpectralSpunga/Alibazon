/**
 * @jest-environment node
 */
const Cart = require('../../app/services/cart/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

//--------MAKE A CART AFTER THIS TEST TO TEST OTHER CALLS----------
describe('cleanCart', ()=>{
    // test("should clean cart when payment succeeded", async ()=>{
    //     const cart = await Cart.clean(token)
    //     expect(cart).toEqual('Cart has been cleaned')
    // })

    test("shouldn't clean cart with invalid token", async ()=>{
        const cart = await Cart.clean(token + "peepeepoopoo")
        
        expect(cart).toBeInstanceOf(Error)
    })
})