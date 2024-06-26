const services = require("./services");
const validator = require("./validator");
const repository = require("./repository");
const cacheService = require("./cache");

class ThreadService {
  static async addNewThread(params) {
    return services.addNewThread(params, validator, repository, cacheService);
  }
  // code gen
}
module.exports = ThreadService;
