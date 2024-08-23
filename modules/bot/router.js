const controller = require("./controller");
const router = require("express").Router();


router.post("/github/post", controller.gitHubPost);
// router.post("/seattle/post", controller.seattlePost);

// code gen
module.exports = router;
