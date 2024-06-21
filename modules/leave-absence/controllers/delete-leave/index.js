const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (req, res, service) => {
  const { params, user } = req;
  try {
    let data = await service.deleteLeave(params);
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
      });
    } else {
      return res.status(200).json({ data });
    }
  } catch (err) {
    log.error("[CONTROLLER][EXECEPTION][Delete Leave] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
