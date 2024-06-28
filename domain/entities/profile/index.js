"use strict";
module.exports = class {
  constructor(data) {
    this._id = data._id;
    this.threadId = data.threadId;
    this.bio = data.bio;
    this.token_creation_date = data.token_creation_date;
    this.token = data.token;

  }
};
