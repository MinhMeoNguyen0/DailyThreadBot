const q = require("q");
// const ThreadModel = include("domain/models/thread");
const config = include("common/config/");
const axios = require('axios');
const { PARAMS__FIELDS, FIELD__USERNAME, FIELD__THREADS_PROFILE_PICTURE_URL, FIELD__THREADS_BIOGRAPHY } = include("common/constants");
const { buildGraphAPIURL }  = include("common/utils");

module.exports = async () => {
  const defer = q.defer();
  const getUserDetailsUrl = buildGraphAPIURL('me', {
    [PARAMS__FIELDS]: [
        FIELD__USERNAME,
        FIELD__THREADS_PROFILE_PICTURE_URL,
        FIELD__THREADS_BIOGRAPHY,
    ].join(','),
  }, config.access_token, );
  try {
    let userDetails = {};
    const response = await axios.get(getUserDetailsUrl);
    userDetails = response.data;
    userDetails.thread_id = response.data.id
    userDetails.user_profile_url = `https://www.threads.net/@${userDetails.username}`;
    defer.resolve({userDetails});
  } catch (err) {
    //log.error("[REPOSITORY][EXECEPTION][Add New Thread] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};
