const mongoose = require('mongoose')
require('dotenv').config()

async function dbconnection(){
 await mongoose.connect(process.env.DATABASE_URI)
 .then(()=>{
    console.log("database connection succesfully");
 })
}

module.exports =dbconnection;