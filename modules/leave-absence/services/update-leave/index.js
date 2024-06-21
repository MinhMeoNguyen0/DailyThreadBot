const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const checkExistLeave = require("../check-exist-leave");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { body, id } = params;

  try {
    const check = await checkExistLeave(
      { id },
      validator,
      repository,
      cacheService
    );
    if (!check.isExist) {
      const { code, error } = errorsCodes.BAD_REQUEST;
      defer.resolve({
        error,
        code,
        message: "Leave is not exist",
      });
      return defer.promise;
    }
    const data = await repository.updateLeave({ body, id });
    defer.resolve(data);
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Update Leave] error", err);
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

