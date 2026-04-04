import { Router } from "express";
import {  getmecontroller, logincontroller, registercontroller, verifycontroller } from "../controller/auth.controller.js";
import { registervalidation } from "../middleware/express.validation.js";
import { authmiddleware } from "../middleware/auth.middleware.js";

export const Authrouter = Router();

Authrouter.post('/register',registervalidation,registercontroller)

Authrouter.get('/verify-email',verifycontroller)

Authrouter.post('/login',logincontroller)

Authrouter.get('/get-me',authmiddleware,getmecontroller)