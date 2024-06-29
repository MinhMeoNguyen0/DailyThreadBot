const controller = require("./controller");
const router = require("express").Router();
const ProfileModel = include("domain/models/profile");


router.post("/add-new", controller.addNewThread);
router.get("/intitialize", controller.getAccessToken)
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
