const express = require('express');
const Authroute = require('./Routes/auth.route')
const cookieParser=require('cookie-parser')
const app =express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',Authroute)

module.exports=app;