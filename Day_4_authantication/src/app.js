const express = require('express')
const registerroute=require('./Routes/routes.userregister');
const cookieParser = require('cookie-parser');
const app =express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth',registerroute)


module.exports=app;