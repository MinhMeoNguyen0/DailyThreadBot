const Profile = include("domain/models/profile");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (req, res, next) => {
    let user = {}
    try {

    const profile = await Profile.findOne({ token });
    if (profile) {
      req.user = profile;
      return next();
    }
  } catch (err) {
    const { error, code } = errorsCodes.SERVER_ERROR;

    log.error("[EXCEPTION][MIDDLEWARE][isAuthenticated ][1] ", err);

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
