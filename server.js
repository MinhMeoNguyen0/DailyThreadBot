const app = require("./app");
const config = include("common/config/");
const ProfileModel = include("./domain/models/profile");

// Ensure log is defined
const log = console;

let port = config.server.port;
const environment = config.env;

const FIELD__ERROR_MESSAGE = 'error_message';
const FIELD__FOLLOWERS_COUNT = 'followers_count';
const FIELD__HIDE_STATUS = 'hide_status';
const FIELD__IS_REPLY = 'is_reply';
const FIELD__LIKES = 'likes';
const FIELD__MEDIA_TYPE = 'media_type';
const FIELD__MEDIA_URL = 'media_url';
const FIELD__PERMALINK = 'permalink';
const FIELD__REPLIES = 'replies';
const FIELD__REPOSTS = 'reposts';
const FIELD__QUOTES = 'quotes';
const FIELD__REPLY_AUDIENCE = 'reply_audience';
const FIELD__STATUS = 'status';
const FIELD__TEXT = 'text';
const FIELD__TIMESTAMP = 'timestamp';
const FIELD__THREADS_BIOGRAPHY = 'threads_biography';
const FIELD__THREADS_PROFILE_PICTURE_URL = 'threads_profile_picture_url';
const FIELD__USERNAME = 'username';
const FIELD__VIEWS = 'views';
const PARAMS__RETURN_URL = 'return_url';




app.listen(port, () => {
  log.info(
    `Server is ready at ${config.server.host}, listening on port ${port}, ${environment} environment`
  );
});

app.get('/', async (req, res) => {
  const userProfile = await ProfileModel.findOne();
  if (!userProfile) {
      print(req.session);
      res.render('index', {
          title: 'Index',
          returnUrl: req.query[PARAMS__RETURN_URL],
      });
  }else{
      res.redirect('/account');
  }
});

app.get('/account', async (req, res) => {
  const userProfile = await ProfileModel.findOne();
  const getUserDetailsUrl = buildGraphAPIURL('me', {
      [PARAMS__FIELDS]: [
          FIELD__USERNAME,
          FIELD__THREADS_PROFILE_PICTURE_URL,
          FIELD__THREADS_BIOGRAPHY,
      ].join(','),
  }, userProfile.access_token);

  let userDetails = {};
  try {
      const response = await axios.get(getUserDetailsUrl);
      userDetails = response.data;
      // This value is not currently used but it may come handy in the future
      if (!req.session.user_id)
          req.session.user_id = response.data.id;
      userDetails.user_profile_url = `https://www.threads.net/@${userDetails.username}`;
  } catch (e) {
      console.error(e);
  }
  res.render('account', {
      title: 'Account',
      ...userDetails,
  });
});
