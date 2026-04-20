const app= require('./src/app');
const dbconnection =require('./src/config/database.conection')
require('dotenv').config(); 

dbconnection()

app.listen(3000,()=>{
    console.log("server created succesfully ");
})