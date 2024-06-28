const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const { buildGraphAPIURL }  = include("common/utils");
const config = include("common/config/");
const { URLSearchParams } = require('url');

const FIELD__THREADS_BIOGRAPHY = 'threads_biography';
const FIELD__THREADS_PROFILE_PICTURE_URL = 'threads_profile_picture_url';
const FIELD__USERNAME = 'username';
const PARAMS__FIELDS = 'fields';

module.exports = async (req, res, service) => {
  const code = req.query.code;
  const uri = buildGraphAPIURL('oauth/access_token', {}, null, GRAPH_API_BASE_URL);
    try {
        const response = await axios.post(uri, new URLSearchParams({
            client_id: config.common.client_id,
            client_secret: config.common.client_secret,
            grant_type: 'authorization_code',
            redirect_uri: config.common.redirect_uri,
            code,
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        req.session.access_token = response.data.access_token;

        const long_token_url = buildGraphAPIURL('/access_token', 
          {
            grant_type: 'th_exchange_token',
            client_secret: config.common.client_secret,
            access_token: req.session.access_token
          }, null, GRAPH_API_BASE_URL);

        const long_token = await axios.get(long_token_url);
        req.session.long_term_token = long_token.data.access_token;

        const getUserDetailsUrl = buildGraphAPIURL('me', {
          [PARAMS__FIELDS]: [
              FIELD__USERNAME,
              FIELD__THREADS_PROFILE_PICTURE_URL,
              FIELD__THREADS_BIOGRAPHY,
          ].join(','),
      }, req.session.access_token);
      const expirationTimeMillis = new Date.now() + (long_token.date.expires_in * 1000);
      let userDetails = { };
      const user_response = await axios.get(getUserDetailsUrl);
      userDetails = user_response.data;
      userDetails.token_expiration = expirationTimeMillis;
      userDetails.access_token = long_token.data.access_token;
      const user = await service.addNewProfile({ body: userDetails });

      return res.status(200).json({ data: user.data });
  } catch (err) {
    const { code, error } = errorsCodes.SERVER_ERROR;

    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
