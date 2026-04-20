const app = require('./src/app')
const dbconnection =require('./src/config/db')


dbconnection()
app.listen(3000,()=>{
    console.log("server started");
})