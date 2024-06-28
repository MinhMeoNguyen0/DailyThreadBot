const q = require("q");
// const ThreadModel = include("domain/models/thread");

module.exports = async (params) => {
  const defer = q.defer();
  try {
    

    // Get the thread API and then have the data to post by hand then configure
    // const thread = await ThreadModel.create(params);
    defer.resolve(thread);
  } catch (err) {
    //log.error("[REPOSITORY][EXECEPTION][Add New Thread] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};
