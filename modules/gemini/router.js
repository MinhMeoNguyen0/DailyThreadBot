const controller = require("./controller");
const router = require("express").Router();

router.post("/add-new", controller.addNewThread);
// code gen

module.exports = router;
