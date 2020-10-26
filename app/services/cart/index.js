function Cart(){
    const get = require('./get');
    const addItem = require('./addItem')
    const removeItem = require('./removeItem')
    const changeQuantity = require('./changeQuantity')
    const getItem = require('./getItem')
    const clean = require('./clean')

    return {
        get,
        addItem,
        removeItem,
        changeQuantity,
        getItem,
        clean
    }
}

module.exports = Cart;