const express=require('express');
const regsitercontrol =require('../Controller/regsitercontroller');


const AuthRouter=express.Router();

AuthRouter.post('/Register',regsitercontrol.regsitercontroller)

module.exports=AuthRouter;
