import  'dotenv/config'
import { app } from "./src/app.js";
import { dbconnection } from "./src/config/dbconnection.js";


dbconnection()
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server started succesfully ${port}`);
})