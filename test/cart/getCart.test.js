/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getCart', ()=>{
    test('should return cart of the user with valid token', async ()=>{
        const cart = await Services.getCart(token)
        
        if(cart !== 'There is no cart created for this user'){
            expect(cart).toBeInstanceOf(Object)
            expect(cart).toHaveProperty('userId')
            expect(cart).toHaveProperty('items')
        }
    })

    test("shouldn't return cart of the user with invalid token", async ()=>{
        const cart = await Services.getCart(token + "peepeepoopoo")

        expect(cart).toEqual('Invalid Token')
    })
})