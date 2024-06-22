
const ThreadModule = include("modules/thread");


module.exports = (app) => {
  app.use("/api/thread", ThreadModule.router);
  
  // CMSModule(app);
};
