import 'dotenv/config'
import { app } from "./src/app.js";

app.listen(3000,()=>{
    console.log("server runnung on port 3000")
})