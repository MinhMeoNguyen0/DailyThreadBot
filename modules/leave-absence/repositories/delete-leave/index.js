const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async ({ id }) => {
  const defer = q.defer();
  try {
    await LeaveModel.updateOne({ _id: id }, { isDeleted: true });
    defer.resolve({ success: true });
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Delete Leave] error", err);
    defer.resolve({ success: false });
  }
  return defer.promise;
};

