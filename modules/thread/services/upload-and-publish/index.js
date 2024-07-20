const q = require("q");
const axios = require('axios');
const errorsCodes = include("modules/error/codes");
const { buildGraphAPIURL } = include("common/utils");
const config = include("common/config/");
const errorsMessages = include("modules/error/messages");
const log = console;

module.exports = async (params,repository) => {
  const defer = q.defer();
  const { uploadUrl } = params;

  try {
    // Step 1: Create a Threads Media Container
    console.log("[SERVICE][INFO] Creating Threads Media Container");

    const createContainerResponse = await axios.post(uploadUrl,{});
    const containerId = createContainerResponse.data.id;


    console.log("[SERVICE][INFO] Media Container Created with ID:", containerId);

    // Step 2: Publish the Threads Media Container

    const publishUrl = buildGraphAPIURL(
      `${config.thread_id}/threads_publish`,
      { creation_id: containerId,
        access_token: config.access_token }
    );

    console.log("[SERVICE][INFO] Publishing Threads Media Container: getting publish URL", publishUrl);

    const publishResponse = await axios.post(publishUrl, {});

    console.log("[SERVICE][INFO] Threads Media Published with ID: MEO MEO", publishResponse.data.id);

    defer.resolve({ data: publishResponse.data });
    // defer.resolve(publishResponse.data);
  } catch (err) {
    log.error("[SERVICE][EXCEPTION][Upload and Publish] error", err);
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
