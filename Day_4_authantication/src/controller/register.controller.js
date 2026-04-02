const usermodel= require('../model/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
async function register(req,res){
    const {name,email,password}=req.body
 
  const  allreadyexits=  await usermodel.findOne({
    email
  })

  if(allreadyexits){
    return res.status(409).json({
        message:"user allready exits"
    })
  }

    const user = await usermodel.create({
        name,email,password
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"register sucessfully",
        user,
        token
    })

}


module.exports={register}