/**
 * @jest-environment node
 */

const Products = require('../../app/services/products/index')()

describe('/products/product_search API calls', ()=>{
    test('productsDataLoader should return OBJECT with valid requestURL', async ()=>{
        const product1 = await Products.dataLoader(`id=25752986`)
        const products = await Products.dataLoader(`primary_category_id=womens-clothing-tops`)

        expect(product1).toBeInstanceOf(Array)
        expect(products).toBeInstanceOf(Array)

        expect(product1[0]).toHaveProperty('_id');
        expect(product1[0]).toHaveProperty('name');
        expect(product1[0]).toHaveProperty('price');

        expect(products[0]).toHaveProperty('_id');
        expect(products[0]).toHaveProperty('name');
        expect(products[0]).toHaveProperty('price');
    })

    test('productsDataLoader should return ERROR with invalid requestURL', async ()=>{
        const product1 = await Products.dataLoader(`id=257452986`)
        const product2 = await Products.dataLoader(`idff=25752986`)
        const products1 = await Products.dataLoader(`primary_category_id=womenss-clothing-tops`)
        const products2 = await Products.dataLoader(`primary_category_iddd=womens-clothing-tops`)

        expect(product1).toBeInstanceOf(Error)
        expect(product2).toBeInstanceOf(Error)
        expect(products1).toBeInstanceOf(Error)
        expect(products2).toBeInstanceOf(Error)
    })

    test('productsSearch should return ARRAY on query', async ()=>{
        const products = await Products.search('mens')
        expect(products).toBeInstanceOf(Array)
    })
})