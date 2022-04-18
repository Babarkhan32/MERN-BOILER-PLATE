const {Foo} = require('../schema/foo')

module.exports = {
    createUser: async (user) => {
        return await Foo.collection.insertOne(user);
    },
    getUsers: async (filter) => {
        return await Foo.find(filter);
    },
    deleteUser: async (ID) => {
    return await Foo.deleteOne({_id:ID})
    },
    updateUser: async(ID,user) => {
        return await Foo.updateOne({_id:ID},user)
    }
}