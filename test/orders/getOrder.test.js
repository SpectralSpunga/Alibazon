/**
 * @jest-environment node
 */
const Orders = require('../../app/services/orders/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('getOrders', ()=>{
    test('should return orders of the user with valid token', async ()=>{
        const orders = await Orders.get(token)
        
        if(orders !== 'There are no orders for this user'){
            expect(orders).toBeInstanceOf(Array)
            expect(orders[0]).toHaveProperty('userId')
            expect(orders[0]).toHaveProperty('items')
        }
    })

    test("shouldn't return orders of the user with invalid token", async ()=>{
        const orders = await Orders.get(token + "peepeepoopoo")

        expect(orders).toEqual('Invalid Token')
    })
})