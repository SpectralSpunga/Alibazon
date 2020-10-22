/**
 * @jest-environment node
 */
const Services = require('../../app/services/allServices')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODE3MjM3NjVkYzRiMDAyNDlmNjU1MyIsImlhdCI6MTYwMzI4ODI1NSwiZXhwIjoxNjAzMzc0NjU1fQ.qSyGQftv7WPqCBnFVPxJtTkT5qKEGgGfy-EnlGRNV_k";

describe('getProfile', ()=>{
    test('should return profile of the user with valid token', async ()=>{
        const profile = await Services.getProfile(token)

        expect(profile).toBeInstanceOf(Object)
        expect(profile).toHaveProperty('profileCart')
        expect(profile).toHaveProperty('orders')
        
    })

    test("shouldn't return profile of the user with invalid token", async ()=>{
        const profile = await Services.getProfile(token + "peepeepoopoo")

        expect(profile.response.data.error).toEqual('Invalid Token')
    })
})