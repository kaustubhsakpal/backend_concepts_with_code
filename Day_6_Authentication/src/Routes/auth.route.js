const express=require('express');
const Authregistercontroller = require('../Controller/auth.register')
const Authroute = express.Router();

Authroute.post('/register',Authregistercontroller.RegisterController)

module.exports=Authroute;   