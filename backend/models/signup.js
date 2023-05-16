const mongoose=require("mongoose");
require("../db/conn");

const singupSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const SignUps=mongoose.model("SignUp",singupSchema);

module.exports=SignUps;