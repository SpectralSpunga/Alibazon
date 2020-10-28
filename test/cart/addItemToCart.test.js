/**
 * @jest-environment node
 */
const { secretKey } = require('../../app/config').config
const Cart = require('../../app/services/cart/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Cart addItem', ()=>{
    test('should add item to cart with valid arguments', async ()=>{
        let body = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity": 2
        }
        const cart = await Cart.addItem(token, body)

        expect(cart).toEqual('Successfully added item')
    })

    test("shouldn't add item to cart with invalid argument", async ()=>{
        let body1 = {
            secretKey,
            "productId": "25565189",
            "variantId": "701643540037",
            "quantity":2
        }

        let body3 = {
            secretKey,
            "productId": "255",
            "variantId": "701643540037",
            "quantity":2
        }

        let body4 = {
            secretKey,
            "productId": "25565189",
            "variantId": "7",
            "quantity":2
        }
        const cart1 = await Cart.addItem(token + "peepeepoopoo", body1)
        const cart3 = await Cart.addItem(token, body3)
        const cart4 = await Cart.addItem(token, body4)

        expect(cart1).toBeInstanceOf(Error)
        expect(cart1.response.data.error).toEqual("Invalid Token")
        expect(cart3).toBeInstanceOf(Error)
        expect(cart3.response.data.error).toEqual("Product Not Found")
        expect(cart4).toBeInstanceOf(Error)
        expect(cart4.response.data.error).toEqual("You must inform a valid Variant ID for this Product")
    })
})