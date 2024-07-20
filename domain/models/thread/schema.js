const mongoose = require("mongoose");


module.exports = new mongoose.Schema(
  {
    thread_container_id: {
      type: String,
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'thread_profile'  // Reference to the Author model
    },
    details: [
      {
        type: Object,
      }
    ]},
  // additional configuration
  {
    timestamps: true,
  }
);
