import express from 'express';
import { logincontroller, logoutcontroller, registerController } from '../controller/auth.controller.js';
import { registervalidator } from '../validation/Auth.validation.js';

const Authrouter = express.Router();

Authrouter.post('/register',registervalidator,registerController)
Authrouter.post('/login',logincontroller)
Authrouter.post('/logout',logoutcontroller)

export default Authrouter;