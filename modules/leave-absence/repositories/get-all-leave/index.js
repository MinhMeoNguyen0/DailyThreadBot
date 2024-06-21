const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async ({ queryObject }) => {
  const defer = q.defer();
  try {
    const total = await LeaveModel.count(queryObject);
    const data = await LeaveModel.find(queryObject).lean();
    defer.resolve({data,total});
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Get All Leave] error", err);
    defer.reject(err);
  }
  return defer.promise;
};

