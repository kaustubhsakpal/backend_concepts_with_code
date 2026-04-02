import app from './src/app.js'
import { dbconnection } from './src/config/db.connection.js';

dbconnection()
app.listen(3000,()=>{
    console.log("server connected");
})