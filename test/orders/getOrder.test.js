/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getOrders', ()=>{
    test('should return orders of the user with valid token', async ()=>{
        const orders = await Services.getOrders(token)
        
        if(orders !== 'There are no orders for this user'){
            expect(orders).toBeInstanceOf(Array)
            expect(orders[0]).toHaveProperty('userId')
            expect(orders[0]).toHaveProperty('items')
        }
    })

    test("shouldn't return orders of the user with invalid token", async ()=>{
        const orders = await Services.getOrders(token + "peepeepoopoo")

        expect(orders).toEqual('Invalid Token')
    })
})