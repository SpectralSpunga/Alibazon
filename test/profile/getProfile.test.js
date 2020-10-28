/**
 * @jest-environment node
 */
const Profile = require('../../app/services/profile/index')()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTk5OTJjYzg1ZmNlMDAyNGQ2ZTJhOSIsImlhdCI6MTYwMzkwMTc0MCwiZXhwIjoxNjAzOTg4MTQwfQ.efpRMOIQAf5ZAlH2jqj1Rq01gCkR6AiRFR42NffVB3g';

describe('Profile get', ()=>{
    test('should return profile of the user with valid token', async ()=>{
        const profile = await Profile.get(token)

        expect(profile).toBeInstanceOf(Object)
        expect(profile).toHaveProperty('profileCart')
        expect(profile).toHaveProperty('profileOrders')
    })

    test("shouldn't return profile of the user with invalid token", async ()=>{
        const profile = await Profile.get(token + "peepeepoopoo")

        expect(profile).toBeInstanceOf(Error)
    })
})