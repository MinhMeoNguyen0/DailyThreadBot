const mongoose = require("mongoose");

const Schema = require("./schema");

Schema.index({
  thread_id: 1
});

module.exports = mongoose.model("thread_profile", Schema);