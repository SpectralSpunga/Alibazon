/**
 * @jest-environment node
 */
const Cart = require('../../app/services/cart/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('getItemFromCart', ()=>{
    test("should return item from cart if it exists", async ()=>{
        let item_id = '701643540037'
        const cart = await Cart.getItem(token, item_id)

        expect(cart).not.toBeInstanceOf(Error)
        expect(cart).toBeInstanceOf(Object)
        expect(cart).toHaveProperty('productId')
        expect(cart).toHaveProperty('quantity')
    })
    test("shouldn't return item from cart if it doesn't exists", async ()=>{
        let item_id = '233'
        const cart = await Cart.getItem(token, item_id)

        expect(cart).toBeInstanceOf(Object)
        expect(cart.error).toEqual('Variant not found')
    })

    test("shouldn't return item from cart with invalid token", async ()=>{
        let item_id = '701642838852'
        const cart = await Cart.getItem(token + "peepeepoopoo", item_id)
        
        expect(cart).toBeInstanceOf(Error)
        expect(cart.response.data.error).toEqual('Invalid Token')
    })
})