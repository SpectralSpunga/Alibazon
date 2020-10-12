const expect = require('chai').expect;
const { secretKey } = require('../app/config').config

describe('API calls', function(){
    describe('productsDataLoader', function(){
        describe('productsDataLoader', function(){
            const productsDataLoader = require('../app/services/productsService').productsDataLoader;

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

        describe('search', function(){
            const search = require('../app/services/productsService').search;

            let q = "men's";
            it('successfully searches products from API', function(done){
                let result = search(q);
                done()
                expect(result).to.be.an('array');
            })
        })
    })

    describe('categoryDataLoader', function(){
        const categoryDataLoader = require('../app/services/categoryService').categoryDataLoader;
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

    describe('authService', function(){
        describe('authSignUp', function(){
            const authSignUp = require('../app/services/authService').authSignUp;
            it('successfully returns with error if a user already exists', async function(){
                let body = {
                    "secretKey":secretKey,
                    "name":"test_name",
                    "email":"testemail@gmail.com",
                    "password":"123456789"
                }
                let result = await authSignUp(body);
                expect(result).to.be.an('error');
            })
        })

        describe('authSignIn', function(){
            const authSignIn = require('../app/services/authService').authSignIn;
            it('successfully signs in a user if he exists', async function(){
                let body = {
                    "secretKey":secretKey,
                    "email":"testemail@gmail.com",
                    "password":"123456789"
                }
                let result = await authSignIn(body);
                expect(result).to.be.an('object');
            })
        })
    })
})