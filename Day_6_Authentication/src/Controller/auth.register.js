const usermodel=require('../Models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

async function RegisterController(req,res){
   const {username, email ,password} = req.body

    const emailexits = await  usermodel.findOne({email})
    const passwordexits = await  usermodel.findOne({password})
    const usernameexits = await  usermodel.findOne({username})
    
    if(emailexits){
      return res.status(409).json({
          message:" email all ready exits "
         })
    }
    if(usernameexits){
     return   res.status(409).json({
         message:" username all ready exits "
      })
    }
    
     if(passwordexits){
      return res.status(409).json({
          message:" password all ready exits "
       })
     }
 let hashpassword = crypto.createHash('sha256').update(password).digest('hex')
   const user =  await usermodel.create({
      username,email,password:hashpassword
   })   

   const token = jwt.sign({
      id:user._id
   },process.env.TOKEN_SECRET_KEY,{expiresIn:"1h"})

   res.cookie("token",token);
   res.status(201).json({
    message:"user created succesfully",
      user,
      token
   })
   
}

module.exports={RegisterController};