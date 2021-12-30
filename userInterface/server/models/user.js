const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:"string",
        require: true
    },
    password:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true
    }
})

mongoose.model("User", userschema, "users");

