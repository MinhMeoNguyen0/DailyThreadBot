const controller = require("./controller");
const router = require("express").Router();
const ProfileModel = include("domain/models/profile");


router.post("/add-new", controller.addSingleThread);
router.post("/add-new-multiple", controller.addMultipleThread);
router.get("/intitialize", controller.getAccessToken)
router.get("/refresh-token", controller.refreshToken)

router.get("/me", 
    async (req, res) => {
        try {
            const user = await ProfileModel.findOne();
            res.send({body: user})
        }  
        catch (err) {
            res.send(err)
        }
    }
)

// code gen
module.exports = router;
