const services = require("./services");
const validator = require("./validator");
const repository = require("./repository");
const cacheService = require("./cache");

class LeaveService {
  static async addNewLeave(params) {
    return services.addNewLeave(params, validator, repository, cacheService);
  }
  // code gen
}
module.exports = LeaveService;
