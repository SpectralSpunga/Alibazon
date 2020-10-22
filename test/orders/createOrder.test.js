/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Services = require('../../app/services/allServices')
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTE3YWYyNjZmZDdjMDAyNGE4OTIzMyIsImlhdCI6MTYwMzM2OTcxNCwiZXhwIjoxNjAzNDU2MTE0fQ.cSvbHRhhTo9wZs-C_9SUL71JJzLzutDhDDQYiWQVq4c"

describe('createOrder', ()=>{
    let body = {
        secretKey,
        paymentId: '121212212',
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

    test('should create a new order of the user with valid token', async ()=>{
        const order = await Services.createOrder(token, body)
        
        expect(order).toBeInstanceOf(Object)
        expect(order).toHaveProperty('address')
        expect(order).toHaveProperty('paymentId')
    })

    test("shouldn't add item to cart with invalid argument", async ()=>{
        const order = await Services.createOrder(token + "peepeepoopoo", body)

        expect(order).toBeInstanceOf(Error)
        expect(order.response.data.error).toEqual("Invalid Token")
    })
})