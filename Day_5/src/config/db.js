const mongoose=require('mongoose')
require('dotenv').config()

function dbconection(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("db connection done");
        
    })
}

module.exports=dbconection;