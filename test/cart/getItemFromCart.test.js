/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getItemFromCart', ()=>{
    test("should return item from cart if it exists", async ()=>{
        let item_id = '883360541488'
        const cart = await Services.getItemFromCart(token, item_id)

        expect(cart).not.toBeInstanceOf(Error)
        expect(cart).toBeInstanceOf(Object)
        expect(cart).toHaveProperty('productId')
        expect(cart).toHaveProperty('quantity')
    })
    test("shouldn't return item from cart if it doesn't exists", async ()=>{
        let item_id = '233'
        const cart = await Services.getItemFromCart(token, item_id)

        expect(cart).toBeInstanceOf(Object)
        expect(cart.error).toEqual('Variant not found')
    })

    test("shouldn't return item from cart with invalid token", async ()=>{
        let item_id = '701642838852'
        const cart = await Services.getItemFromCart(token + "peepeepoopoo", item_id)
        
        expect(cart).toBeInstanceOf(Error)
        expect(cart.response.data.error).toEqual('Invalid Token')
    })
})