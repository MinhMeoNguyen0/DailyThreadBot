const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async ({ id }) => {
  const defer = q.defer();
  try {
    const leave = await LeaveModel.findOne({ _id: id, isDeleted: false });
    defer.resolve(leave);
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Get Leave By Id] error", err);
    defer.resolve({ success: false });
  }
  return defer.promise;
};

