import mongoose from "mongoose";

 export   function dbconnection(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connection done");       
    })
}

