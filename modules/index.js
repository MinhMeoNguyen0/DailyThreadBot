
const ThreadModule = include("modules/thread");
const BotModule = include("modules/bot");


module.exports = (app) => {
  app.use("/api/thread", ThreadModule.router);
  app.use("/api/bot", BotModule.router);

  // CMSModule(app);
};
