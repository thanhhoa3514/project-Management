const express = require("express");
const flash = require('express-flash');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const session = require('express-session');

// const mongoose = require("mongoose");
require("dotenv").config();

const database=require("./config/database");

const systemConfig=require("./config/system");

const routeAdmin=require("./routers/admin/index-route");

const route=require("./routers/client/index-router");



database.connect();

const app = express();
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }))


const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("Hello123az"));
app.use(session({
  secret: 'Hello123az', // Provide a secret key
  resave : false, // Add resave option
  saveUninitialized: true // Add saveUninitialized option
}));
app.use(flash());


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



