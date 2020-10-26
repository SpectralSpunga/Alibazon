function Wishlist(){
    const get = require('./get');
    const addItem = require('./addItem')
    const removeItem = require('./removeItem')
    const changeQuantity = require('./changeQuantity')
    const getItem = require('./getItem')

    return {
        get,
        addItem,
        removeItem,
        changeQuantity,
        getItem
    }
}

module.exports = Wishlist;