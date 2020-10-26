function Auth(){
    const signIn = require('./signIn');
    const signUp = require('./signUp')

    return {
        signIn,
        signUp
    }
}

module.exports = Auth;