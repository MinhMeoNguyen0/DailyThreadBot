// const Bull = require("bull");
// const config = include("common/config");
// const { setQueues, UI } = require("bull-board");

// module.exports = app => {
//   let redis_config = {
//     port: config.redis.port || 6379,
//     host: config.redis.host
//   };
//   if (config.redis.auth) {
//     redis_config.auth = config.redis.auth;
//     redis_config.password = config.redis.auth;
//   }
//   global.queue = new Bull("app queue", {
//     redis: redis_config
//   });

//   setQueues([queue]);

//   // Mount kue JSON api
//   app.use("/queue/bull", UI);
//   global.queue.setMaxListeners(1000);

//   if (config.worker.shouldExecute) {
//     include("workers/handler");
//   } else {
//   }
// };
