const service = require("./service");
const controllers = require("./controllers");

class ThreadController {
  static async addSingleThread(req, res) {
    controllers.addSingleThread(req, res, service);
  }
  static async addMultipleThread(req, res) {
    controllers.addMultipleThread(req, res, service);
  }
  static async getAccessToken(req, res) {
    controllers.getAccessToken(req, res, service);
  }
  // code gen
}

module.exports = ThreadController;
