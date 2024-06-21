const q = require("q");
const LeaveModel = include("domain/models/leave-absence");

module.exports = async ({ skip, limit, queryObject }) => {
  const defer = q.defer();
  try {
    const total = await LeaveModel.countDocuments();
    const list = await LeaveModel.find({ isDeleted: false })
      .skip(skip * limit)
      .limit(limit);
    defer.resolve({ total, list });
  } catch (err) {
    log.error("[REPOSITORY][EXECEPTION][Get List Leave] error", err);
    defer.resolve({ success: false });
  }
  return defer.promise;
};

