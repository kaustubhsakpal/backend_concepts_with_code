import mongoose from 'mongoose';

const blackListingSchema =new mongoose.Schema({
    token :{
        type:String,
        required:[true,"token needed"]
    }
})

export const blackListingModel =mongoose.model('blacklist',blackListingSchema);


