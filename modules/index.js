
const LeaveModule = include("modules/leave-absence");


module.exports = (app) => {


  app.use("/api/leave-absence", LeaveModule.router);


  // CMSModule(app);
};
