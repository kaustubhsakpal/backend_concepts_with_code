import express from "express";
import bcrypt from "bcrypt";
import usermodel from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import redis from "../config/cache.redis.js";
export async function registerController(req, res) {
  try{const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(404).json({
      message: "crentantial missing ",
    });
  }

  const userexits = await usermodel.findOne({
    username,
    email,
  });

  if (userexits) {
   return  res.status(400).json({
      message: "userallready exits",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await usermodel.create({
    username,
    email,
    password: hashpassword,
  });

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
  res.cookie('register',token)

  res.status(201).json({
    message: "user created  sucessfully",
    user,
    token
  });
}
catch(err){
throw err
}
}

export async function logincontroller(req,res) {
    const {username,email,password}=req.body;

    const user = await usermodel.findOne({
        $or:[
            {username},{email}
        ],
    }).select('+password')

    if(!user){
      return  res.status(400).json({
            message:"unauthorized person"
        })
    }

       const haspasswordverify = await bcrypt.compare(password,user.password)

       if(!haspasswordverify){
        return res.status(400).json({
            message:'invalid credantials'
        })
       }
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
            res.cookie('login-token',token) 
       res.status(200).json({
         message:"login sucesfully",
         user,
         token
       })

}

export async function logoutcontroller(req,res) {
    res.clearCookie('login-token')
    const token = req.cookies['login-token']
    if(!token){
        return res.status(400).json({
            message:"you are not login"
        })
    }
    const value = await redis.set('logintoken',Date.now().toString(),'EX',60*60)
    res.status(200).json({
        message:"logout successfully",value
    })
}