const services = require("./services");
const repository = require("./repository");

class ThreadService {
  static async gitHubPost(params) {
    return services.gitHubPost(params,  repository );
  }
  
  // code gen
}
module.exports = ThreadService;
