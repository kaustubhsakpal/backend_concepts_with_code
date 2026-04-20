const usermodel = require("../models/usermodel");
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function regsitercontroller(req, res) {
  const { username, email, password } = req.body;

  const emailalreadyexits = await usermodel.findOne({ email });
  if (emailalreadyexits) {
    return res.status(409).json({
      message: "user allready exits",
    });
  }
  const user = await usermodel.create({
    username,
    email,
    password,
  });

  const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRETTOKEN)

 res.cookie('jwt',token)
  res.status(201).json({
    message: "user created",
    user,
    token
  });
}

module.exports = { regsitercontroller };
