import dotenv from 'dotenv'
dotenv.config();
import app from './src/app.js'
import dbconnection from './src/config/db.js';
await dbconnection()
app.listen(process.env.PORT,()=>{
    console.log("server connected");
})