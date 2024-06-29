const q = require("q");
// const ThreadModel = include("domain/models/thread");
const ProfileModel = include("domain/models/profile");


module.exports = async (params) => {
  const {body} = params;
  const defer = q.defer();
  try {
    const profile = await ProfileModel.create(body);
    defer.resolve(profile);
  } catch (err) {
    //log.error("[REPOSITORY][EXECEPTION][Add New Thread] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};
