import mongoose from "mongoose";

//register schema
   const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username required'],
        unique:[true,'username should unique']
    },
    email:{
        type:String,
        required:[true,'email required'],
        unique:[true,'email should unique']
    },
    password:{
        type:String,
        required:[true,'password required'],
        select:false
    }
 })


 export const usermodel = mongoose.model('user',userSchema)