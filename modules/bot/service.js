const services = require("./services");
const repository = require("./repository");

class ThreadService {
  static async uploadAndPublish(params) {
    return services.uploadAndPublish(params,  repository );
  }

  static async uploadAndPublishMultiple(params) {
    return services.uploadAndPublishMultiple(params,  repository );
  }
  static async addNewProfile() {
    return services.addNewProfile( repository );
  }
  // code gen
}
module.exports = ThreadService;
