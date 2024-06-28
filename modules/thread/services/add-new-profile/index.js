const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const _ = require("lodash");
const ProfileModel = include("domain/models/profile");


module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { body } = params;
  try {
    // Use axios to crawl data from github.com Trending. 
    const data = await ProfileModel.create(params);
    defer.resolve(data);
    
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

