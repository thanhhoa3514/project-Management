
const dashboardRoutes = require("./dashboard-route");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);

};