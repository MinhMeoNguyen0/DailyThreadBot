const repositories = require("./repositories");

class ThreadRepository {
  static async addNewThread(params) {
    return repositories.addNewThread(params);
  }
  static async addNewProfile(params) {
    return repositories.addNewProfile(params);
  }
  static async getUserByToken(params) {
    return repositories.getUserByToken(params);
  }
  static async getAccessToken(params) {
    return repositories.getAccessToken(params);
  }
  static async refreshToken(params) {
    return repositories.refreshToken(params);
  }

  static async getUserByThreadId(params) {
    return repositories.getUserByThreadId(params);
  }
}
module.exports = ThreadRepository;
