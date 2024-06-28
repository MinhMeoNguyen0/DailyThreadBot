const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const _ = require("lodash");

module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { body } = params;
  try {
    const validResult = await validator.validateAddNewThreadData(body);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    // Use axios to crawl data from github.com Trending. 
    // 


    let newData = {duration: durationInDays == 0 ? 1: durationInDays};
    
    newData = Object.assign(newData, validResult);
    const data = await repository.addNewThread(newData);


    
    defer.resolve(data);
  } catch (err) {
    //log.error("[SERVICE][EXECEPTION][Add New Thread] error", err);
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

