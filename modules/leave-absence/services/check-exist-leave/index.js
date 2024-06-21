const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const getLeaveById = require("../get-leave-by-id");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  try {
    const leave = await getLeaveById(
      { body: params },
      validator,
      repository,
      cacheService
    );
    if (leave) {
      defer.resolve({ isExist: true });
    } else {
      defer.resolve({ isExist: false });
    }
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Check Exist Leave] error", err);
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

// const checkExistLeave = require("./check-exist-leave");
