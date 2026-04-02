const app = require('./src/app')
const dbconnection =require('./src/config/db.connection')
require('dotenv').config()

dbconnection()
app.listen(3000,()=>{
    console.log("server connected");
    
})