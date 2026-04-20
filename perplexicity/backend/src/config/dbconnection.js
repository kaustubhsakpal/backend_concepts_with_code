import mongoose from "mongoose";

export async function dbconnection() {
    mongoose.connect(process.env.MONGOOSE_URI)
    .then(()=>{
        console.log("database connnection done");
        
    })
}

