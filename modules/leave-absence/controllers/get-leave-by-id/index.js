const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (req, res, service) => {
  const { params } = req;
  try {
    let data = await service.getLeaveById({ body: params });
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
      });
    } else {
      return res.status(200).json({ data });
    }
  } catch (err) {
    log.error("[CONTROLLER][EXECEPTION][Get Leave By Id] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
