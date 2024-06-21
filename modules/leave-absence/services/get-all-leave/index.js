const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { parameters } = params;
  try {
    const validResult = await validator.validateGetAllLeaveData(parameters);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    const { search } = validResult;
    let searchObject = [{}];
    if (search) {
      searchObject = [{ nameLeave: new RegExp(search, "i") }];
    }
    const queryObject = { $or: searchObject };
    const data = await repository.getAllLeave({ queryObject });
    defer.resolve(data);
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Get All Leave] error", err);
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

// const getAllLeave = require("./get-all-leave");
