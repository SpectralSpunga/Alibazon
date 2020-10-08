const expect = require('chai').expect;

describe('API calls', function(){
    describe('productsDataLoader', function(){
        const productsDataLoader = require('../app/helpers/productsDataLoader').productsDataLoader;

        let requestURL = "primary_category_id=mens-clothing-jackets";
        let wrongRequestURL = "primary_category_id=mens-jewelry-pockets"

        it('successfully loads data from API if the URL is right', async function(){
            let result = await productsDataLoader(requestURL);
            expect(result).to.be.an('object');
        })
        it("throws an error if the URL doesn't exist", async function(){
            let result = await productsDataLoader(wrongRequestURL);
            expect(result).to.be.an('error');
        })
    })

    describe('categoryDataLoader', function(){
        const categoryDataLoader = require('../app/helpers/categoryDataLoader').categoryDataLoader;
        let category = 'mens-clothing';
        let wrongCategory = 'mens-clothunk';

        it('successfully loads data from API if the URL is right', async function(){
            let result = await categoryDataLoader(category);
            expect(result).to.be.an('object');
        })
        it("throws an error if the URL doesn't exist", async function(){
            let result = await categoryDataLoader(wrongCategory);
            expect(result).to.be.an('error');})
    })
})