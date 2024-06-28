const mongoose = require("mongoose");

const Schema = require("./schema");

Schema.index({
  threadId: 1
});

module.exports = mongoose.model("profile", Schema);
s