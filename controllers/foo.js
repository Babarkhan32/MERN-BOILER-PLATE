const FooModel = require('../models/foo')
const mongoose = require("mongoose")

module.exports = {
  create: async (req, res) => {
    try {
      const { email, firstName } = req.body;

      if (!email) {
        return res.status(400).json({ message: "No firstName provided" });
      }

      const createdUser = await FooModel.createUser({ email, firstName })

      return res
        .status(200)
        .json({ id: createdUser.id, message: "Foo created successfully" });
    } catch (err) {
      console.error("Error creating user: ", err);
      return res.status(200).json({ message: "Oops! couldn't create a Foo" });
    }
  },

  remove: async (req, res) => {
    try {
      const { user_id } = req.params;

      await FooModel.deleteUser(user_id);

      return res.status(200).json({ message: "Foo removed successfully!" });
    } catch (err) {
      console.error(err, "Error while deleting Foo from db: ", err);
      return res.status(200).json({ message: "Couldn't delete Foo" });
    }
  },

  update: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { email } = req.body;
      console.log("user_id", user_id)
      const _id = mongoose.Types.ObjectId(user_id)
      await FooModel.updateUser(_id, { email })

      return res.status(204).json({ message: "Foo updated successfully" });
    } catch (err) {
      console.error("Error while updating Foo: ", err);
      return res.status(500).json({ message: err });
    }
  },

  get: async (req, res) => {
    try {
      const fooData = await FooModel.getUsers({});
      return res.status(200).json({ data: fooData })
    } catch (err) {
      console.error("Error While getting foo", err)
      return res.status(500).json({ error: err })
    }
  }
};