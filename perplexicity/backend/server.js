import 'dotenv/config';
import { app } from "./src/app.js";
import { dbconnection } from "./src/config/dbconnection.js";
import http from "http";
import { initSocket } from './src/sockets/server.socket.js';
const httpServer = http.createServer(app);

initSocket(httpServer);
dbconnection()
const port=process.env.PORT
httpServer.listen(port,()=>{
    console.log(`server started succesfully ${port}`,"0.0.0.0");
})
