const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const ProfileModel = include("domain/models/profile");
const ProfileEntity = include("domain/entities/profile");

module.exports = async (params, repository) => {
  const defer = q.defer();
  try {
    const profile = await repository.refreshToken();
    // console.info("[THREAD][SERVICE][REFRESH TOKEN]", profile)
    if (!profile) {
      const { error, code } = errorsCodes.BAD_REQUEST;
      defer.resolve({
        error,
        message: errorsMessages.BAD_REQUEST,
        code,
      });
      return defer.promise;
    }

    defer.resolve({data: profile, message: "Token Refreshed"});
    
  } catch (err) {
    console.error("[SERVICE][EXECEPTION][Add New Profile] error", err);
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

