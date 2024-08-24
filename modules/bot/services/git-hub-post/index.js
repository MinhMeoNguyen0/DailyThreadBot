const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const log = console;

module.exports = async ( params, repository) => {
  const defer = q.defer();
  try {
  
    defer.resolve({data: "Hi there"});
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][GitHub Post] error", err);
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

