const validators = require("./validators");

class ThreadValidator {
  static async validateAddNewThreadData(data) {
    return validators.addNewThread(data);
  }
}
module.exports = ThreadValidator;
