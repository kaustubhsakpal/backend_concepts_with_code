import mongoose from "mongoose";

async function dbconnection(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongo connected");
    })
    .catch((err)=>{
        console.log(`smotheing went wrong while connecting ${err.message}` );    
    })
}


export default dbconnection