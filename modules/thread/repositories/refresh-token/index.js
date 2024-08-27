const q = require("q");
// const ThreadModel = include("domain/models/thread");
const config = include("common/config/");
const axios = require('axios');
const { buildGraphAPIURL }  = include("common/utils");

module.exports = async () => {
  const defer = q.defer();
  const refreshAccessTokenUrl = buildGraphAPIURL('refresh_access_token', {
            grant_type: 'th_refresh_token',
  }, config.access_token, );
  
  try {
    // Change to accompany with multiple  usersu
    const response = await axios.get(refreshAccessTokenUrl);
    // console.info("[THREAD][REPOSITORY][REFRESH ACCESS TOKEN]", response.data)
    const data = response.data;

    // userDetails.user_profile_url = `https://www.threads.net/@${userDetails.username}`;
    defer.resolve({data});
  } catch (err) {
    console.error("[THREAD][REPOSITORY][EXECEPTION][Refresh Token] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};
