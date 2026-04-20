import { usermodel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { blackListingModel } from "../model/tokenblacklisting.model.js";
import redis from "../config/cache.js";
async function registercontroller(req, res) {
  console.log(req.body);
  const { username, email, password } = req.body;
  const userexits = await usermodel.findOne({
    username,
    email,
  });
  if (userexits) {
    return res.status(409).json({
      message: "user allready exits",
      userexits,
    });
  }
  const haspassword = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: haspassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
  res.cookie("register-token", token);

  res.status(201).json({
    message: "user created sucessfully",
    user,
    token,
  });
}

async function logincontroller(req, res) {
  const { username, email, password } = req.body;

  const user = await usermodel.findOne({
    $or:[{username},{email}]
  }).select("+password");

  
  const haspassword = await bcrypt.compare(password,user.password);
  if(!haspassword){
   return  res.status(401).json({
    message:"unathorized"
    })
  }
  const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
  res.cookie("logintoken",token)
  res.status(200).json({
    message: "succesfully logined",
    user
  });
}

async function logoutcontroller(req,res){
  const logintoken = req.cookies.logintoken
  console.log(logintoken)
res.clearCookie('logintoken');
 const values =await redis.set(logintoken,Date.now().toString(),'EX',60*60)
res.status(200).json({
  message:"logout succesfully",
  values
})
}

export { registercontroller, logincontroller , logoutcontroller };
