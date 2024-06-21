const validators = require("./validators");

class LeaveValidator {
  static async validateAddNewLeaveData(data) {
    return validators.addNewLeave(data);
  }
  static async validateGetLeaveByIdData(data) {
    return validators.getLeaveById(data);
  }
  static async validateUpdateLeaveData(data) {
    return validators.updateLeave(data);
  }
  static async validateDeleteLeaveData(data) {
    return validators.deleteLeave(data);
  }
  static async validateCheckExistLeaveData(data) {
    return validators.checkExistLeave(data);
  }
  static async validateGetListLeaveData(data) {
    return validators.getListLeave(data);
  }
  static async validateGetAllLeaveData(data) {
    return validators.getAllLeave(data);
  }
  static async validateGetListLeaveByMonthData(data) {
    return validators.getListLeaveByMonth(data);
  }
  // code gen
}
module.exports = LeaveValidator;
