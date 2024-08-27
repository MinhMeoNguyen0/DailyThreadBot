const q = require("q");
const getGeminiResponse = require("../../../../workers/creator/get-gemini-response");

const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const log = console;


module.exports = async ( params, repository) => {
  const defer = q.defer();
  try {
    const { repoData,repoDescription, thread_user_id, access_token} = params;


    

    const response = await getGeminiResponse({repoData, repoDescription});
    if (response.error) {
      log.error("[SERVICE][EXECEPTION][GitHub Post] Getting Gemini Response FAILED", response.message);
      const { error, code } = errorsCodes.SERVER_ERROR;
      defer.resolve({
        error,
        message: errorsMessages.SERVER_ERROR,
        code,
      });
      return defer.promise;
    }

    defer.resolve({
      error: false,
      message: response,
    });
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

