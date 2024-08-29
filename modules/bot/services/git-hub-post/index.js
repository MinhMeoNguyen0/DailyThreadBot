const q = require("q");
const getGeminiResponse = require("../../../../workers/creator/get-gemini-response");

const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const ThreadService = include("modules/thread/service");



const log = console;

module.exports = async ( params, repository) => {
  const defer = q.defer();
  try {
    const { repoData,repoDescription, thread_user_id, access_token} = params;


    // Getting bot response

    const response = await getGeminiResponse({repoData, repoDescription});



    
    if (response.length === 0) {
      log.error("[SERVICE][EXECEPTION][GitHub Post] Getting Gemini Response Failed No Thread", response);
      const { error, code } = errorsCodes.SERVER_ERROR;
      defer.resolve({
        error,
        message: errorsMessages.SERVER_ERROR,
        code,
      });
      return defer.promise;
    }
    const data = await ThreadService.uploadAndPublish({ thread_user_id, access_token, text: response.message });
    defer.resolve({
      error: false,
      data: {...data , response: response.message},
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

