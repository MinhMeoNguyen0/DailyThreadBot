const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const ProfileEntity = include("domain/entities/profile");
const log = console;
const { buildGraphAPIURL } = include("common/utils");


module.exports = async (params, repository) => {
  const defer = q.defer();
  try {


    defer.resolve({data: new ProfileEntity(data)});

    
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Upload and Publish] error", err);
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

