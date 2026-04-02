import { app } from "./src/app.js";
import dotenv from 'dotenv'
import { dbconnection } from "./src/config/dbconnection.js";
dotenv.config();

dbconnection()
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server started succesfully ${port}`);
})