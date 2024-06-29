"use strict";
module.exports = class {
  constructor(data) {
    this._id = data._id;
    this.thread_id = data.thread_id;
    this.username = data.username;
    this.threads_profile_picture_url = data.threads_profile_picture_url;
    this.threads_biography = data.threads_biography;
    this.user_profile_url = data.user_profile_url;
  }
};
