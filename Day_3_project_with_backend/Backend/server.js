const app = require('./src/app')
const dbconnection = require('./src/db/db')

dbconnection();
app.listen(3000,()=>{
    console.log("severe started on port 3000");
})