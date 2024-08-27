const q = require("q");
const axios = require('axios');
const errorsCodes = include("modules/error/codes");
const { buildGraphAPIURL } = include("common/utils");
const config = include("common/config/");
const errorsMessages = include("modules/error/messages");
const log = console;

module.exports = async (params,repository) => {
  const defer = q.defer();
  const { text, media_type, image_url, access_token, thread_user_id } = params;



  // console.info("[SERVICE][INFO] Params", text);

  const createContainerParams = {
    media_type: media_type ? media_type : 'TEXT', // Default value : ,
    text,
  };

  if (media_type === 'IMAGE') {
    createContainerParams.image_url = image_url;
  } else if (media_type === 'VIDEO') {
    createContainerParams.video_url = image_url;
  }
  const uploadUrl = buildGraphAPIURL(
    `${thread_user_id}/threads`,
    { ...createContainerParams, 
      access_token }
  );

  // console.log("[SERVICE][INFO] Uploading Media to Threads", uploadUrl);

  try {
    // Step 1: Create a Threads Media Container
    // console.log("[SERVICE][INFO] Creating Threads Media Container");

    const createContainerResponse = await axios.post(uploadUrl,{});
    const containerId = createContainerResponse.data.id;


    // console.log("[SERVICE][INFO] Media Container Created with ID:", containerId);

    // Step 2: Publish the Threads Media Container

    const publishUrl = buildGraphAPIURL(
      `${config.thread_id}/threads_publish`,
      { creation_id: containerId,
        access_token: access_token }
    );

    // console.log("[SERVICE][INFO] Publishing Threads Media Container: getting publish URL", publishUrl);

    const publishResponse = await axios.post(publishUrl, {});

    // const repoData = repository.add(p)
    
    // console.log("[SERVICE][INFO] Threads Media Published with ID: MEO MEO", publishResponse.data.id);

    // defer.resolve({ data: publishResponse?.data ? publishResponse.data : '' });
    defer.resolve(publishResponse? publishResponse.data : '');
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
