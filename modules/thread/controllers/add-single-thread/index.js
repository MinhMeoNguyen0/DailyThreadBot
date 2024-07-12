const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config/");

module.exports = async (req, res, service) => {
  try {
    const { body } = req;

    let data = await service.uploadAndPublish({ body });
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
      });
    } else {
      return res.status(200).json({ data });
    }
  } catch (err) {
    //log.error("[CONTROLLER][EXECEPTION][Add New Thread] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
