const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config");


module.exports = async (req, res, service) => {
  try {
      const user = await service.refreshToken({});
      // console.info("[THREAD][CONTROLLER][REFRESH TOKEN]", user)

      return res.status(200).json({ user});
  } catch (err) {
    // console.info("[THREAD][CONTROLLER][BEFORE REFRESH TOKEN ERROR]", err)

    const { code, error } = errorsCodes.SERVER_ERROR;
    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
} ;
