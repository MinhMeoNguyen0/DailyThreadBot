const service = require("./service");
const controllers = require("./controllers");

class LeaveController {
  static async addNewLeave(req, res) {
    controllers.addNewLeave(req, res, service);
  }
  static async getLeaveById(req, res) {
    controllers.getLeaveById(req, res, service);
  }
  static async updateLeave(req, res) {
    controllers.updateLeave(req, res, service);
  }
  static async deleteLeave(req, res) {
    controllers.deleteLeave(req, res, service);
  }
  static async checkExistLeave(req, res) {
    controllers.checkExistLeave(req, res, service);
  }
  static async getListLeave(req, res) {
    controllers.getListLeave(req, res, service);
  }
  static async getAllLeave(req, res) {
    controllers.getAllLeave(req, res, service);
  }
  static async getLeaveListByMonth(req, res) {
    controllers.getLeaveListByMonth(req, res, service);
  }
  // code gen
}

module.exports = LeaveController;
