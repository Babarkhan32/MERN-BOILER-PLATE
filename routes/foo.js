const express = require("express");
const router = express.Router();
const fooController = require("../controllers/foo");
const validator = require('../middlewares/validator')

router.post("/signup",validator('userSignup','body'), fooController.create);

router.get("/foo",fooController.get)

router.delete("/:user_id", validator('userDelete',"params"),fooController.remove);

router.patch("/:user_id/update", validator('userUpdate',"both"),fooController.update);

module.exports = router;