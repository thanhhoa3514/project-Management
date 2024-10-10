const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config();

const database=require("./config/database");

const route=require("./routers/client/index-router")

database.connect();

const app = express();

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'))


// Router
route(app)

app.listen(port, () => {
  console.log(`Example app Ongoing on port ${port}`);
});



