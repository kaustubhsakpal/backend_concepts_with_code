import { Router } from "express";
import { logincontroller, logoutcontroller, registercontroller } from "../controllers/auth.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.post('/register',registercontroller)
userRouter.post('/login',logincontroller)
userRouter.post('/logout',authmiddleware,logoutcontroller)
export default userRouter