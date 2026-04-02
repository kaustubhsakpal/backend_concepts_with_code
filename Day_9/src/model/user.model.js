import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"username should not empty"],
        unique:[true,"username should unique"]
    },
    email:{
        type:String,
        require:[true,"email should not empty"],
        unique:[true,"email should unique"]
    },
    password:{
        type:String,
        require:[true,"password should not empty"],
        select:false
    }
    
})

// userSchema.pre('save',)

export const usermodel = mongoose.model("user",userSchema);

