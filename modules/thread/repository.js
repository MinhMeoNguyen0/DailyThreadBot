const repositories = require("./repositories");

class ThreadRepository {
  static async addNewThread(params) {
    return repositories.addNewThread(params);
  }

  static async addNewProfile(params) {
    return repositories.addNewProfile(params);
  }

  static async getUserByToken() {
    return repositories.getUserByToken();
  }
}
module.exports = ThreadRepository;
