/**
 * @jest-environment node
 */

//const { secretKey } = require('../app/config').config
const Category = require('../../app/services/category/index')()

describe('Category dataLoader', ()=>{
    test('should return OBJECT with valid category', async ()=>{
        const mens = await Category.dataLoader('mens')
        const mensClothing = await Category.dataLoader('mens-clothing')
        const mensClothingJackets = await Category.dataLoader('mens-clothing-jackets')

        expect(mens).toBeInstanceOf(Object);
        expect(mensClothing).toBeInstanceOf(Object);
        expect(mensClothingJackets).toBeInstanceOf(Object);

        expect(mens).toHaveProperty('data');
        expect(mens).toHaveProperty('mainCategory');
    })

    test('should return ERROR with invalid category', async ()=>{
        const mens = await Category.dataLoader('menssss')
        const mensClothing = await Category.dataLoader('mensas-clothing')
        const mensClothingJackets = await Category.dataLoader('aasmens-clothing-jackets')

        expect(mens).toBeInstanceOf(Error);
        expect(mensClothing).toBeInstanceOf(Error);
        expect(mensClothingJackets).toBeInstanceOf(Error);
    })
})