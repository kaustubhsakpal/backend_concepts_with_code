import { usermodel } from "../models/auth.model.js";
import { sendemail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
export async function registercontroller(req, res) {
  const { username, email, password } = req.body;
console.log(email);

  const userexits = await usermodel.findOne({
    $or: [{ username }, { email }],
  });

  if (userexits) {
    return res.status(409).json({
      message: "user allready exits",
    });
  }


  const emailverificationtoken = jwt.sign(
    { email },
    process.env.JWT_SECRET_KEY,
  );


  
  await sendemail({
    to: email,
    subject: "welcome to perplexcity",
    html: `<h1>hi ${username},welcome to perplexcity</h1>
        <p>we are glad to have you on board</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailverificationtoken}">verify Email</a>`,
    text: `hi ${username},welcome to perplexcity`,
  });
  const user = await usermodel.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    message: "user created succesfully",
    user,
  });
}

export async function verifycontroller(req, res) {
  const token = req.query.token;
 console.log(token);
 
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await usermodel.findOne({
    email: decode.email,
  });

  if (!user) {
    return res.status(401).json({
      message: "unauthorized person",
    });
  }
console.log(user);

  user.verify = true;
 
  await user.save();

  const html = `<h1>hi ${user.username},your email is verified successfully</h1>
 <p>you can now login to your account</p>`;
  res.send(html);
}
