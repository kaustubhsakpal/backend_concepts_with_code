const app = require('./src/app')
const dbconnection =require('./src/database/db')


dbconnection()
app.listen(3000,(req,res)=>{
console.log("server created sucessfully");

})