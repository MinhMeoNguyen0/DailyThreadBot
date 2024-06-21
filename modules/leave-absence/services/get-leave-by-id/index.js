const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { body } = params;
  try {
    const validResult = await validator.validateGetLeaveByIdData(body);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    const { id } = validResult;
    const data = await repository.getLeaveById({ id });
    defer.resolve(data);
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Get Leave By Id] error", err);
    const { error, code } = errorsCodes.SERVER_ERROR;
    defer.resolve({
      error,
      message: errorsMessages.SERVER_ERROR,
      code,
    });
    return defer.promise;
  }
  return defer.promise;
};

