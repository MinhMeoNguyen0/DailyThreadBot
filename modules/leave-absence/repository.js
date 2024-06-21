const repositories = require("./repositories");

class LeaveRepository {
  static async addNewLeave(params) {
    return repositories.addNewLeave(params);
  }
  static async getLeaveById(params) {
    return repositories.getLeaveById(params);
  }
  static async updateLeave(params) {
    return repositories.updateLeave(params);
  }
  static async deleteLeave(params) {
    return repositories.deleteLeave(params);
  }
  static async getListLeave(params) {
    return repositories.getListLeave(params);
  }
  // code gen
  static async getAllLeave(params) {
    return repositories.getAllLeave(params);
  }
}
module.exports = LeaveRepository;
