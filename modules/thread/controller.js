const service = require("./service");
const controllers = require("./controllers");

class ThreadController {
  static async addNewThread(req, res) {
    controllers.addNewThread(req, res, service);
  }
  static async getAccessToken(req, res) {
    controllers.getAccessToken(req, res, service);
  }
  // code gen
}

module.exports = ThreadController;
