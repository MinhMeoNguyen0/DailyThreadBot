const controller = require("./controller");
const router = require("express").Router();
const ProfileModel = include("domain/models/profile");


router.post("/github/post", controller.githubPost);
router.post("/seattle/post", controller.seattlePost);

// code gen
module.exports = router;
