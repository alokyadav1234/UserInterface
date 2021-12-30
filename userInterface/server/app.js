const express = require("express");

const app = express();
const PORT = 5000;

const mongoose = require("mongoose");
const{mongouri} = require("./config/keys");

mongoose.connect(mongouri , {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected' , connted => {
  console.log("database connected")
});
mongoose.connection.on('error', err => {
console.log("getting error",err)
});

require("./models/user");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(PORT, ()=>{
    console.log("app is listening"+" "+ PORT)
})