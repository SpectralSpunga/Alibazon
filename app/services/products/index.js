function Products(){
    const dataLoader = require('./dataLoader');
    const search = require('./search')

    return {
        dataLoader,
        search
    }
}

module.exports = Products;