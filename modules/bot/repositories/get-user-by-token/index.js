const q = require("q");
// const ThreadModel = include("domain/models/thread");
const ProfileModel = include("domain/models/profile");


module.exports = async (params) => {
  const defer = q.defer();
  try {
    const profile = await ProfileModel.find(params);
    defer.resolve(profile);
  } catch (err) {
    //log.error("[REPOSITORY][EXECEPTION][Find Profile by Token] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};
