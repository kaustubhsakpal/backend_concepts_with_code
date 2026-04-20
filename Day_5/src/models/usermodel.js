const mongoose=require('mongoose');

const user=mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"this email allready exits"]
    },
    password:String
})

const usermodel=mongoose.model("user",user);


module.exports=usermodel;