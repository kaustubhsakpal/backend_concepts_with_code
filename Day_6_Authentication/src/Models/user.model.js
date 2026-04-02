const mongoose = require('mongoose');

const user = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"your username allready exits"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"your username allready exits"]
    },
    password:{
        type:String,
        required:true,
        unique:[true,"your username allready exits"]
    },

})

const usermodel = mongoose.model("users",user);

module.exports=usermodel;