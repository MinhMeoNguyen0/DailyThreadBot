const controller = require("./controller");
const router = require("express").Router();
const ProfileModel = require("domain/models/profile");

router.post("/add-new", controller.addNewThread);


router.get("/callback", controller.getAccessToken)
router.get("/me", 
    (req, res) => {
        try {
            const user = await ProfileModel.findOne(req.user._id).lean();
        }
        res.send(req.user)
    }
)


// code gen

module.exports = router;
