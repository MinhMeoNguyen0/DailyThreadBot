const service = require("./service");
const controllers = require("./controllers");

class ThreadController {
  static async gitHubPost(req, res) {
    controllers.gitHubPost(req, res, service);
  }
  // static async seattlePost(req, res) {
  //   controllers.seattlePost(req, res, service);
  // }
}

module.exports = ThreadController;
