const express = require('express')
const authrote=require('./Routes/Auth.Register.route')
const cookieparser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


app.post('/api/auth',authrote)
module.exports=app;