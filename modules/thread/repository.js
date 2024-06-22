const repositories = require("./repositories");

class ThreadRepository {
  static async addNewThread(params) {
    return repositories.addNewThread(params);
  }
}
module.exports = ThreadRepository;
