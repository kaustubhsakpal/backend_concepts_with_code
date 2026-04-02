const mongoose=require('mongoose');

async function dbconnection(){
  await  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected succesfully");
        
    })
}

module.exports=dbconnection;