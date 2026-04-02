const { connect } = require("http2");
const mongoose = require("mongoose");
require("dotenv").config();

async function dbconnection() {
  await mongoose.connect(process.env.MONGODB_URL,)
  .then(()=>{
    console.log("database connect sucessfully")
  })
}

module.exports=dbconnection;
