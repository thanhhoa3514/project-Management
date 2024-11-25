const express = require("express");
const path = require("path");
const flash = require('express-flash');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const moment = require("moment");


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

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash
app.use(cookieParser("Hello123az"));
app.use(session({
  secret: 'Hello123az', // Provide a secret key
  resave : false, // Add resave option
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60 // 14 days
  })
}));
app.use(flash());

// Tiny mce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))
// End tiny-mce


//  App Local Variables
app.locals.prefixAdmin=systemConfig.prefixAdmin;
app.locals.moment=moment;



app.use(express.static(`${__dirname}/public`));


// Router
route(app);

// Route Admin
routeAdmin(app);

app.get("*",(req, res) => {
  res.render("client/pages/errors/404",{
    title: "Page not found",
 
  })
});
app.listen(port, () => {
  console.log(`Example app Ongoing on port ${port}`);
});



