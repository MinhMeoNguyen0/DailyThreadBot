const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const _ = require("lodash");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { body } = params;
  try {
    const validResult = await validator.validateAddNewLeaveData(body);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    const {periodStartDate, periodEndDate} = validResult;
    const startDate = new Date(periodStartDate);
    const endDate = new Date(periodEndDate);
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));
    let newData = {duration: durationInDays == 0 ? 1: durationInDays};
    
    




    
    newData = Object.assign(newData, validResult);
    const data = await repository.addNewLeave(newData);
    defer.resolve(data);
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Add New Leave] error", err);
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

