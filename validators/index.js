const foo = require('./foo.validator')

module.exports = {
    userSignup:foo.signup,
    userUpdate:foo.updateUser,
    userDelete:foo.deleteUser
}