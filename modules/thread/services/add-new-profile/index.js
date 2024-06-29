const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const _ = require("lodash");
const ProfileModel = include("domain/models/profile");
const ProfileEntity = include("domain/entities/profile");
const log = console;

module.exports = async ( validator, repository, cacheService) => {
  const defer = q.defer();
  try {
    const user = await repository.getUserByToken();
    if(!user) {
      const { error, code } = errorsCodes.BAD_REQUEST;
      defer.resolve({
        error,
        message: errorsMessages.BAD_REQUEST,
        code,
      });
      return defer.promise;
    }
    log.info("user", user.userDetails)
    const data = await repository.addNewProfile({body: user.userDetails});
    defer.resolve({data: new ProfileEntity(data)});
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Add New Profile] error", err);
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

