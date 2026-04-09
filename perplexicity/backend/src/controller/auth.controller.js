import { usermodel } from "../models/auth.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

  await sendEmail({
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

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await usermodel.findOne({
    email: decode.email,
  });

  if (!user) {
    return res.status(401).json({
      message: "unauthorized person",
    });
  }

  user.verify = true;

  await user.save();
  res.redirect('http://localhost:5173/login')
}

export async function logincontroller(req, res) {
  const { username, email, password } = req.body;
  const user = await usermodel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      message: "invalid credantials",
    });
  }

  if (user.verify === false) {
    return res.status(400).json({
      message: "without verification login not allowed",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      message: "invalid credantials ",
    });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("logintoken", token, {
    httpOnly: true,
    // secure:true
  });

  const userData = user.toObject();
  delete userData.password;

  return res.status(200).json({
    message: "login successfully",
    user: userData,
  });
}

export async function getmecontroller(req, res) {
  try {    
    const user = await usermodel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user fetch succesfully ",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
}
