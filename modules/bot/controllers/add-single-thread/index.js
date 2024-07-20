const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config/");
const { buildGraphAPIURL } = include("common/utils");

module.exports = async (req, res, service) => {
  try {
    const access_token = config.access_token;
    const thread_user_id = config.thread_id;
    const { text, media_type, image_url, } = req.query;

    console.log("[CONTROLLER][INFO] Adding Single Thread", req.query);


    const createContainerParams = {
      media_type: media_type,
      text,
      is_carousel_item: false, // Default value for single thread posts
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


    console.log("[CONTROLLER][INFO] Uploading Threads Media Url", uploadUrl);


    let data = await service.uploadAndPublish({  uploadUrl, access_token });
    
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
      });
    } else {
      return res.status(200).json({ data });
    }
  } catch (err) {
    console.error("[CONTROLLER][EXCEPTION][Add New Thread] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
