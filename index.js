const express = require("express");
const methodOverride = require("method-override");
// const mongoose = require("mongoose");
require("dotenv").config();

const database=require("./config/database");

const systemConfig=require("./config/system");

const routeAdmin=require("./routers/admin/index-route");

const route=require("./routers/client/index-router");


// mongoose.connect(process.env.MONGODB_URL);
//  database.connect();


database.connect();

const app = express();
app.use(methodOverride("_method"));

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

//  App Local Variables
app.locals.prefixAdmin=systemConfig.prefixAdmin;


app.use(express.static('public'));


// Router
route(app);

// Route Admin
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app Ongoing on port ${port}`);
});



