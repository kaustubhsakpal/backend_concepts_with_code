const mongoose = require('mongoose');
require('dotenv').config();

 async function dbconnection(){
  await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connection sucessfully");
    })
}

module.exports=dbconnection;