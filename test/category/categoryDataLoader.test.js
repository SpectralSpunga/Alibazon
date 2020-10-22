/**
 * @jest-environment node
 */

//const { secretKey } = require('../app/config').config
const Services = require('../../app/services/allServices')

describe('categoryDataLoader', ()=>{
    test('should return OBJECT with valid category', async ()=>{
        const mens = await Services.categoryDataLoader('mens')
        const mensClothing = await Services.categoryDataLoader('mens-clothing')
        const mensClothingJackets = await Services.categoryDataLoader('mens-clothing-jackets')

        expect(mens).toBeInstanceOf(Object);
        expect(mensClothing).toBeInstanceOf(Object);
        expect(mensClothingJackets).toBeInstanceOf(Object);

        expect(mens).toHaveProperty('data');
        expect(mens).toHaveProperty('mainCategory');
    })

    test('should return ERROR with invalid category', async ()=>{
        const mens = await Services.categoryDataLoader('menssss')
        const mensClothing = await Services.categoryDataLoader('mensas-clothing')
        const mensClothingJackets = await Services.categoryDataLoader('aasmens-clothing-jackets')

        expect(mens).toBeInstanceOf(Error);
        expect(mensClothing).toBeInstanceOf(Error);
        expect(mensClothingJackets).toBeInstanceOf(Error);
    })
})