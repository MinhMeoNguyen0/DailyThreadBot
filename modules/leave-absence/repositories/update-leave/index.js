const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async (params) => {
  const defer = q.defer();
  try {
    const { id, body } = params;
    await LeaveModel.updateOne({ _id: id }, body);
    defer.resolve({ success: true });
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Update Leave] error", err);
    defer.resolve({ success: false });
  }
  return defer.promise;
};

//const updateLeave = require("./update-job");
