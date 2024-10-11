const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config();

const database=require("./config/database");

<<<<<<< HEAD
const route=require("./routers/client/index-router");

// mongoose.connect(process.env.MONGODB_URL);
 database.connect();

=======
const route=require("./routers/client/index-router")
>>>>>>> de05dfcf7a10d0795c5389a4388f7d91e08c9f92

database.connect();

const app = express();

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));


// Router
route(app);

app.listen(port, () => {
  console.log(`Example app Ongoing on port ${port}`);
});



