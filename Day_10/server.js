import dotenv from "dotenv";
dotenv.config()

import app from './src/app.js';
import { dbconnection } from "./src/config/db.connection.js";
import morgan from 'morgan'


dbconnection()
app.listen(3000,()=>{
    console.log("connection succesfully")   
});