const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const fooRouter = require("../routes/foo");

router.get("/", controllers.index);

router.use("/foos", fooRouter);

module.exports = router;