// const Bull = require("bull");
const config = include("common/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// const { setQueues, UI } = require("bull-board");

module.exports = app => {
 
  const genAI = new GoogleGenerativeAI(config.ai.gemini_api_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  global.model = model;

//   // Mount kue JSON api
//   app.use("/queue/bull", UI);
//   global.queue.setMaxListeners(1000);


  if (config.ai.shouldExecute) {
    include("workers/handler");
  } else {
  }
};



