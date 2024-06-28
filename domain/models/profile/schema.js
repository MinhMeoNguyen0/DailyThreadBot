const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    thread_name: {
      type: String,
    },
    bio: {
      type: String,
    },
    token_expiration: {
      type: Date,
    },
    access_token: {
      type: String,
    },
    gemini_token: {
      type: String,
    },
  },
  // additional configuration
  {
    timestamps: true,
  }
);
