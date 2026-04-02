import { Router } from "express";
import { registercontroller, verifycontroller } from "../controller/auth.controller.js";
import { registervalidation } from "../middleware/express.validation.js";

export const Authrouter = Router();

Authrouter.post('/register',registervalidation,registercontroller)

Authrouter.get('/verify-email',verifycontroller)