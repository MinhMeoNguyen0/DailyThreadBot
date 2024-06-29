const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    thread_id: {
      type: String,
    },
    username: {
      type: String,
    },
    threads_profile_picture_url: {
      type: String,
    },
    threads_biography: {
      type: String,
    },
    user_profile_url: {
      type: String,
    },
  },
  // additional configuration
  {
    timestamps: true,
  }
);
