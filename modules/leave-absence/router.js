const controller = require("./controller");
const router = require("express").Router();

router.post("/add-new", controller.addNewLeave);
router.get("/get-leave-by-id/:id", controller.getLeaveById);
router.put("/update-leave/:id", controller.updateLeave);
router.delete("/delete-leave/:id", controller.deleteLeave);
router.get("/check-exist-leave/:id", controller.checkExistLeave);
router.get("/get-list", controller.getListLeave);
router.get("/get-all-leave", controller.getAllLeave);
router.get("/get-list-by-month", controller.getLeaveListByMonth);

// code gen

module.exports = router;
