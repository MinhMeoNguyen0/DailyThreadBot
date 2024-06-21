const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const checkExistLeave = require("../check-exist-leave");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { id } = params;
  try {
    const validResult = await validator.validateDeleteLeaveData(params);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    const checkExist = await checkExistLeave(
      { id },
      validator,
      repository,
      cacheService
    );
    if (!checkExist.isExist) {
      const { error, code } = errorsCodes;
      defer.resolve({
        error,
        code,
        message: "Leave is not exist",
      });
      return defer.promise;
    }
    const data = await repository.deleteLeave(validResult);
    defer.resolve(data);
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Delete Leave] error", err);
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

