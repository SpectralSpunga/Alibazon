/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

//--------MAKE A CART AFTER THIS TEST TO TEST OTHER CALLS----------
describe('cleanCart', ()=>{
    // test("should clean cart when payment succeeded", async ()=>{
    //     const cart = await Services.cleanCart(token)
    //     if(cart.message && cart.message !== 'There is no cart created for this user'){
    //         expect(cart).toEqual('Cart has been cleaned')
    //     }
    // })

    test("shouldn't clean cart with invalid token", async ()=>{
        const cart = await Services.cleanCart(token + "peepeepoopoo")
        
        expect(cart).toBeInstanceOf(Error)
    })
})