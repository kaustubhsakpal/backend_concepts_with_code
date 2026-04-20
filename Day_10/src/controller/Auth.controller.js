import { usermodel } from "../model/auth.model.js";
import jwt from "jsonwebtoken";

export async function Authcontroller(req, res) {
  const { username, email, password } = req.body;

  const userallreadyexits = await usermodel.findOne({
    username,
    email,
  });

  if (userallreadyexits) {
    return res.status(409).json({
      message: "user allready exits",
    });
  }

  const user = await usermodel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  console.log(token);

  res.cookie("register-token", token);
  res.status(201).json({
    message: "user created succesfully ",
    user,
    token
  });
}

export async function loginController(Req,res){
    const {username,email,password} = req.body
    const user= usermodel.find({
        $or:[{username},{email}],
        password
    }).select("+password")

    if(!user){
       return res.status(404).json({
        message:"unauthorized"
       })
    }
}