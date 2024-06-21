const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async (params) => {
  const defer = q.defer();
  try {
    const leave = await LeaveModel.create(params);
    defer.resolve(leave);
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Add New Leave] error", err);
    defer.resolve(err.message);
  }
  return defer.promise;
};

