function Orders(){
    const get = require('./get');
    const create = require('./create')

    return {
        get,
        create
    }
}

module.exports = Orders;