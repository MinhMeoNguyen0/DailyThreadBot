const services = require("./services");
const repository = require("./repository");

class BotService {
  static async gitHubPost(params) {
    return services.gitHubPost(params,repository );
  }
  
  // code gen
}
module.exports = BotService;
