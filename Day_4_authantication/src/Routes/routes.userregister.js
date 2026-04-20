const express = require('express');
const registercontroller =require('../controller/register.controller')
const router =express.Router();

//post register
router.post('/register',registercontroller.register)

module.exports=router;