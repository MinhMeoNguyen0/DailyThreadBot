const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { query } = params;
  try {
    // const validResult = await validator.validateGetListLeaveData(query);
    // if (validResult.error) {
    //   defer.resolve({
    //     error: "VALIDATION_ERROR",
    //     message: validResult.error,
    //     code: 400,
    //   });
    //   return defer.promise;
    // }
    let { page, limit } = query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    let searchObject = [{}];
    if (query) {
      searchObject = [
        {
          firstName: new RegExp(query, "i"),
        },
      ];
    } else {
      searchObject = [];
    }
    const queryObject = { $or: searchObject };
    const data = await repository.getListLeave({
      skip: page - 1,
      limit,
      queryObject,
    });
    defer.resolve({ ...data, page, limit });
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Get List Leave] error", err);
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

// const getListLeave = require("./get-list-leave");
