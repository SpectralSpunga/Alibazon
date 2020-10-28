/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Orders = require('../../app/services/orders/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('createOrder', ()=>{
    let body = {
        secretKey,
        paymentId: 'test_order',
        address: 'some address',
        items: [
            {
                variant: {
                    variantion_values: {
                        color: "C43",
                        size: "33"
                    },
                    price: 145,
                    product_id: "883360544250",
                    orderable: true
                },
                productId: "86736845",
                quantity: 11
            }
        ]
    }

    //--------DELETES CART-------------
    // test('should create a new order of the user with valid token', async ()=>{
    //     const order = await Orders.create(token, body)
        
    //     expect(order).toBeInstanceOf(Object)
    //     expect(order).toHaveProperty('address')
    //     expect(order).toHaveProperty('paymentId')
    // })

    test("shouldn't add item to cart with invalid argument", async ()=>{
        const order = await Orders.create(token + "peepeepoopoo", body)

        expect(order).toBeInstanceOf(Error)
        expect(order.response.data.error).toEqual("Invalid Token")
    })
})