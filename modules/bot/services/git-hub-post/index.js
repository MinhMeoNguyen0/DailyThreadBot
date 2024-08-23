const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config/");
const { buildGraphAPIURL } = include("common/utils");

module.exports = async (params,reppository) => {
  try {




    // const { text, media_type, image_url } = req.query;
    // yse Axios to crawl github.com/trending

    let data = await service.uploadAndPublishMultiple({  thread_user_id, access_token });
    
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
      });
    } else {
      return res.status(200).json({ data });
    }
  } catch (err) {
    console.error("[SERVICE][EXCEPTION][Git Hub Bot Post] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
